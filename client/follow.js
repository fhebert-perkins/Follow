/*Setup
 -- Check DoNotTrack -- DONE
    -- If DoNotTrack is set to true, do not do anything else
 -- Get configuration from element
 -- Check for session id -- DONE
    -- if NO Session id, pass this to the session initializer
    -- if there is, pass it to the session initializer
    -- kick off session initializer, while this is happening, bind events to all elements on the page
 -- Initialize the session
    -- get session id either from the server if not already there
    -- give the server the browser type, language, version and device type
    -- send server the domain information
*/

var eventList = []

function fullPath(el){ // Gets full path of element
  var names = [];
  while (el.parentNode){
    if (el.id){
      names.unshift('#'+el.id);
      break;
    }else{
      if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
      else{
        for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
        names.unshift(el.tagName+":nth-child("+c+")");
      }
      el=el.parentNode;
    }
  }
  return names.join(" > ");
}

function get_browser(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
}

function getCookies(){
    var rawCookies = document.cookie;
    var cookiesList = rawCookies.split(";");
    var cookies = {};
    for (i=0; i<cookiesList.length; i++){
        cookies[cookiesList[i].split("=")[0]] = cookiesList[i].split("=")[1];
    }
    return cookies;
}

function pushCookies(cookies){
    for (var cookie in cookies) {
        document.cookies += cookie+"="+cookies[cookie]+";";
    }
}

function elementClicked(e){
    var path = fullPath(e.target);
    entry.path = path;
    entry.timestamp = Date().now();
    entry.type = "click"
    eventList.push(entry);
    console.log(entry);
    if (eventList.length === 10){
        pushEvents();
    }
    return 0;
}

function pushEvents(){
    var request = new XMLHttpRequest();
    var payload = {}
    payload.uid = userID;
    payload.events = eventList;
    request.open("POST", "http://"+serverHost+"/"+clientID+"/events");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send("payload="+JSON.stringify(payload)+";uid="+userID);
    return 0;
}

function setup() {
    if (navigator.DoNotTrack != 0){
        clientID = document.getElementById('follower').getAttribute("cid"); //get client id
        serverHost = document.getElementById('follower').getAttribute("host");
        userID = ""
        var request = new XMLHttpRequest();

        if (getCookies().hasOwnProperty("followID")){
            userID = getCookies()["followID"];
        }else{
            var userIDRequest = new XMLHttpRequest();
            userIDRequest.addEventListener("load", function (){
                userID = this.responseText;
                getCookies()["followID"] = userID;
            });
            userIDRequest.open("GET", "http://"+serverHost+"/"+clientID+"/getID");
            userIDRequest.send();
        }

        var browser = get_browser();

        var payload = {} // initialize payload, this will be sent to the server in a post request
        payload.browser_name = browser.name // get browser name (i.e. chrome)
        payload.browser_version = broswer.version // get browser version (i.e. 4)
        payload.domain = window.location.host;
        payload.protocol = window.location.protocol;
        payload.path = window.location.pathname;
        payload.cid = clientID;
        payload.uid = userID;

        // Actually send the data
        request.open("POST", "http://"+serverHost+"/"+clientID+"/initialize");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send("payload="+JSON.stringify(payload));

        // Add event listeners to all buttons, links, form elements, etc.

        document.getElementsByTagName("html")[0].addEventListener("click", elementClicked(e));
        window.addEventListener('popstate', pushEvents());
    } else {
        console.log("Hi, Just so you know we noticed that you didn't want to be tracked, so we are not tracking you.\nfollow will not track you as long as you have DoNotTrack enabled on your browser.\nWe will not even store cookies in your browser, so this check will be done every time you load a site that uses follow.\nHave a good day.");
    }
}
