let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  // let color = element.target.value;
  //   chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
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

