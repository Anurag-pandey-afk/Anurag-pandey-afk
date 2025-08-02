function start() {
    var fromMessage = document.getElementById("fromMessage");
    var playerName = document.getElementById("name");

    if (playerName.value.trim() == "" || playerName.value == undefined || playerName.value == null) {
        alert('Enter your name please o_o');

      
    } else {
        window.location.href = "./ui/game.html"
    }
}
