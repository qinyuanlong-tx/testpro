/**
 * Created by yuanlong.qyl on 13-10-12.
 */

this.GP = this.GP || {};

(function () {
    var UnderLine = function () {
        this.initialize();
        //是否当前用户正在画的线，用于判断是否擦除
        this.isCurrentDraw = false;
        this.startWord = new GP.Word();
        this.endWord = new GP.Word();
        this.lineShape = new createjs.Shape();
        this.lineDrawed = new createjs.Shape();
        this.drawFromX = 0;
        this.drawFromY = 0;
        this.drawToX = 0;
        this.drawToY = 0;
    };

    var p = UnderLine.prototype = new createjs.Container();

//    p.lineShape = new createjs.Shape();

    p.drawLine = function (firstWord, lastWord) {
        if (!this.startWord || !this.endWord) {
            return;
        }

        if (!this.lineShape.parent) {
            this.addChild(this.lineShape);
        }

        if (firstWord.x != this.startWord || lastWord.x != this.endWord.x) {
            this.lineShape.graphics.clear();
            this.startWord = firstWord;
            this.endWord = lastWord;
        }
        var fromX = this.drawFromX = this.startWord.x;
        var fromY;
        var toY = fromY = this.drawToY = this.drawFromY = this.startWord.y + Number(this.startWord.size) + 5;
        var toX = this.drawToX = this.endWord.x + Number(this.endWord.size);
        this.lineShape.graphics.setStrokeStyle(1, 'round').beginStroke("#000").moveTo(fromX, toY).lineTo(toX, toY).endStroke();
        this.isCurrentDraw = true;
    };

    p.showLineDraw = function () {
        this.lineDrawed.x = this.lineShape.x;
        this.lineDrawed.y = this.lineShape.y;
        this.eraseUnderLine();

        this.lineDrawed.graphics.setStrokeStyle(1, 'round').beginStroke("#000").moveTo(this.drawFromX, this.drawFromY).lineTo(this.drawToX, this.drawToY).endStroke();
        if (!this.lineDrawed.parent) {
            this.addChild(this.lineDrawed)
        }
    };

    p.eraseUnderLine = function () {
        this.lineShape.graphics.clear();
    }

    GP.UnderLine = UnderLine;
})();