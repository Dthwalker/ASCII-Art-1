import Canvas from "./Canvas.js";
import Agent from "./Agent.js";

export default class AsciiDrawer {

    static init(img) {
        this.symbols  = [];
        this.count    = 10;
        this.size     = 10;
        this.img      = img;
        this.w        = 500;
        this.h        = null;
        this.simbols  = ' .,:;-=+/*$%&@';
        this.bright   = 0;
        this.colored  = false;
        this.bright   = 0;
        this.contrast = 0;
        this.imgSize  = 0;

        Canvas.init();
        this.addControls();
    }

    static draw() {
        if (!this.img.src) return console.error('Choise image');

        this.symbols = [];
        
        let ratio = this.img.height / this.img.width
        this.h = this.w * ratio;
        
        Canvas.resize(this.w, this.h);

        Canvas.ctx.drawImage(this.img, 0, 0, this.w, this.h);
        let data = Canvas.ctx.getImageData(0,0,this.w, this.h).data;

        let matrix = [];
        let indx = 0;
        for (let i = 0; i < this.h; i++) {
            matrix.push([]);
            for (let j = 0; j < this.w * 4; j += 4) {
                matrix[i].push([data[indx + 0],
                                data[indx + 1],
                                data[indx + 2],
                                data[indx + 3],
                ]);
                indx += 4;
            }
        }
        
        for (let y = 0; y < matrix.length; y += this.count) {
            for (let x = 0; x < matrix[y].length; x += this.count) {
                let p = []
                for(let iy = 0; iy < this.count; iy++) {
                    for(let ix = 0; ix < this.count; ix++) {
                        try{p.push(matrix[y+iy][x+ix])}
                        catch{p.push([0,0,0,255])}
                    }
                }
                this.symbols.push(new Agent(x, y, p, this.size, this.simbols));
            }
        }

        Canvas.ctx.clearRect(0, 0, this.w, this.h)

        this.symbols.forEach(e => e.draw(Canvas.ctx, this.colored, this.bright, this.contrast));
    }

    static addControls() {
        document.querySelectorAll('.inp_p input').forEach((e,i) => {
            e.addEventListener('input', el => {
                let val = Number(el.target.value);
                el.target.previousElementSibling.innerHTML = val;
                i == 0 ? this.count    = val :
                i == 1 ? this.size     = val :
                i == 2 ? this.bright   = val :
                i == 3 ? this.contrast = val : null
                if (i == 4) {
                    el.target.previousElementSibling.innerHTML = '';
                    val = val > 1 ? val : 1
                    this.w  = val
                }
                this.draw();
            });
        });

        document.querySelector('#colored').onclick = ({target}) => {
            this.colored = !this.colored;
            target.innerHTML = this.colored ? 'Colored' : 'Monochrome';
            this.draw();
        }
        document.querySelector('#draw').onclick = this.draw.bind(this);

        document.querySelector('#sim').addEventListener('input', (e) => {
            this.simbols = e.target.value;
        })

        document.querySelector('.presets').querySelectorAll('button').forEach((e,i) => {
            e.addEventListener('click', () => {
                switch(i) {
                    case 0: this.simbols = ' .,:;-=+/*$%&@'
                            break;
                    case 1: this.simbols = ' ⠁⠡⠋⠛⠏⠮⠿'
                            break;
                    case 2: this.simbols = ' .@'
                            break;
                    case 3: this.simbols = ' _-–—|][!=+#'
                            break;
                    case 4: this.simbols = '  .\'`,^:";~-—_+<>i!lI?/\|()1{}[]*&%$#@'
                            break;
                    case 5: this.simbols = ' .:*-+='
                            break;
                    case 6: this.simbols = ' ..:110'
                            break;
                    case 7: this.simbols = ' .......DEATHWALKER'
                            break;
                    case 8: this.simbols = ' .1234567890'
                            break;
                    case 9: this.simbols = ' .:*'
                            break;  
                }
                document.querySelector('#sim').value = this.simbols
                this.draw();
            })
        });
    }

}