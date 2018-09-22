/* globals rm_num_article_initial,twttr */

(function(){

    var json_articles_html = JSON.parse(document.getElementById("json-articles").innerHTML).articles;
    var num_article_on_page = rm_num_article_initial;

    window.addEventListener('scroll', debounce(function() {
        var shouldLoad = document.body.scrollHeight - window.innerHeight - 200 < window.scrollY;
        if (shouldLoad) {
            var addArticles = json_articles_html.slice(num_article_on_page, num_article_on_page + rm_num_article_initial);
            num_article_on_page += rm_num_article_initial;
            addArticles.forEach(function(article){
                document.querySelector("footer").insertAdjacentHTML('beforebegin', article);
            })
            if (window.twttr){
                window.twttr.widgets.load()
            }
        }
    }, 50));

    // underscore.js
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
}())