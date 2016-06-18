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
		});
		this.currentParsedIndex = this.startParsedIndex;
	}

	nextItem(){
		if (this.currentParsedIndex<=self.endParsedIndex) {
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

	_parsed(item){
		parsed['author'] = item.find('.WB_info').find('a').text();
		parsed['submitTime'] = item.find('.WB_from > a[node-type="feed_list_item_date"]').attr('title');
		parsed['content'] = item.find('.WB_text').text();
		parsed['mainJqItem'] = item;
		parsed['handler'] = item.find('.WB_handle');
	}
}