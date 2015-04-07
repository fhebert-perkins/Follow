$(document).onload(
  $.getJSON("/follow-config.json", function(data){
    var config = data;
  });
  if ($.cookie("follow-session") == null){
    var sid = guid();
    $.cookie("follow-session", sid)
    var browser = navigator.appName;
    var browserCodename = navigator.appCodeName;
    var browserVersion = navigator.appVersion;
    var browserLanguage = navigator.language;
    var browserPlatform = navigator.platform;
    var payload = {
          "cid": sid,
          "bname":browser,
          "bname2":browserCodename,
          "version":browserVersion,
          "language":browserLanguage,
          "platform":browserPlatform
          }
    $.post(config.verificationurl, payload)
  }else{
    var current = window.location.pathname;
    $.post(config.posturl, {"cid":sid, "path":current})
  }
)
