(function(){var Namespace=new Object();Namespace.register=function(path){var arr=path.split(".");var ns="";for(var i=0;i<arr.length;i++){if(i>0){ns+="."}ns+=arr[i];eval("if(typeof("+ns+") == 'undefined') "+ns+" = new Object();")}}})();(function(){function a(){}a.main=function(){var b=new a();if(!window.HTMLCanvasElement){alert("Your browser does not support HTML5 Canvas.");return}else{b.initialize()}var c=new createjs.Shape();c.graphics.beginFill("red").drawCircle(0,0,40);c.x=c.y=50;b.mainStage.addChild(c)};a.prototype.initialize=function(){this.mainCanvas=document.getElementById("mainCanvas");this.mainStage=new createjs.Stage(this.mainCanvas);this.mainStage.snapToPixelsEnabled=true;createjs.Ticker.addListener(this);createjs.Ticker.useRAF=true;createjs.Ticker.setFPS(60)};a.prototype.tick=function(b){this.mainStage.update()};window.Main=a})();