function switchTo(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");

    for (tab of tabcontent) { 
        tab.style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
