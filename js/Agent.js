import RgbToHsl from "./RgbToHsl.js";

export default class Agent {

    constructor(x, y, color, size, symbols) {
        this.x = x;
        this.y = y;
        this.sy = null;
        this.size = size;
        this.color = this.setColor(color);
        this.symbols = symbols;
    }

    setColor(arr) {
        arr = arr.map( e => e ? e : [0,0,0,0])
        let r = (arr.reduce((a,n) => a + n[0], arr[0][0]) / arr.length)
        let g = (arr.reduce((a,n) => a + n[1], arr[0][1]) / arr.length)
        let b = (arr.reduce((a,n) => a + n[2], arr[0][1]) / arr.length)
        let [h,s,l] = RgbToHsl(...[r,g,b]).map(e => e.toFixed());

        return [[r,g,b], [h,s,l]];
    }

    setS(bright, contrast) {
        let f = (l) => l = l < 1 ? 1 : l > 99 ? 99 : l
        let con = (l,f = false) => {
            let a = l + ( !f ? (contrast * 0.2) : -(contrast * 0.2) )
            return a = contrast < 0 ? f ? a > 50 ? 50 : a : a < 50 ? 50 : a : a
        }

        let l = Number(this.color[1][2]) + Number(bright)
        l = f(l)
        l = l > 50 ? con(l) : con(l, true);
        l = f(l);
        let i = Math.floor( (this.symbols.length * l) / 100 );
        return this.symbols[ i == this.symbols.length ? this.symbols.length - 1 : i ];
    }

    colorized(colored) {
        let color = colored ? `hsl(${ (this.color[1][0] * 0.1).toFixed() * 10 }, ${(this.color[1][1] * 0.1).toFixed() * 10 }%, ${(this.color[1][2] * 0.1).toFixed() * 10}%)`
                            : `rgb(200,200,200)`;
        return color;
    }

    draw(ctx, colored, bright, contrast) {
        ctx.fillStyle = this.colorized(colored);
        ctx.font = this.size + 'px monospace';

        ctx.fillText(this.setS(bright, contrast), this.x + 2,
                                  this.y + this.size * 0.5);
    }

}