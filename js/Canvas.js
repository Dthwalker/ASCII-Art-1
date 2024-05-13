export default class Canvas {

    static init() {
        this.canvas = document.querySelector('canvas', { willReadFrequently: true });
        this.ctx    = this.canvas.getContext('2d');
    }

    static resize(w, h) {
        this.canvas.width  = w;
        this.canvas.height = h;
    }

}