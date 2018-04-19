let timer, imageCapture, headShot, screenShot
const reader = new FileReader()

function main () {
  captureScreen()
  captureFace()
  if (headShot && screenShot) {
    postImages(headShot, screenShot)
  }
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
      reader.readAsDataURL(blob)
      headShot = reader.result
      debugger
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

}