/**
 * Created by Leo on 13-09-29.
 */

this.GP = this.GP || {};

(function () {
    var Line = function () {
        this.initialize();

        this.words = [];
        this.textSize = 0;
        //this.width = 0;
        this.height = 0;
        //下划线，一行也可能有多条下划线
        this.underLines = [];
        this.currentUnderLine = new GP.UnderLine();
        this.addChild(this.currentUnderLine);
        //this.addEventListener("click",this.onClick);
    };

    var p = Line.prototype = new createjs.Container();

    p.onClick = function (event) {
        //console.log(event);
    };

    p.setData = function(data){
        this.words = [];
        var fontSize = data.getElementsByTagName("setfont")[0].getAttribute("size");
        var words = data.getElementsByTagName("text");
        var wordLen = data.getElementsByTagName("text").length;
        this.textSize = this.height = Number(fontSize); //貌似不太合理

        for(var i = 0 ; i < wordLen ; i++){
            var text = words[i].textContent;
            var font = fontSize + "px 微软雅黑";
            var color = "#000000";
            var posX = words[i].getAttribute("pos").split(',')[0];
            var posY = words[i].getAttribute("pos").split(',')[1];
            var word = new GP.Word();   //.setData(text,font,color);
            word.setData(text,font,color,fontSize);
            word.x = Number(posX);
            //word.y = Number(posY);
            this.addChild(word);
            this.words.push(word);
            //console.log(text);
        }
    }

    p.show = function (data) {
        this.width = Number(data.x2) - Number(data.x1);
        this.height = Number(data.y2) - Number(data.y1);
        this.textSize = Number(data.texts[0][4]);
        for (var i = 0; i < data.texts.length; ++i) {
            var word = new GP.GPWord(data.texts[i][2], data.texts[i][4] + "px 微软雅黑", "#000000");
            this.addChild(word);
            word.show(data.texts[i]);
            this.words.push(word);
            break;
        }
        this.drawBackground(data.x1, data.y1, data.x2, data.y2);
    };

    p.drawBackground = function (x1, y1, x2, y2) {
        var shape = this.addChild(new createjs.Shape()).set({name: "shape", x: 0, y: 0});
        shape.alpha = 0.1;
        shape.graphics.beginFill("#F00").drawRect(0, 0, this.width, this.height + 5);
    };

    p.erasePreUnderLine = function(){
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].setPreSelected(false);
        }
    }

    p.getPreSelectWords = function(){
        var preSelect = [];
        for(var i = 0 ; i < this.words.length ; i++){
            if(this.words[i].preSelected)
            {
                preSelect.push(this.words[i]);
            }
        }

        return preSelect;
    };

    p.setSelected = function(){
        var selectWords = [];
        for (var i = 0; i < this.words.length; i++) {
            if(this.words[i].preSelected){
                selectWords.push(this.words[i]);
            }
            this.words[i].setSelected();
        }

        if(selectWords.length > 0)
        {
            var len = selectWords.length;
            var firstXY = new createjs.Point(selectWords[0].x,selectWords[0].y + Number(selectWords[0].size) + 5);
            var lastXY = new createjs.Point(selectWords[len - 1].x + Number(selectWords[len - 1].size) ,selectWords[len - 1].y + Number(selectWords[len - 1].size) + 5);
            var shape = new createjs.Shape();
            shape.graphics.setStrokeStyle(1, "round", "round").beginStroke("#000").moveTo(firstXY.x,firstXY.y).lineTo(lastXY.x,lastXY.y);
            this.addChild(shape);
        }
    };

    p.cloneCurrentLine = function(){
        this.currentUnderLine.showLineDraw();
    };

    p.drawUnderLine = function(startPoint,endPoint){
        var firstXY = this.globalToLocal(startPoint.x, startPoint.y);
        var lastXY = this.globalToLocal(endPoint.x, endPoint.y);

        //找出前点和后点间的所有文字并设置选中状态
        var startRegion = firstXY.x - this.textSize;
        var endRegion = lastXY.x;
        var words = [];
        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i].x > startRegion && this.words[i].x < endRegion) {
                words.push(this.words[i]);
            }
        }

        if(words.length < 1) return;

//        this.currentUnderLine.startWord = words[0];
//        this.currentUnderLine.endWord = words[words.length - 1];
        this.currentUnderLine.drawLine(words[0],words[words.length - 1]);
    };

    p.eraseUnderLine = function(){
        this.currentUnderLine.eraseUnderLine();
    };

    p.setLineStatus = function(b){
        this.currentUnderLine.isCurrentDraw = b;
    };

    p.drawPreUnderLine = function (firstPoint, lastPoint) {
        var firstXY = this.globalToLocal(firstPoint.x, firstPoint.y);
        var lastXY = this.globalToLocal(lastPoint.x, lastPoint.y);

        //找出前点和后点间的所有文字并设置选中状态
        var startRegion = firstXY.x - this.textSize;
        var endRegion = lastXY.x;

        for (var i = 0; i < this.words.length; i++) {
            if (this.words[i].x > startRegion && this.words[i].x < endRegion) {
                this.words[i].setPreSelected(true);

            }
            else{
                this.words[i].setPreSelected(false);
            }
        }

    };

    p.checkHitUnderLine = function(point){

    };

    GP.Line = Line;
})();