function switchTo(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");

    for (i of tabcontent) { 
        i.style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
