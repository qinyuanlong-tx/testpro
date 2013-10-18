/**
 * Created by Leo on 13-10-1.
 */

this.GP = this.GP || {};

(function () {
    var GPLineManager = new function () {
        this.initialize();
        this.words = [];
    };

    var p = GPLineManager.prototype = new createjs.Container();

    p.initialize = function () {

    };

    p.getWordsByX = function (lefX, rightX) {
    };

    //p.isLineInSelectArea =

    GP.GPLineManager = GPLineManager;
})();