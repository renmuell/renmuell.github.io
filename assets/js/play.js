(function(){

    if (window.location.hash.indexOf('play') != -1) {
        document.body.classList.add("playing");
        document.getElementById("play_buton").innerText = 'Pause';
        document.getElementById("play_buton").setAttribute('href', "#play");
    }

    // play
    window.onhashchange = function () {
        if (window.location.hash.indexOf('play') != -1) {
            document.body.classList.add("playing");
        } else {
            document.body.classList.remove("playing");
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