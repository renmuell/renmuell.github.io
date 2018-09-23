/* globals docCookies */

(function(){
   
    var instance = {};

    var startTime = Date.now();

    var config = {
        apiKey: "AIzaSyCyWJeSdP6se7yaYV3aofKipucAFAGLYY8",
        authDomain: "renmuell-firebase.firebaseapp.com",
        databaseURL: "https://renmuell-firebase.firebaseio.com"
    };

    window.RemoveFirebase = function () {
        window.firebase = null;
        instance = {};
        removeScript('firebaseDatabase');
        removeScript('firebaseApp');
    }

    window.InitFirebase = function () {
        addScript('firebaseApp', 'https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js', function(){
            addScript('firebaseDatabase', 'https://www.gstatic.com/firebasejs/5.0.0/firebase-database.js', function(){
                
                instance.myLastTapTimestamp = parseInt(Date.now().toString());
                window.firebase.initializeApp(config);
                instance.database = firebase.database();
                instance.ref = instance.database.ref('lastUserTap');
                instance.ref.on('value', throttle(function(data){
                    data = data.val();
                    data.created = parseInt(data.created);

                    if (Math.abs(startTime - Date.now()) > 1000 && data.created != instance.myLastTapTimestamp)  {
                        var muted = true;
                        if (window.docCookies.hasItem("mute-sharing-firebase")) {
                            muted = window.docCookies.getItem("mute-sharing-firebase") == "true";
                        }
                        window.rM_AtMo_Instance.addUserTap(data, muted);
                    }
                }, 100))
            });
        });
    }

    window.rM_AtMo_Instance.onTap(throttle(function(data){
        if (instance.ref) {
            data.created = Date.now().toString()
            instance.myLastTapTimestamp = parseInt(data.created);
            instance.ref.set(data);
        }
    }, 100));

    if (docCookies.hasItem("sharing-firebase") && docCookies.getItem("sharing-firebase") == "true") {
        window.InitFirebase();
    }

    function throttle (func, limit) {
        var inThrottle
        return function() {
            var args = arguments
            var context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(function () { inThrottle = false }, limit)
            }
        }
    }

    function removeScript (id) {
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);
    }

    function addScript(id, src, callback){
        if (src) {
            var script = document.createElement('script');
    
            script.onload = callback;
    
            script.setAttribute("type","text/javascript");
            script.setAttribute("src", src);
            script.setAttribute("id", id);
    
            if (typeof script!="undefined") {
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }
    }

}())
