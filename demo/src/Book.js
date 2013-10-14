/**
 * Created by Leo on 13-09-29.
 */

this.GP = this.GP || {};

(function () {

    var _book;

    var Book = function () {
        _book = this; // var self = this; _book
        this.chapters = [];
        this.currentChapterNumber = 0;
        this.requestChapterNumber = 0;
        //this.pages = [];
        //this.currentPage = 0;
        this.xmlHttp = null;
        this.xmlDoc = null;
        this.initialize();
    };

    Book.getInstance = function () {
        if (_book) {
            return _book;
        }

        _book = new Book();
        return _book;
    };

    var p = Book.prototype = new createjs.Container();


//    p.initialize = function(){
//        this.addEventListener("open_page_test",this.onOpenPageTest);
//        this.addEventListener("next_page",this.onNextPage);
//    };

    //测试打开页面
    p.show = function () {
        var page = new GP.Page(1);

        page.show(JSONDATA.data);
        this.addChild(page);
    };

    /*
     *   打开书本，加上打开新书的特效，如淡入、滑动居中
     */
    p.onOpenBook = function (event) {

    };

    /*
     *   下一页
     */
    p.onNextPage = function (event) {

    };

    /*
     *  上一页
     */
    p.onPrePage = function (event) {
    };

    p.requestChapter = function(chapterNumber){
        //var xmlDoc;
        for(var i = 0 ; i < this.chapters.length ; i++){
            if(this.chapters[i].chapterIndex == chapterNumber)  return;
        }

        this.currentChapterNumber = Number(chapterNumber);
        this.chapters.push(new GP.Chapter());
        var xmlFileName = "athena/page_" + chapterNumber.toString() + ".xml";
//        var xmlFileName = "page_" + pageNumber.toString() + ".xml";
        try //Internet Explorer
        {
            this.xmlDoc = this.xmlDoc || new ActiveXObject("Microsoft.XMLHTTP");
            //xmlDoc.async=false;
            this.xmlDoc.load(file);
        }
        catch(e)
        {
            try //Firefox, Mozilla, Opera, etc.
            {
                this.xmlDoc=document.implementation.createDocument("","",null);
                //xmlDoc.async=false;
                this.xmlDoc.load(file);
            }
            catch(e)
            {
                try //Google Chrome
                {
                    this.xmlhttp = this.xmlHttp || new window.XMLHttpRequest();
                    this.xmlhttp.open("GET",xmlFileName,true);
                    this.xmlhttp.onreadystatechange = this.onGetFileResult;
                    this.xmlhttp.send(null);
                    //xmlDoc = xmlhttp.responseXML.documentElement;
                }
                catch(e)
                {
                    console.log(e.message);
                }
            }
        }
    };

    p.nextChapter = function(){
        this.currentChapterNumber++;
        this.requestChapter(this.currentChapterNumber);
    };

    p.preChapter = function(){
        if(this.currentChapterNumber <= 0)  return;

        this.currentChapterNumber--;
        this.requestChapter(this.currentChapterNumber);
    };

    p.onGetFileResult = function(){
        if(this.readyState == 4){
            //这函数里this指向XMlHttpRequest对象
            //var json = GP.Global.xmlToJson.parser(this.responseText);
            //console.log(json);
            for(var i = Book.getInstance().getNumChildren() ; i > 0 ; i--)
            {
                Book.getInstance().removeChildAt(0);
            }
            Book.getInstance().setData(this.responseXML);
            console.log(this.responseXML);
        }
    };

    p.setData = function(xmlData){
        //setInterval('',3000);
        this.currentChapterNumber = this.requestChapterNumber;
        this.removeAllChildren();
        var chapter = new GP.Chapter();
        chapter.setData(xmlData);
        this.addChild(chapter);
    };



    GP.Book = Book;

})();