let startTracking = document.getElementById('startTracking');
let stopTracking = document.getElementById('stopTracking');
let generateReport = document.getElementById('generateReport');

startTracking.onclick = function(element) {
  chrome.tabs.query({
    active: true, 
    currentWindow: true 
  },
  function (tabs) {
    chrome.tabs.captureVisibleTab(null 
      ,{ format: "png"},
      function (src) {
        // chrome.tabs.create(
        //     { url: chrome.runtime.getURL("index.html") },
        //     function(tab) {
        //       $('body').append("<img src='" + src + "'></img>");
        //     }
        //   );        
        console.log('img src', src)
        // $('body').append("<img src='" + src + "'>" + tabs[0].url + "</img>");//appends captured image to the popup.html
      }
    ); 
  });
};

