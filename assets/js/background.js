/* globals docCookies */

(function(){
   
    var muted = false;

    if (docCookies.hasItem("mute-background") && docCookies.getItem("mute-background") == "true") {
        muted = true;
    }

    window.rM_AtMo_Instance = rM_AtMo.create({
        domElement: document.getElementsByClassName("background")[0],
        muted: muted,
        enableCosmosControl: true,
        showCosmosControl: false,
        renderCss: true
    })

}())
