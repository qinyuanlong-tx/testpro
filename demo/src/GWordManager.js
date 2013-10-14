/**
 * Created by yuanlong.qyl on 13-9-30.
 */

this.GP = this.GP || {};

(function () {

    var GWordManager = function () {
        this.words = [];
    };

    var p = GWordManager.prototype;

    p.createWord = function (text, font, color) {
        var word = new GP.GPWord(text, font, color);
        this.words.push(word);
        return word;
    };

    p.getWords = function () {
        return this.words;
    };

    GP.GWordManager = GWordManager;
})();