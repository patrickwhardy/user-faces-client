let allow = document.getElementById('allow');

allow.onclick = function(element) {
  console.log('this thing done fired')
  navigator.webkitGetUserMedia({video: true}, function (mediaStream) {
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      console.log(imageCapture);
    }, function (err) {
      console.error('getUserMedia() error:', err)
    })
}