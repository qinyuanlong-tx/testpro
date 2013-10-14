/**
 * Created by yuanlong.qyl on 13-9-27.
 */

(function () {
    var Namespace = new Object();

    Namespace.register = function (path) {
        var arr = path.split(".");
        var ns = "";
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) ns += ".";
            ns += arr[i];
            eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
        }
    }

})();