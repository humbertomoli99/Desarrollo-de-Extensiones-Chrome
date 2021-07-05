var STRINGS = {
    a: '<a class="yt-simple-endpoint style-scope ytd-grid-video-renderer"',
    b: 'href="/watch?v=',
    c: 'https://www.youtube.com/embed/'
};

var interval;
var url = "https://www.youtube.com/channel/UCWSKQyNDhvBVrddHIhzx5Zg";
var videoName = 'ERROR';
var embedLink = "";


// 'window.webkitStorageInfo' is deprecated. Please use 'navigator.webkitTemporaryStorage' or 'navigator.webkitPersistentStorage' instead.
var storageInfo = null;

if(navigator.webkitTemporaryStorage) {
  storageInfo = navigator.webkitTemporaryStorage;
} else if(navigator.webkitPersistentStorage) {
  storageInfo = navigator.webkitPersistentStorage;
} else if (window.webkitStorageInfo) {
  storageInfo = window.webkitStorageInfo;
}

function notify(name,icon,video,link) {
    var notification = new Notification(name+"has a new video.",{
        icon: icon,
        body: "click to open:\n" + video
    });
}

function getVideoName(response) {
    var index1, index2, index3, videoNameString;
    indexl = response.indexOf(STRINGS.a);
    index2 = response.indexOf(">", index1) + 1;
    index3 = response.indexOf("</a>", index2);
    videoNameString = response.substring(index2, index3);
    videoName = videoNameString;
    if(localStorage.lastVideo != videoName) {
        var notification = new Notification("Nuevo video",{
            icon: 'https://iconarchive.com/download/i90837/icons8/windows-8/Hands-So-So.ico',
            body: videoName
        });
        notification.onclick = function(){
            windo.open(bgUrl,"popup","width=640,height=360");
        };
    }
    localStorage.lastVideo = videoName;
}

function getEmbedLink(response) {
    var index1, index2, videoEmbedString;
    index1 = response.indexOf(STRINGS.b) + STRINGS.b.length;
    index2 = response.indexOf('"', index1);
    videoEmbedString = response.substring(index1, index2);
    embedLink = STRINGS.c + videoEmbedString;
}

function analyze(response) {
    getVideoName(response);
    getEmbedLink(response);
}

function check() {
    if (localStorage.youtubechannel) url = localStorage.youtubechannel;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            analyze(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
    interval = setTimeout(check, 2000);
}
check();