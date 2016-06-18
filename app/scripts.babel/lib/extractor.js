'use strict';

class Extractor{
	nextItem(){}

	currentItemList(){}

	totalItemNum(){}

	addItems(domtree){}

	prevItem(){}

	getItem(index){}
}

class SinaWeiboExtrator extends Extractor{

	/**
		item : 
			{
				author : '作者',
				submitTime : '发布时间',
				content : '内容'
				mainJqItem : jquery dom对象
				handler : 每条微博下对应转发、评论等功能的工具栏
				is_reference : 是否为转发
				reference : item object
			}
	*/

	constructor(){
		super();
		this.startParsedIndex = 1000;
		this.currentParsedIndex = 1000;
		this.endParsedIndex = this.currentParsedIndex;
		this.currentSpeakIndex = 1000;
		this.weboItems = {};
		this.parsedNum = 0;
		this.initialized = false;
	}

	addItems(jqDomItems){
		let rawItems = jqDomItems.find('[node-type="homefeed"]').find('.WB_feed_detail').not('.parsed-by-steins');
		let self = this;
		rawItems.each(function(){
			let item = $(this).find('.WB_detail');
			let parsed = self._parsed(item);
			if(item.find('.WB_feed_expand').size()>0){
				parsed['is_refference'] = true;
				parsed['refference'] = self._parsed(item.find('.WB_feed_expand'));
			}else{
				parsed['is_refference'] = false;
			}
			self.weboItems[self.currentParsedIndex] = parsed;
			item.addClass('parsed-by-steins').addClass('parsed-index-'+self.currentParsedIndex);
			self.endParsedIndex = self.currentParsedIndex;
			self.currentParsedIndex++;
			self.parsedNum += 1;
			console.log(self.weboItems);
		});
		this.currentParsedIndex = this.startParsedIndex;
		if (this.parsedNum > 0) {
			this.initialized = true;
		};
		console.log(this.weboItems);
	}

	nextItem(){
		if (this.currentParsedIndex<=this.endParsedIndex) {
			return this.weboItems[this.currentParsedIndex++];
		}
		else{
			return null;
		}
	}

	currentItemList(){
		return this.weboItems;
	}

	totalItemNum(){
		return this.parsedNum;
	}

	prevItem(){
		if (this.currentParsedIndex<=this.startParsedIndex) {
			return null;
		}else{
			return this.weboItems[--this.currentParsedIndex];
		}
	}

	getItem(index){
		if (index < this.startParsedIndex && (this.startParsedIndex+index) <= this.endParsedIndex) {
			return this.weboItems[this.startParsedIndex+index];
		}else if (index >= this.startParsedIndex && index <= this.endParsedIndex){
			return this.weboItems[index];
		}else{
			return null;
		}
	}

	isInit(){
		return this.initialized;
	}

	_parsed(item){
		let parsed = {};
		parsed['author'] = item.find('.WB_info').find('a').text();
		parsed['submitTime'] = item.find('.WB_from > a[node-type="feed_list_item_date"]').attr('title');
		parsed['content'] = item.find('.WB_text').text();
		parsed['mainJqItem'] = item;
		parsed['handler'] = item.find('.WB_handle');
		return parsed;
	}
}