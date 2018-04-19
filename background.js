let timer = null

function main () {
  const screenshot = captureScreen()
  console.log('tick tick')
}

function startTracking () {
  console.log('start background')
  if (timer === null) {
    timer = setInterval(main, 1000)
  }
}

function stopTracking () {
  console.log('stop background')
  clearInterval(timer)
  timer = null
}

function captureScreen() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  },
  function (tabs) {
    chrome.tabs.captureVisibleTab(null 
      ,{ format: "png"},
      function (src) {
        console.log('img src', src)
      }
    );
  });
}