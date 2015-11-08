//Background Scripts
//stores in cloud storage
function setSync(type){
  chrome.storage.sync.set(type, function(){
    console.log('Successfully stored');
  })
};

function getSync(type){
  var resp;
  chrome.storage.sync.get(type, function(response){
    //console.log(response);
    resp = response;
  })
  return resp;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.url);
    var pops = request.url.pop();
    console.log(pops);
    if(pops === '0'){
      var title = request.url.splice(0,1);
      var body = request.url;
      var newRequest = (title + " " + body).replace('-',' ');
      var obj = {}
      var obj2 = {};
      var obj3 ={}
      obj3[body[2]] = 'Watched';
      obj2[body[1]] = obj3;;
      obj[body[0]] = obj2;
      sendResponse(obj);
      setSync(obj);
      getSync(null);
    }
    else if(pops == '1'){
      var tempReq = getSync(request.url);
      console.log(tempReq);
      if(tempReq != null){
        sendResponse('Seen');
        console.log('Seen');
      }
    }


    //getSync('tv');
    //sendResponse(getSync(request));
  });
