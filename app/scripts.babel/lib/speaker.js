'use strict';

class Speaker{
	constructor(){
		this.speaker = window.speechSynthesis;
		this.rate = 1;
		this.currentSpeakText = null;

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

	speak(txt){
		this.currentSpeakText = txt;
		if (this.speaker.speaking || this.speaker.pending) {
			this.speaker.pause();
			this.speaker.cancel();
		};
		let utter = new SpeechSynthesisUtterance(txt);
		utter.rate = this.rate;
		this.speaker.speak(utter);
	}
}