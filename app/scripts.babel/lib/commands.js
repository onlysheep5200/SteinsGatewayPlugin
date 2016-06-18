'use strict';
class BaseCommand{
	start(){};
	stop(){};
};

class WeiboSpeakCommand extends BaseCommand{
	constructor(extractor,speaker){
		super();
		this.extractor = extractor;
		this.speaker = speaker;
	}

	start(){
		console.log('speak command start!!!');
		if (this.extractor.isInit()) {
			let item = this.extractor.nextItem();
			if (!item) {
				console.log('数据未加载完成');
				console.log(this.extractor);
				return;
			};
			console.log(item);
			let txt_list = [];
			let txt = '来自'+item['author']+'  ';
			txt_list.push(txt);
			if (item['is_refference']) {
				item = item['reffernece'];
				txt += '转发自'+item['author']+'  ';
				txt_list.push(txt);
			};
			txt_list.push(item['content']);
			this.speaker.speak(txt_list.join('  '));
		}else{
			console.log(this.extractor);
		}
	}
}