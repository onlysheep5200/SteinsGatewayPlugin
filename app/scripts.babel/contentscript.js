'use strict';

console.log('extension loaded !!!');


// var text = $('title').text();
// if(text) {
// 	window.speechSynthesis.speak(
//    		new SpeechSynthesisUtterance(text)
// 	);
// }

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) { console.log(response); });

// navigator.webkitGetUserMedia({ audio: true }, function (stream){
// 		console.log(stream);
// 	}, function (e) {
// 	//console.log("11111111111111111111111111111");
// 	//func_on_volume(-1);
// });

var speaker = new Speaker();
var extractor = new SinaWeiboExtrator();
extractor.addItems($('body'));

var commands = {
	'speak next weibo item' : new WeiboSpeakCommand(extractor,speaker),
}

var key_monitor = new KeyMonitor(commands);
key_monitor.register('tab','speak next weibo item');
key_monitor.startMonitor();


