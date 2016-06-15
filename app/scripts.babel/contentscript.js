'use strict';

console.log('extension loaded !!!');


var text = $('title').text();
if(text) {
	window.speechSynthesis.speak(
   		new SpeechSynthesisUtterance(text)
	);
}

chrome.runtime.sendMessage({greeting: "hello"}, function(response) { console.log(response); });

navigator.webkitGetUserMedia({ audio: true }, function (stream){
		console.log(stream);
	}, function (e) {
	//console.log("11111111111111111111111111111");
	//func_on_volume(-1);
});
