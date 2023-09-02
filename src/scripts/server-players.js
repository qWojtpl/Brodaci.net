

let playersElement = document.querySelector("data#server-players-online");
let infoElement = document.querySelector("data#server-players-info");

playersElement.innerHTML = "?";

$.ajax({
    url: "https://api.mcsrvstat.us/3/brodaci.net",
    success: function(response) {
        playersElement.innerHTML = response.players.online;
        let arr = response.info.clean;
        for(let i = 3; i <= 4; i++) {
            infoElement.innerHTML += arr[i].replace("* ", "") + "<br>";
        }
    },
    error: function(xhr) {
        infoElement.innerHTML = "Nie można załadować!";
    }
});