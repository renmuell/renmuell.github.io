/* globals docCookies */

(function(){

    $setting_allow_cookies = document.getElementById("setting_allow_cookies");
    $setting_sharing_firebase = document.getElementById("setting_sharing_firebase");
    $setting_mute_sharing_firebase = document.getElementById("setting_mute_sharing_firebase");
    $setting_sharing_twitter = document.getElementById("setting_sharing_twitter");
    $setting_mute_background = document.getElementById("setting_mute_background");

    if (docCookies.hasItem("allow-cookies") && docCookies.getItem("allow-cookies") == "true") {
        $setting_allow_cookies.checked = true;
        document.getElementById("sharing_twitter").classList.remove("disabled");
        document.getElementById("sharing_firebase").classList.remove("disabled");
        document.getElementById("mute_background").classList.remove("disabled");
    }

    if (docCookies.hasItem("mute-background") && docCookies.getItem("mute-background") == "true") {
        $setting_mute_background.checked = true;
    }

    if (docCookies.hasItem("sharing-firebase") && docCookies.getItem("sharing-firebase") == "true") {
        $setting_sharing_firebase.checked = true;
        document.getElementById("text_setting_mute_sharing_firebase").classList.remove("disabled");
        document.getElementById("option_setting_mute_sharing_firebase").classList.remove("disabled");
    }

    if (docCookies.hasItem("mute-sharing-firebase") && docCookies.getItem("mute-sharing-firebase") == "true") {
        $setting_mute_sharing_firebase.checked = true;
    } else {
        if (docCookies.hasItem("mute-sharing-firebase") && docCookies.getItem("mute-sharing-firebase") == "false") {
            $setting_mute_sharing_firebase.checked = false;
        }
    }

    if (docCookies.hasItem("sharing-twitter") && docCookies.getItem("sharing-twitter") == "true") {
        $setting_sharing_twitter.checked = true;
    }

    if (docCookies.hasItem("mute-background") && docCookies.getItem("mute-background") == "true") {
        $setting_mute_background.checked = true;
    }

    $setting_allow_cookies.addEventListener("click", function(){
        if ($setting_allow_cookies.checked) {
            docCookies.setItem("allow-cookies", true, Infinity);
            document.getElementById("sharing_twitter").classList.remove("disabled");
            document.getElementById("sharing_firebase").classList.remove("disabled");
            document.getElementById("mute_background").classList.remove("disabled");
        } else {
            docCookies.removeItem("allow-cookies");
            docCookies.removeItem("sharing-firebase");
            docCookies.removeItem("sharing-twitter");
            docCookies.removeItem("mute-background");
            docCookies.removeItem("mute-sharing-firebase");
            document.getElementById("sharing_twitter").classList.add("disabled");
            document.getElementById("sharing_firebase").classList.add("disabled");
            document.getElementById("mute_background").classList.add("disabled");
            document.getElementById("text_setting_mute_sharing_firebase").classList.add("disabled");
            document.getElementById("option_setting_mute_sharing_firebase").classList.add("disabled");
            $setting_sharing_firebase.checked = false;
            $setting_sharing_twitter.checked = false;
            $setting_mute_background.checked = false;
            $setting_mute_sharing_firebase.checked = true;
            if (window.rM_AtMo_Instance) {
                window.rM_AtMo_Instance.unMute()
            }
        }
    });

    $setting_mute_background.addEventListener("click", function(){
        if ($setting_mute_background.checked) {
            docCookies.setItem("mute-background", true, Infinity);
            if (window.rM_AtMo_Instance) {
                window.rM_AtMo_Instance.mute();
            }
        } else {
            docCookies.removeItem("mute-background");
            if (window.rM_AtMo_Instance) {
                window.rM_AtMo_Instance.unMute()
            }
        }
    });

    $setting_sharing_firebase.addEventListener("click", function(){
        if ($setting_sharing_firebase.checked) {
            window.InitFirebase();
            docCookies.setItem("sharing-firebase", true, Infinity);
            document.getElementById("text_setting_mute_sharing_firebase").classList.remove("disabled");
            document.getElementById("option_setting_mute_sharing_firebase").classList.remove("disabled");
        } else {
            window.RemoveFirebase();
            docCookies.removeItem("sharing-firebase");
            docCookies.setItem("mute-sharing-firebase", true, Infinity);
            document.getElementById("text_setting_mute_sharing_firebase").classList.add("disabled");
            document.getElementById("option_setting_mute_sharing_firebase").classList.add("disabled");
            $setting_mute_sharing_firebase.checked = true;
        }
    });

    $setting_mute_sharing_firebase.addEventListener("click", function(){
        if ($setting_mute_sharing_firebase.checked) {
            docCookies.setItem("mute-sharing-firebase", true, Infinity);
        } else {
            docCookies.setItem("mute-sharing-firebase", false, Infinity);
        }
    });

    $setting_sharing_twitter.addEventListener("click", function(){
        if ($setting_sharing_twitter.checked) {
            docCookies.setItem("sharing-twitter", true, Infinity);
        } else {
            docCookies.removeItem("sharing-twitter");
        }
    });

}())