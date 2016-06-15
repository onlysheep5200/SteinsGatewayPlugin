'use strict';

class Extractor{
	nextItem(){}

	currentItemList(){}

	totalItemNum(){}

	addItems(domtree){}

	prevItem(){}

	getItem(index){}
}

class SinaWeiboExtrator{

	/**
		item : 
			{
				
			}
	*/

	constructor(){
		this.currentParsedItemNum = 0;
		this.startParsedIndex = 1000;
		this.currentSpeakIndex = 1000;
		this.weboItems = {};
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
		});
	}

	_parsed(item){
		parsed['author'] = item.find('.WB_info').find('a').text();
		parsed['submitTime'] = item.find('.WB_from > a[node-type="feed_list_item_date"]').attr('title');
		parsed['content'] = item.find('.WB_text').text();
		parsed['mainJqItem'] = item;
		parsed['handler'] = item.find('.WB_handle');
	}
}