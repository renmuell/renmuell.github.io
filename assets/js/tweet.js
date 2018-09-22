/* globals docCookies */

(function(){

    if (docCookies.hasItem("sharing-twitter") && docCookies.getItem("sharing-twitter") == "true") {
    
        load_twitter(function(){
            document.body.classList.add("twitter-sharing-on");
        });
    }

    function load_twitter (calback) {

        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
          
            t._e = [];
            t.ready = function(f) {
              t._e.push(f);
            };
          
            return t;
        }(document, "script", "twitter-wjs"));

        window.twttr.ready(calback);
    }

}())
