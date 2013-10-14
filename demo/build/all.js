/**
 * Created by yuanlong.qyl on 13-9-27.
 */

(function(){
var Namespace = new Object();

Namespace.register = function(path){
    var arr = path.split(".");
    var ns = "";
    for(var i=0;i<arr.length;i++){
        if(i>0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
}

})();/**
 * Created by yuanlong.qyl on 13-9-27.
 */
(function(){

    /**
     * Main class of the app.
     */
    function Main(){}

    /**
     * Entry point of the app.
     */
    Main.main = function()
    {
        var main = new Main();
        if (!window.HTMLCanvasElement)
        {
            alert("Your browser does not support HTML5 Canvas.");
            return;
        }
        else main.initialize();
        // entry point

        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        //Set position of Shape instance.
        circle.x = circle.y = 50;

        main.mainStage.addChild(circle);
    }

    /**
     * Initializes the basics of the app.
     */
    Main.prototype.initialize = function()
    {
        /**
         * mainCanvas
         */
        this.mainCanvas = document.getElementById("mainCanvas");
        /**
         * mainStage
         */
        this.mainStage = new createjs.Stage(this.mainCanvas);
        this.mainStage.snapToPixelsEnabled = true;
        /*
         * createjs
         */
        createjs.Ticker.addListener(this);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
    }

    /**
     * Updates the stage on Ticker tick.
     * @param event The recieved tick event.
     */
    Main.prototype.tick = function(event)
    {
        this.mainStage.update();
    }

    /**
     * Expose class.
     */
    window.Main = Main;

})();
