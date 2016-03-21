/*Setup
 -- Check DoNotTrack -- DONE
    -- If DoNotTrack is set to true, do not do anything else
 -- Get configuration from element
 -- Check for session id
    -- if NO Session id, pass this to the session initializer
    -- if there is, pass it to the session initializer
    -- kick off session initializer, while this is happening, bind events to all elements on the page
 -- Initialize the session
    -- get session id either from the server if not already there
    -- give the server the browser type, language, version and device type
    -- send server the domain information
*/
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
    var rawCookies = document.cookies;
    var cookiesList = rawCookies.split(";");
    var cookies = {};
    for (i=0; i<cookiesList.length(); i++){
        cookies[cookiesList[i].split("=")[0]] = cookiesList[i].split("=")[1];
    }
    return cookies;
}

function pushCookies(cookies){
    for (var cookie in cookies) {
        document.cookies += cookie+"="+cookies[cookie]+";";
    }
}


function setup() {
    if (navigator.DoNotTrack === 0){
        var clientID = document.findElementById('follower').getAttribute("cid"); //get client id
        var request = new XMLHttpRequest();
        var browser = get_browser();
        var payload = {} // initialize payload, this will be sent to the server in a post request
        payload.browser_name = browser.name // get browser name (i.e. chrome)
        payload.browser_version = broswer.version // get browser version (i.e. 4)
        

    } else {
        console.log("Hi, Just so you know we noticed that you didn't want to be tracked, so we are not tracking you.\n
        follow will not track you as long as you have DoNotTrack enabled on your browser.\n
        We will not even store cookies in your browser, so this check will be done every time you load a site that uses follow.\n
        Have a good day.");
    }
}
