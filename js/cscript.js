//Content Scripts
//gets URL
var url = document.location.href;
var trueUrl = document.location.href;
var solarmovie = 'https://www.solarmovie.ph/';

//primewire
if(url.indexOf('external.php?') > -1){
  url = splitHTTP(url);
  console.log(url.split('/external.php?')[1].split('&')[0].split('title=')[1].replace(/[+]+/g," "));
}

//solarmovie
if(url.indexOf(solarmovie + 'tv/') > -1){
  var temp = createLink(nextPage(url));
  temp.innerText = 'Next Episode';
  var x = document.getElementsByClassName('overViewBox')[0].appendChild(temp);
  var currUrl = urlSplit(trueUrl.split(solarmovie)[1]);
  currUrl.push('1');
  sendURL(currUrl);
}
// var testUrl = url.join('/');
// if(testUrl.indexOf(solarmovie + 'tv/') > -1){
//   var currUrl = urlSplit(testUrl);
//   currUrl.push('1');
//   console.log(currUrl);
//   sendURL(currUrl);
// }
//sees if video is playing on solarmovie and then does something
if(url.indexOf('cinema') > -1){
  var x = document.getElementsByTagName('a');
  for(var i = 0; i < x.length; i++){
    if(x[i].title.indexOf('Back to movie page') > -1){
      var page = urlSplit(x[1].href);
      page.push('0');
      sendURL(page);
    }
    if(x[i].href.indexOf(solarmovie) > -1){
      //sendURL(x);
  }
}
  //console.log(x);
}

//split url into sub categories and return the pages
function urlSplit(pUrl){
  if(pUrl.indexOf("https:") > -1){
    pUrl = pUrl.split('www.').pop();
  }
  else {
    pUrl = pUrl.split('http://').pop();
  }
  var urlArr = pUrl.split('/');
  var domains = urlArr[0].split('.');
  urlArr.splice(0,1);
  var pages = urlArr;
  console.log("URL: " + pUrl);
  console.log("Domains: " + domains);
  console.log("Pages: " + pages);
  return pages;
};

//sends url to background script
function sendURL(x){
  console.log(x);
  //var url = urlSplit(x[i].href);
  chrome.runtime.sendMessage({'url': x}, function(response) {
    console.log(response);
  });
}

//gets rid off http
function splitHTTP(url){
  return url.split('http://')[1];
}

//gets rid off https
function splitHTTPS(url){
  return url.split('https://')[1];
}

//splits url and returns a link
function nextPage(pageUrl){
  var nextPage = urlSplit(pageUrl);
  for ( var i = nextPage.length ; i >= 0; i--){
    if(nextPage[i]){
      var split = nextPage[i].split('-');
      var nextEp = split.pop();
      nextEp = Number(nextEp)+1;
      var nextUrl = split + '-'+nextEp;
      url = pageUrl.split('/');
      url.pop();
      url.pop();
      return url.join('/') + '/'+nextUrl;
    }
  }

}
//creates a link
function createLink(link){
  var a = document.createElement('a');
  a.href = link;
  return a;
}
