/**
 * Created by Leo on 13-09-29.
 */

this.GP = this.GP || {};

(function () {

    var _book;

    var Book = function () {
        _book = this; // var self = this; _book
        //章节对象集合
        this.chapters = {};
        //第几章节
        this.currentChapterNumber = 0;
        //向服务器请求的章节
        this.requestChapterNumber = 0;
        this.isRequesting = false;
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
    p.nextPage = function (event) {
        var chapter = this.chapters[this.currentChapterNumber.toString()];
        chapter.nextPage();
    };

    /*
     *  上一页
     */
    p.prePage = function (event) {
        var chapter = this.chapters[this.currentChapterNumber.toString()];
        chapter.prePage();
    };

    p.requestChapter = function(chapterNumber){
        this.requestChapterNumber = chapterNumber;
        this.isRequesting = true;
        if(this.currentChapterNumber == chapterNumber)  return;


        Book.getInstance().currentChapterNumber = Number(chapterNumber);
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
        if(this.isRequesting)return;
        if(this.currentChapterNumber >= 9)  return;

        this.requestChapter(this.currentChapterNumber + 1);

    };

    p.preChapter = function(){
        if(this.isRequesting)   return;
        if(this.currentChapterNumber <= 0)  return;

        this.requestChapter(this.currentChapterNumber - 1);
    };

    p.onGetFileResult = function(){
        if(this.readyState == 4){
            //这函数里this指向XMlHttpRequest对象
            for(var i = Book.getInstance().getNumChildren() ; i > 0 ; i--)
            {
                Book.getInstance().removeChildAt(0);
            }
            Book.getInstance().setData(this.responseXML);
            Book.getInstance().isRequesting = false;
            this.currentChapterNumber = this.requestChapterNumber;
            GP.AppEventDispatcher.getInstance().quickDispatch(GP.AppEvent.REQUEST_CHAPTER_END,null);
        }
    };

    p.setData = function(xmlData){
        this.removeAllChildren();

        var chapter = null;
        if(this.chapters[this.currentChapterNumber.toString()] == "undefined" || this.chapters[this.currentChapterNumber.toString()] == null ){
            chapter  = new GP.Chapter();
            this.chapters[this.currentChapterNumber.toString()] = chapter;
        }
        else{
            chapter = this.chapters[this.currentChapterNumber.toString()];
        }

        chapter = this.chapters[this.currentChapterNumber.toString()];
        chapter.setData(xmlData);
        this.addChild(chapter);
    };

    GP.Book = Book;

})();
