(function(){

    if (window.location.hash.indexOf('play') != -1) {
        document.body.classList.add("playing");
        window.rM_AtMo_Instance.showCosmosControl();
        document.getElementById("play_buton").innerText = 'Pause';
        document.getElementById("play_buton").setAttribute('href', "#play");
    }

    // play
    window.onhashchange = function () {
        if (window.location.hash.indexOf('play') != -1) {
            document.body.classList.add("playing");
            window.rM_AtMo_Instance.showCosmosControl();
        } else {
            document.body.classList.remove("playing");
            window.rM_AtMo_Instance.hideCosmosControl();
        }
    }

    document.getElementById("play_buton").addEventListener("click", function(event){

        if (document.getElementById("play_buton").innerText == 'Play') {
            document.getElementById("play_buton").innerText = 'Pause';
            document.getElementById("play_buton").setAttribute('href', "#play");
            
        } else {
            document.getElementById("play_buton").innerText = 'Play';
            document.getElementById("play_buton").setAttribute('href', "#");
        }
    })

}())