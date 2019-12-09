

var message = "";
var s = 'var message = "' + message+'"';
setMsg = function()
  {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs[0].id);
      chrome.tabs.executeScript(tabs[0].id, {
        code: s
    }, function() {
        chrome.tabs.executeScript(tabs[0].id, {file: 'contentScript.js'});
    });
  });
}

//connect to socket and open a new tab injecting the relevant data
var socket = io.connect('http://localhost:3002');
socket.on('x', function(data) {
  alert("Suspicious activity detected");
  chrome.tabs.create({ url: "http://localhost:8000/profile/"+data.uId});
  message = data.message;
  s = 'var message = "' + message+'"';
  setMsg();
  console.log('Client connected',data);
});
socket.on('y', function(data) {
  setMsg();
  console.log('Client connected',data);
});


