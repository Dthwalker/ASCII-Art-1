export default class Loader {

    static init() {
        this.inp = document.querySelector('#file');
        this.img = new Image();
        this.draw = null;

        this.inp.addEventListener('change', this.load.bind(this));
    }

    static load() {
        let file = this.inp.files[0];

        let url = URL.createObjectURL(file);
        this.img.src = url;

        this.img.onload = () => {
            this.draw();
        }
    }

}