'use strict';

class Speaker{
	constructor(){
		this.speaker = window.speechSynthesis;
		this.rate = 1;
		this.currentSpeakTexts = null;

	}

	getRate(){
		return this.rate;
	}

	setRate(rate){
		this.rate = rate;
	}

	rateUp(){
		this.rate+=1;
	}

	rateDown(){
		if (this.rate>1) {
			this.rate -- ;
		};
	}

	speak(txt_list){
		if (!(txt_list instanceof Array)) {
			txt_list = [txt_list]
		};
		console.log(txt_list);
		this.currentSpeakTexts = txt_list;
		if (this.speaker.speaking || this.speaker.pending) {
			this.speaker.pause();
			this.speaker.cancel();
		};
		txt_list.every(txt => {
			// let utter = new SpeechSynthesisUtterance(txt);
			// utter.rate = this.rate;
			this.speaker.speak(new SpeechSynthesisUtterance(txt));
		})
	}
}