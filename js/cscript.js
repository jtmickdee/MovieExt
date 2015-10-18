//gets URL
var url = document.location.href;
url = url.split('www.').pop();
var urlArr = url.split('/');
var domains = urlArr[0].split('.');
urlArr.splice(0,1);
var pages = urlArr;



console.log("URL: " + url);
console.log("Domains: " + domains);
console.log("Pages: "+ pages);


//dull out linnks if already seen
funtion seen(){

}
