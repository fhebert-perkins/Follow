$(document).onload(
  var config = $.getJSON("/follow-config.json", function(data){
    return data
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
  $.each(config.elems, function(elem){
    $(elem).addClass("follow");
  });
);
$(".follow").click(function(){
  $.post(config.posturl, {"cid":sid,
                          "path":window.location.pathname,
                          "action":"click",
                          "id" : this.attr("id"),
                          "name": this.attr("name"),
                          "type": this.previousSibling.tagName,
                        });
});
