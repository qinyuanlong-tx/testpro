/**
 * Created by yuanlong.qyl on 13-10-11.
 */

this.GP = this.GP || {};

(function(){

    var Word = function(){
        this.word = null;
        this.size = 0;
        this.selected = false;
        this.preSelected = false;
        this.data = null;
        this.preUnderLine = new createjs.Shape();
        this.underLines = new createjs.Shape();
        this.bgGround = new createjs.Shape();
        this.addEventListener("click",this.onClick);

        this.initialize();
    };

    var p = Word.prototype = new createjs.Container();

    p.setData = function(txt,font,color,size){
        this.size = size;
        this.word = new createjs.Text(txt,font,color);
        this.addChild(this.word);
        this.drawBackground();
    };

    p.setPreSelected = function (isSelected) {
        if(this.selected && isSelected) return;

        if ((!this.preSelected) && isSelected) {
//            var s = new createjs.Shape();
            var s = this.preUnderLine;
            var startX = 0;
            var endX = Number(this.size);
            var pY = Number(this.size) + 5;
            s.graphics.setStrokeStyle(1, "round", "round").beginStroke("#f90").moveTo(startX, pY).lineTo(endX, pY);
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
            var endX = Number(this.size);
            var pY = Number(this.size) + 5;
            s.graphics.setStrokeStyle(1, "round", "round").beginStroke("#000").moveTo(startX, pY).lineTo(endX, pY);
            //this.addChild(s);

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

    p.onClick = function(event){
        console.log('...');
    };

    p.drawBackground = function(){
        this.bgGround.graphics.clear();
        this.bgGround.graphics.beginFill("#0F0").drawRect(0,0,Number(this.size),Number(this.size));
        this.addChildAt(this.bgGround,0);
        this.bgGround.alpha = 0.02;
    };

    GP.Word = Word;

})();