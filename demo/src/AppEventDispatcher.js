/**
 * Created by yuanlong.qyl on 13-10-15.
 */

this.GP = this.GP || {};

(function(){

    var AppEventDispatcher = function(){
        if(AppEventDispatcher._instance){
            throw new Error("AppeventDispatcher already exist an instance");
        }
        this.initialize();
    };

    AppEventDispatcher._instance = null;

    AppEventDispatcher.getInstance = function(){
        if(!AppEventDispatcher._instance)  AppEventDispatcher._instance = new AppEventDispatcher();
        return AppEventDispatcher._instance;
    }

    var p = AppEventDispatcher.prototype =  new createjs.EventDispatcher();

    p.initialize = function(){
        this.id = createjs.UID.get();
    };

    p.quickDispatch = function(type,data){
      var event = new GP.AppEvent(type,true,true,data);
      this.dispatchEvent(event);
    };

    GP.AppEventDispatcher = AppEventDispatcher;

})();