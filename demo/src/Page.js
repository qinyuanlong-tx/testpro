/**
 * Created by Leo on 13-09-29.
 */

this.GP = this.GP || {};

(function () {

    var Page = function () {
        this.initialize();

        this.data = null;
        this.lines = [];
        //开始选中文字操作时的点
        this.startPoint = new createjs.Point(0, 0);
        //结束选中文字操作时的点
        this.endPoint = new createjs.Point(0, 0);
        //选中文字操作的起点和终点是否在同一行
        this.isInSameLine = false;
        //是否选择文字操作，用于mouseup时判定
        this.isPressMove = false;
        //注释弹框
        this.comment = new GP.Comments();
        this.startLine = 0;
        this.endLine = 0;

        this.addEventListener("mousedown", this.onMouseDown);
        this.addEventListener("pressmove", this.onPressMove);
        this.addEventListener("pressup", this.onPressUp);
        this.addEventListener("click", this.onClickTest);
        this.drawBackground();
    };

    var p = Page.prototype = new createjs.Container();

    p.container_init = p.initialize;

    p.setData = function(data){
        this.data = data;
        this.lines = [];
        var lineNodes = data.getElementsByTagName("line");
        var lineLen = lineNodes.length;

        for(var i = 0 ; i < lineLen ; i++){
            var line = new GP.Line();
            this.lines.push(line);
            line.setData(lineNodes[i]);
            line.x = Number(lineNodes[i].getAttribute("pos").split(',')[0]);
            line.y = Number(lineNodes[i].getAttribute("pos").split(',')[1]);
            this.addChild(line);
        }
    };

    p._______show = function (data) {
        this.drawBackground();

        for (var i = 0; i < data.length; i++) {
            var newLine = new GP.Line();
            this.lines.push(newLine);
            newLine.x = data[i].x1;
            newLine.y = data[i].y1;
            newLine.show(data[i]);
            this.addChild(this.lines[i]);
        }
    };

    p.show = function(){
        //绘制背景

    };

    p.drawBackground = function(){
        var shape = this.addChild(new createjs.Shape()).set({name: "shape", x: 0, y: 0});
        //shape.alpha = 0.07;
        shape.graphics.beginFill("#F6F6F6").drawRect(0, 0, 800, 800);
    };

    p.____drawBackground = function () {
        //this.graphics.beginFill("#F00").drawRect(0,0,800,500);
        var shape = this.addChild(new createjs.Shape()).set({name: "shape", x: 0, y: 0});
        shape.alpha = 0.1;
        shape.graphics.beginFill("#00F").drawRect(0, 0, 800, 800);
    }

    p.onMouseDown = function (event) {
        var page = event.currentTarget;
        var test = GP.Global.stage;
//        page.startPoint.x = GP.Global.stage.mouseX;
//        page.startPoint.y = GP.Global.stage.mouseY;
        page.startPoint = page.globalToLocal(GP.Global.stage.mouseX,GP.Global.stage.mouseY);
        page.endPoint.x = 0;
        page.endPoint.y = 0;
    }

    p.drawPage = function (event) {

    }

    p.onClickTest = function (event) {
        var page = event.currentTarget;
        console.log("== Page ==     click page");
        //查看是否点击到划线区，点到就弹出批注框
        for(var i = 0 ; i < page.lines.length ; i++){
            var linePoint = page.lines[i].globalToLocal(event.stageX,event.stageY);
            var hitRst = page.lines[i].hitTest(linePoint.x,linePoint.y);
            if(hitRst)  break;
        }

    };

    p.checkHitUnderLine = function(){

    };

    p.onPressMove = function (event) {
        var page = event.currentTarget;
        page.isPressMove = true;
        page.endPoint = page.globalToLocal(GP.Global.stage.mouseX,GP.Global.stage.mouseY);

        /*
         * 1 找出两点间的所有行
         * 2 如果只有一行，找出两点间的文字标记选中
         * 3 如果不止一行，找出前点右边的文字选中，找出后点左边的文字选中，大于两行则中间的行都标记选中
         * */

        //选中范围的首行及尾行
        var firstLineIndex;
        var lastLineIndex;
        //前点和后点，跟选框的起始点(this.startPoint)和终点(this.endPoint)不一定一致
        var firstPoint;
        var lastPoint;
        //准备数据，将每行在Y轴上的最大点存入数组中，页高度也存入
        var regions = [0];
        for (var i = 0; i < page.lines.length - 1; i++) {
            regions.push(Number(page.lines[i].y) + Number(page.lines[i].height) + 3);
        }
        var stageHeight = 800; //可以改成读配置
        regions.push(stageHeight);

        //找起始点和结束点所在行
        var startY = page.startPoint.y;
        var endY = GP.Global.stage.mouseY;
        for (var i = 0; i < regions.length - 1; i++) {
            if (startY >= regions[i] && startY <= regions[i + 1]) {
                firstLineIndex = i;
            }
            if (endY >= regions[i] && endY <= regions[i + 1]) {
                lastLineIndex = i;
            }
        }

        if (firstLineIndex > lastLineIndex) {
            var tmp = firstLineIndex;
            firstLineIndex = lastLineIndex;
            lastLineIndex = tmp;
        }

        //如果两点在同一行
        if (firstLineIndex == lastLineIndex) {
            page.isInSameLine = true;
            //确定前后点
            if (page.startPoint.x <= page.endPoint.x) {
                firstPoint = page.startPoint;
                lastPoint = page.endPoint;
            }
            else {
                firstPoint = page.endPoint;
                lastPoint = page.startPoint;
            }

            page.lines[firstLineIndex].drawUnderLine(firstPoint,lastPoint);
        }
        else {
            page.isInSameLine = false;
            //确定前后点
            if (page.startPoint.y < page.endPoint.y) {
                firstPoint = page.startPoint;
                lastPoint = page.endPoint;
            }
            else {
                firstPoint = page.endPoint;
                lastPoint = page.startPoint;
            }

            //选中前点右边的文字
            //page.lines[firstLineIndex].drawPreUnderLine(firstPoint, new createjs.Point(800, firstPoint.y));
            page.lines[firstLineIndex].drawUnderLine(firstPoint,new createjs.Point(GP.Global.stageWidth,firstPoint.y));
            //选中后点左边的文字
//            page.lines[lastLineIndex].drawPreUnderLine(new createjs.Point(0, lastPoint.y), lastPoint);
            page.lines[lastLineIndex].drawUnderLine(new createjs.Point(0, lastPoint.y), lastPoint);
            //选中前后点中间的所有行
            for (var i = firstLineIndex + 1; i < lastLineIndex; i++) {
                page.lines[i].drawUnderLine(new createjs.Point(0, firstPoint.y), new createjs.Point(GP.Global.stageWidth, lastPoint.y));
            }
        }

        page.startLine = firstLineIndex;
        page.endLine = lastLineIndex;

        //这两段不加可能会导致绘制有误
        for( i = 1 ; firstLineIndex - i >= 0 ; i++) {
            page.lines[firstLineIndex - i].eraseUnderLine();
        }
        for( i = 1 ; lastLineIndex + i < page.lines.length ; i++) {
            page.lines[lastLineIndex + i].eraseUnderLine();
        }

    };

    p.erasePreUnderLines = function (firstLineIndex, lastLineIndex) {
        if (firstLineIndex == lastLineIndex) {
            this.lines[firstLineIndex].erasePreUnderLine();
            return;
        }

        for (var i = firstLineIndex; i < lastLineIndex; i++) {
            this.lines[i].erasePreUnderLine();
        }
    };

    p.onPressUp = function (event) {
        var page = event.currentTarget;

            for (var i = page.startLine; i <= page.endLine; i++) {
                page.lines[i].cloneCurrentLine();
            }
    };

    //弹出批注框
    p.popUpComment = function (page, preSelectWords, mousePoint) {
        if(preSelectWords.length < 1) return;
        //标记符word，首文字和尾文字哪个与mousePoint更近就将该值赋给flagWord，然后再该word上弹批注框
        var flagWord;
        if (page.isInSameLine) {
            var dis1 = Math.abs(preSelectWords[0].data[0] - mousePoint.x);
            var dis2 = Math.abs(preSelectWords[preSelectWords.length - 1].data[0] - mousePoint.x)
            flagWord = dis1 <= dis2 ? preSelectWords[0] : preSelectWords[preSelectWords.length - 1];
        }
        else {
            var dis3 = Math.abs(Number(preSelectWords[0].data[1]) - mousePoint.y);
            var dis4 = Math.abs(Number(preSelectWords[preSelectWords.length - 1].data[1]) - mousePoint.y)
            flagWord = dis3 <= dis4 ? preSelectWords[0] : preSelectWords[preSelectWords.length - 1];
        }

        var popPoint = new createjs.Point(Number(flagWord.data[0]),Number(flagWord.data[1]));
        this.comment.showComment(popPoint);
    };

    p.getLineByPoint = function (posX, posY) {
//        for(var i = 0 ; i < this.lines.length ; i++){
        this.getObjectsUnderPoint(posX, posY);
//        }
    };

    p.drawUnderLine = function () {

    };

    GP.Page = Page;

})();