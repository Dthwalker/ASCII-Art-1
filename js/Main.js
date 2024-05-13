import Loader from "./Loader.js";
import AsciiDrawer from "./AsciiDrawer.js";


class Main {

    static init() {
        Loader.init();
        AsciiDrawer.init(Loader.img);
        Loader.draw = AsciiDrawer.draw.bind(AsciiDrawer);
    }

}

Main.init();