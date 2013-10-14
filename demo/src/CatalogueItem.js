/**
 * Created by yuanlong.qyl on 13-10-14.
 */

//{ "people": [
//
//　　{ "firstName": "Brett", "lastName":"McLaughlin", "email": "aaaa" },
//
//　　{ "firstName": "Jason", "lastName":"Hunter", "email": "bbbb"},
//
//　　{ "firstName": "Elliotte", "lastName":"Harold", "email": "cccc" }
//
//　　]}

this.GP = this.GP || {};

(function () {

    var CatalogueItem = function () {
        this.initialize();
    };

    var p = CatalogueItem.prototype = new createjs.Container();



    p.addTitle = function(){}

    GP.CatalogueItem = CatalogueItem;

})();