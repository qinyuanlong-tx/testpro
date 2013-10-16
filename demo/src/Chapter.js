/**
 * Created by yuanlong.qyl on 13-10-11.
 */

this.GP = this.GP || {};

(function(){

    var Chapter = function(){
        this.initialize();
        this.pages = [];
        this.currentPage = 0;
    };

    var p = Chapter.prototype = new createjs.Container();

    p.chapterIndex = -1;

    p.data = null;

    p.setData = function(data){
        this.pages = [];
        this.data = data;
        var pageData = data.getElementsByTagName("page");
        var pageLen = data.getElementsByTagName("page").length;
        for(var i = 0 ; i < pageLen ; i++)
        {
            var newPage = new GP.Page();
            var childnode = pageData[i];
            newPage.setData(childnode);
            this.pages.push(newPage);
        }
//        this.showPage(this.currentPage);
    };

    p.prePage = function(){
        if(this.currentPage - 1< 0){
            this.toPreChapter();
            return;
        }
        this.showPage(--this.currentPage);
    };

    p.nextPage = function(){
        if(this.currentPage + 1>= this.pages.length){
            this.toNextChapter();
            return;
        }
        this.showPage(++this.currentPage);
    };

    p.toNextChapter = function(){
        GP.Book.getInstance().nextChapter();
    };

    p.toPreChapter = function(){
        GP.Book.getInstance().preChapterFromNext();
    };

    p.setPageAsFirst = function(){
        this.showPage(0);
    };

    p.setPageAsLast = function(){
        this.showPage(this.pages.length - 1);
    };

    p.showPage = function(pageNumber){
        if(pageNumber > this.pages.length || pageNumber < 0)    return;

        this.currentPage = pageNumber;
        this.addChild(this.pages[this.currentPage]);
    };

    GP.Chapter = Chapter;

})();