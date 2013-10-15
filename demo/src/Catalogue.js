/**
 * Created by yuanlong.qyl on 13-10-14.
 */

this.GP = this.GP || {};

(function(){

    var Catalogue = function(){
        this.initialize();
        GP.AppEventDispatcher.getInstance().addEventListener(GP.AppEvent.REQUEST_CHAPTER_END,this.onChapterDataLoad)
    };

    var p = Catalogue.prototype =  new createjs.Container();

    Catalogue.catalogDiv = null;

    Catalogue.mainDiv = null;

    p.data = {"chapters": [
        {"chapter": "chapter 1","number":"1"},
        {"chapter": "chapter 2","number":"2"},
        {"chapter": "chapter 3","number":"3"},
        {"chapter": "chapter 4","number":"4"},
        {"chapter": "chapter 5","number":"5"},
        {"chapter": "chapter 6","number":"6"},
        {"chapter": "chapter 7","number":"7"},
        {"chapter": "chapter 8","number":"8"},
        {"chapter": "chapter 9","number":"9"},
        {"chapter": "chapter 10","number":"10"}
    ]};

    p.showCatalogue = function(){
        Catalogue.catalogDiv = document.getElementById("catalogue");
        Catalogue.catalogDiv.innerHTML = "";
        if(Catalogue.catalogDiv == "undefined" || !Catalogue.catalogDiv)  return;

        Catalogue.catalogDiv.style.position = "absolute";
        Catalogue.catalogDiv.style.width = GP.Global.stageWidth + "px";
        Catalogue.catalogDiv.style.height = GP.Global.stageHeight + "px";
        Catalogue.catalogDiv.style.top = "0px";
        Catalogue.catalogDiv.style.left = "0px";
        Catalogue.catalogDiv.style.zIndex = "1000";
        Catalogue.catalogDiv.style.backgroundColor = "#C2C2C2";
        Catalogue.catalogDiv.style.display = "block";
        Catalogue.catalogDiv.style.top = 0;

        this.showTitle();
        for(var i = 0 ; i < this.data.chapters.length ; i++){
            this.showItem(this.data.chapters[i].chapter,this.data.chapters[i].number);
        }
    };

    p.onChapterDataLoad = function(event){
        Catalogue.catalogDiv.style.display = "none";
        Catalogue.mainDiv = document.getElementById("mainDiv");
        Catalogue.mainDiv.style.display = "block";
    };

    p.showCloseBtn = function(){

    };

    p.showTitle = function(){
        var pElement = document.createElement("p");
        pElement.style.paddingTop = "20px"
        pElement.innerHTML = "目录";
        Catalogue.catalogDiv.appendChild(pElement);
    };

    p.showItem = function(text,number){
        var pElement = document.createElement("p");
        pElement.style.marginTop = "20px"
        var aElement = document.createElement("a");
        aElement.id = "chapter_number_" + number;
        aElement.ch_flag =number;
        aElement.href = "#";
        aElement.onclick =  this.clickChapter;
        aElement.innerHTML = text;
        pElement.appendChild(aElement);
        Catalogue.catalogDiv.appendChild(pElement);
    };

    p.clickChapter = function(event){
        var target = event.target;
        var chNumber = target.ch_flag;
        if(chNumber == "undefined" || chNumber == null) return;

        Main.toChapter(Number(chNumber) - 1);

    };

    p.backToCatalog = function(){
        var displayValue = GP.Global.getElementAttr(Catalogue.catalogDiv,"display");
        if(displayValue != "none")  return;

        Catalogue.catalogDiv.style.display = "block";
        Catalogue.mainDiv.style.display = "none";
    };

    GP.Catalogue = Catalogue;

})();