'use strict';
class KeyMonitor {
	constructor(commands) {
		// code
		this.keyMapping = {};
		this.functionalKeys = ['ctrl','alt','meta','shift']; //long 应放在按键描述的末尾
		this.legalCharPatter = /[0-9a-z\t\r]/i;
		this.specialKeys = {
			'enter' : '\r',
			'tab'	: '\t'
		}
		this.executingCommand = null;
		this.isLongPressNow = false;
		this.lastPressedKey = null;
		this.commands = commands;
		for(let key in commands){
			this.register(key,commands[key]);
		}
	}

	// methods
	/**
		功能键与字符按键之间通过+号分割
	*/
	register(key_commbination,command){
		let keys = key_commbination.split('+');
		let isLongPress = false;
		if (!this.commands[command]) {
			return false;
		};
		if (!keys) {
			return false;
		};
		keys = this._transformSpecialKeys(keys);
		if (keys.length > 1) {
			//判断是否长按
			if (keys[keys.length-1] == 'long') {
				isLongPress = true;
				keys = keys.slice(0,keys.length-1);
			};
			keys = this._normailizeKeys(keys);
		};
		if (keys.indexOf(null) >=0) {
			return false;
		};
		let watchingKey = keys.join('+');
		this.keyMapping[watchingKey] = {'op':this.commands[command],'is_long_press':isLongPress};
		console.log(this.keyMapping);
	}



	startMonitor(){
		if (document) {
			let self = this;
			let currentUpKeys = [];
			document.onkeydown = function(e){
				self._preventEventDefault(e);
				for(let key in self.keyMapping){
					if (self.isKeyPressed(key,e)) {
						console.log('key '+key+' is pressed');
						if (self.executingCommand) {
							//停止当前执行的命令，以便执行新命令
							self.executingCommand.stop();
						};
						let item = self.keyMapping[key];
						self.executingCommand = item['op'];
						self.isLongPressNow = item['is_long_press'];
						self.lastPressedKey = key;
						self.executingCommand.start();
						break;
					}else{
						console.log(key+' is not pressed ');
					}
				}
			}
			document.onkeyup = function(e){
				self._preventEventDefault(e);
				if (!self.isLongPressNow) {
					return;
				};
				self._addUnpressedKey(e,currentUpKeys);
				if (currentUpKeys.join('+') === self.lastPressedKey) {
					self.executingCommand.stop();
					self.executingCommand = null;
					self.lastPressedKey = null;
					self.isLongPressNow = false;
					currentUpKeys = currentUpKeys.slice(0,0);
				};
			};
		};
	}

	isKeyPressed(key,e){
		let isKeyPressed = true;
		let indeedKey = this._getIndeedMonitotedKey(key);
		for(let k in indeedKey){
			if (k != 'char') {
				isKeyPressed = (indeedKey[k] === e[k+'Key']) && isKeyPressed;
			}else{
				isKeyPressed = (indeedKey[k].charCodeAt(0) === e['keyCode']) && isKeyPressed;
			}
		}
		return isKeyPressed;
	}



	_transformSpecialKeys(keys){
		let self = this ;
		return keys.map(key => {
			if (key in self.specialKeys) {
				return self.specialKeys[key];
			};
			return key;
		});
	}

	_normailizeKeys(keys){
		let self = this;
		keys = keys.map( key => {
				if (self.functionalKeys.indexOf(key.toLocaleLowerCase()) >= 0) {
					return key.toLocaleLowerCase();
				}else if (self.legalCharPattern.test(key)){
					if(key >= 'a' && key <= 'z')
						return key.toLocaleUpperCase();
					return key;
				}else{
					return null;
				}
			});
		//对各按键进行排序，以方便索引
		keys.sort();
		return keys;
	}

	_getIndeedMonitotedKey(keyString){
		let keys = keyString.split('+');
		let indeedKey = {
			'ctrl' : false,
			'shift' : false,
			'meta' : false,
			'alt' : false,
			'char' : null
		};
		let self = this ;
		keys.every(key => {
			if (key in self.functionalKeys) {
				indeedKey[key] = true;
 			}else{
 				indeedKey['char'] = key;
 			}
		});
		return indeedKey;
	}

	_addUnpressedKey(event,keySet){
		if (event.ctrlKey) {
			keySet.push('ctrl');
		}
		if (event.metaKey) {
			keySet.push('meta');
		};
		if (event.altKey) {
			keySet.push('alt');
		};
		if (event.shiftKey) {
			keySet.push('shift');
		};
		let char = String.fromCharCode(event.keyCode);
		if (this.legalCharPatter.test(char)) {
			keySet.push(char);
		};
		keySet.sort();
	}

	_preventEventDefault(e){
		e.preventDefault();
	}

}