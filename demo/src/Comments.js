/**********************************************
 * Created by Leo on 13-09-29.
 ***********************************************/

this.GP = this.GP || {};

(function(){

    var Comments = function(){}

    var p = Comments.prototype = new createjs.Container();

    p.data = null;

    p.chapter = null;

    p.container_initialize = p.initialize;

    p.initialize = function(){
        this.container_initialize();
    };

    Comments.tip = null;

    p.showComment = function(point){
        if(Comments.tip == "undefined" || Comments.tip == null)
        {
            Comments.tip = document.getElementById("mytips");
            if(Comments.tip == "undefined" || Comments.tip == null)
            {
                return;
            }
            Comments.tip.addEventListener("click",this.onClose);
            //document.addEventListener("click",this.onClose);
        }

        var p = GP.Global.getOffsetXY();
        Comments.tip.style.position = "absolute";
        Comments.tip.style.display = "block";
        var w = parseInt(GP.Global.getElementAttr(Comments.tip,"width"));
        var h = parseInt(GP.Global.getElementAttr(Comments.tip,"height"));
        var offX = p.x + point.x - w/2;
        var offY = p.y + point.y - 1.5*h;
        console.log(w);
        console.log(h);
        Comments.tip.style.left = offX + "px";
        Comments.tip.style.top = offY + "px" ;
        Comments.tip.style.zIndex = "1000";
    };

    p.showCommentByWord = function(word){

    };

    p.onClose = function(){
        Comments.tip.style.display = "none";
        document.removeEventListener("click",this.onClose);
    }

    GP.Comments =  Comments;

})();