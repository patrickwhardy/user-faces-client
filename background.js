let timer, imageCapture, headShot, screenShot
const baseUrl = "http://localhost:3000/"

function main () {
  captureScreen()
  captureFace()
  // if (headShot && screenShot) {
    postImages(headShot, screenShot)
  // }
  console.log('tick tick', headShot, screenShot)
}

function startTracking () {
  console.log('start background')
  connectWebcam()
  if (!timer) {
    timer = setInterval(main, 1000)
  }
}

function stopTracking () {
  clearInterval(timer)
  timer = null
  console.log('stop background')
}

function connectWebcam () {
  console.log('connecting cam')
  navigator.mediaDevices.getUserMedia({video: true})
    .then(gotMedia)
    .catch(error => console.error('getUserMedia() error:', error));

  function gotMedia(mediaStream) {
    const mediaStreamTrack = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(mediaStreamTrack);
    console.log('img', imageCapture);
  }
}

function captureFace () {
  if (imageCapture) {
    imageCapture.takePhoto().then(blob => {
      console.log('Took photo:', blob);
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      headShot = reader.result
      console.log('headshot', reader.result)
    }).catch(err => console.log('you got errrred again!', err))
  }
}

function captureScreen() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  },
  function (tabs) {
    chrome.tabs.captureVisibleTab(null
      ,{ format: "jpeg"},
      function (src) {
        // debugger
        screenshot = src //new Blob([src], {type: "image/png"});
      }
    );
  });
}

function postImages(faceShot, screenShot) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", baseUrl + 'track_event', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      console.log('got de responz', xhr.responseText)
    }
  }
  const mockBody = {
    head_shot: 'hi',
    screen_shot: 'bye'
  }
  
  xhr.send(mockBody)
}