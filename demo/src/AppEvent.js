/**
 * Created by yuanlong.qyl on 13-10-15.
 */

this.GP = this.GP || {};

(function(){

    var AppEvent = function(type,bubbles,cancelable,data){
        this.initialize(type,bubbles,cancelable,data);
    };

    /*const*/ AppEvent.REQUEST_CHAPTER_END = "request_chapter_end";

    AppEvent.SHOW_COMMENT = "show_comment";

    var p = AppEvent.prototype = new createjs.Event();

    p.data = null;

    p.Event_initialize = p.initialize;

    p.initialize = function(type,bubbles,cancelable,data){
        p.Event_initialize(type,bubbles,cancelable);
        this.data = data;
    };

    p.clone = function(){
        return new AppEvent(this.type,this.bubbles,this.cancelable,this.data);
    };

    GP.AppEvent = AppEvent;

})();