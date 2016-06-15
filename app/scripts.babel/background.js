'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
	// let content = msg.content;
	// content.log('content comming : '+content);
	// if(content){
	// 	chrome.tts.speak(content,{'lang':'zh-CN','ratio':2.0},function () {
	// 		if (chrome.runtime.lastError) {
	// 			console.log('Error : '+chrome.runtime.lastError.message);
	// 		};
	// 	});
	// 	sendResponse({'status':'success'});
	// }
	navigator.webkitGetUserMedia({ audio: true }, function (stream){
		console.log(stream);
	}, function (e) {
	//console.log("11111111111111111111111111111");
	//func_on_volume(-1);
	});
});



