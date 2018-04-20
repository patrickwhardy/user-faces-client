let startTracking = document.getElementById('startTracking');
let stopTracking = document.getElementById('stopTracking');
let generateReport = document.getElementById('generateReport');

startTracking.onclick = function(element) {
  console.log('start popup')
  chrome.extension.getBackgroundPage().startTracking()
}

stopTracking.onclick = function(element) {
  chrome.extension.getBackgroundPage().stopTracking()
  console.log('stop popup')
}

generateReport.onclick = function(element) {
  chrome.tabs.create(
    { url: chrome.runtime.getURL("index.html") },
    function(tab) {
      return
    }
  );
}