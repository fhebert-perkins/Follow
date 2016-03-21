

function createCookie(title, value){
    document.cookie = title+"="+value+";";
    return true;
}

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function post(payload){

}


function getCookie(title){
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }else{
      return false;
  }
}

function trackClick(e){
    var payload = {
        "fid": getCookie("fid"),
        "action" : "click",
        "id" : this.id,
        "class" : this.classList,
        "path" : document.URL.replace(window.location.protocol+"//"+document.domain, "/")
    }
}

function follow() {
    var payload = {
        "fid": fid,
        "bname": navigator.appName,
        "version": navigator.appVersion,
        "language": navigator.language,
        "platform": navigator.platform,
        "referrer": document.referrer,
        "path" : document.URL.replace(window.location.protocol+"//"+document.domain, "/")
    }
}

function onload(){
    var fid = getCookie("fid");
    if (fid == false){
        createCookie("fid", httpGet(
            "http://localhost:5000/getFID"
        ));
    }

    var buttons = document.getElementByTagName("button");
    var links = document.getElementByTagName("a");

    for (i=0; i<buttons.length; i++;){
        if (buttons[i].attachEvent) {
            buttons[i].attachEvent("click", trackClick);
        } else {
           buttons[i].addEventListener("click", trackClick);
        }
    }
    for (i=0; i<links.length; i++;){
        if (links[i].attachEvent) {
            links[i].attachEvent("click", trackClick);
        }else{
            links[i].addEventListener("click", trackClick);
        }
    }
}
