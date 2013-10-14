/**
 * Created by yuanlong.qyl on 13-09-29.
 */

this.GP = this.GP || {};

(function () {

    var GPWord = function (text, font, color) {
        this.size = 0;
        this.selected = false;
        this.preSelected = false;
        this.data = null;
        this.preUnderLine = new createjs.Shape();
        this.underLines = new createjs.Shape();

        console.log(text);
        this.initialize(text, font, color);
        //this.addChild(this.word);
    };

    var p = GPWord.prototype = new createjs.Container();

    p.container_initlize = p.initialize;

    p.initialize = function(text,font,color){
        p.container_initlize();
        this.addChild(new createjs.Text(text,font,color));
    }

    p.setPreSelected = function (isSelected) {
        if(this.selected && isSelected) return;

        if ((!this.preSelected) && isSelected) {
//            var s = new createjs.Shape();
            var s = this.preUnderLine;
            var startX = 0;
            var endX = this.size;
            var pY = this.y + this.word.getMeasuredHeight() + 2;
            s.graphics.setStrokeStyle(2, "round", "round").beginStroke("#f90").moveTo(startX, pY).lineTo(endX, pY);
            this.addChild(s);
            //this.preUnderLine.visible = true;

            this.preSelected = true;
        }
        else if(!isSelected){
            if(this.preUnderLine.parent)
            {
                this.preUnderLine.parent.removeChild(this.preUnderLine);
            }
            this.preSelected = false;
        }
        else{}
    };

    p.setSelected = function(){
        if(this.preSelected)
        {
            var s = this.underLines;
            var startX = 0;
            var endX = this.size;
            var pY = this.y + this.word.getMeasuredHeight() + 2;
            s.graphics.setStrokeStyle(2, "round", "round").beginStroke("#000").moveTo(startX, pY).lineTo(endX, pY);
            this.addChild(s);

            if(this.preUnderLine.parent)
            {
                this.preUnderLine.parent.removeChild(this.preUnderLine);
            }
            this.preSelected = false;
        }
    }

    p.drawUnderLine = function () {
        if (this.selected) {
            return;
        }

        var s = new createjs.Shape();
        var g = s.graphics;

        g.setStrokeStyle(2, 'round', 'round');
        g.beginStroke("#000");
        g.beginFill("#F00");
        var t1 = this.getMeasuredLineHeight();
        var t2 = this.getMeasuredWidth();
        g.moveTo(this.x, this.y + this.getMeasuredLineHeight());
        g.lineTo(this.x + this.getMeasuredWidth(), this.y + this.getMeasuredLineHeight());
        g.endFill();

        this.selected = true;
    };

    p.show = function (data) {
        this.x = this.globalToLocal(Number(data[0]), Number(data[1])).x;
        this.y = 0;
        this.size = data[4];
        this.data = data;
        //this.y = this.globalToLocal(Number(data[0]),Number(data[1])).y;
    };

    GP.GPWord = GPWord;
})();