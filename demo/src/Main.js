/**
 * Created by yuanlong.qyl on 13-9-27.
 */
(function () {

    /**
     * Main class of the app.
     */
    function Main() {
    }

    Main.instance = null;

    Main.cat = null;

    /**
     * Entry point of the app.
     */
    Main.main = function () {
        var main = new Main();
        Main.instance = main;
        if (!window.HTMLCanvasElement) {
            alert("Your browser does not support HTML5 Canvas.");
            return;
        }
        else main.initialize();
        // entry point

        Main.cat =new GP.Catalogue();
        Main.cat.showCatalogue();
    }

    /**
     * 跳到第几章
    */
    Main.toChapter = function(chapterNumber){
        var book = GP.Book.getInstance();
        book.requestChapter(chapterNumber);
        Main.instance.mainStage.addChild(book);
    };

    Main.nextChapter = function(){
        GP.Book.getInstance().nextChapter();
    };

    Main.preChapter = function(){
        GP.Book.getInstance().preChapter();
    };

    Main.toCatalog = function(){
        Main.cat.backToCatalog();
    };

    /**
     * Initializes the basics of the app.
     */
    Main.prototype.initialize = function () {
        /**
         * mainCanvas
         */
        this.mainCanvas = document.getElementById("mainCanvas");
        /**
         * mainStage
         */
        this.mainStage = new createjs.Stage(this.mainCanvas);
        this.mainStage.snapToPixelsEnabled = true;

        /**
         * cssFile
         */
       this.loadCssFile("style.css");

        /*
         * createjs
         */
        createjs.Ticker.addEventListener("tick", this.mainStage);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(30);

        GP.Global.stage = this.mainStage;
    }

    /**
     * Updates the stage on Ticker tick.
     * @param event The recieved tick event.
     */
    Main.prototype.tick = function (event) {
        this.mainStage.update();
    }

    Main.prototype.loadCssFile = function(filename){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);

        if(typeof fileref != "undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    /**
     * Expose class.
     */
    window.Main = Main;

})();
