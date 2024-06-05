function makeRequest(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json().then(data => {
        const message = data.message;
        if (message === 'pause' || message === 'resume' || message === 'mute' || message === 'unmute' || message === 'forward' || message === 'rewind') {
          console.log('Received event:', message);
          chrome.tabs.query({}, function(tabs){
            tabs.forEach(tab => {
              if (tab.url.includes('youtube.com')) {
                chrome.scripting.executeScript({
                  target: {tabId: tab.id},
                  function: executeContentScript,
                  args: [message]
                });
              }
            });
          });
        }
      });
    })
    .catch(error => {
      console.log("");
    });
}


function requestLoop(url) {
  setInterval(() => {
    makeRequest(url)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }, 3000);
}
const reloadInterval = 27*1000;

function reloadExtension() {
  chrome.runtime.reload();
}
setInterval(reloadExtension, reloadInterval);
// URL to request
const url = "http://127.0.0.1:5000";

function executeContentScript(data) {
  if (data === 'pause') {
    document.querySelectorAll('.html5-main-video').forEach(vid => vid.pause());
  } 
  
  else if (data === 'resume') {
    document.querySelectorAll('.html5-main-video').forEach(vid => vid.play());
  }
  
  else if (data === 'mute') {
    document.querySelectorAll('.html5-main-video').forEach(vid => vid.volume = 0);
  }
  
  else if (data === 'unmute') {
    document.querySelectorAll('.html5-main-video').forEach(vid => vid.volume = 0.5);
  }
  
  else if (data === 'forward') {
    const time = document.querySelector('video').currentTime;
    document.querySelector('video').currentTime = (time + 10);
  }
  
  else if (data === 'rewind') {
    const time = document.querySelector('video').currentTime;
    document.querySelector('video').currentTime = (time - 10);
  }
}

chrome.runtime.onStartup.addListener(() => {
  chrome.runtime.reload();
});



requestLoop(url);
