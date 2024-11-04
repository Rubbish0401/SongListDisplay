export class SongData{
	#title = "";
	#descriptions = "";
	
	#creators = {
		composer: [],
		lyricist: [],
		arranger: [],
		publisher: [],
	};
	
	//

	#listener = {
		"global": [],
		"import": [],
		"title-change": [],
		"descriptions-change": [],
		"creators-change": [],
	};

	//

	constructor(obj){
		if(obj instanceof SongData) obj = obj.toObject();
		this.importObject(obj);
	}

	/* Static methods */
	static *bulkConstructor(list){ for(let i = 0; i < list.length; i++) yield new SongData(list[i]); }

	/* */
	toObject(){
		return {
			"title": this.#title,
			"descriptions": this.#descriptions,
			"creators": JSON.parse(JSON.stringify(this.#creators)),
		}
	}

	importObject(obj){
		let before = this.toObject();

		if(typeof obj === "object"){
			if(typeof obj.title === "string") this.#title = obj.title;
			if(typeof obj.descriptions === "string") this.#descriptions = obj.descriptions;
			if(typeof obj.creators === "object") this.#creators = obj.creators.filter(value => typeof value === "string");

			let after = this.toObject();
			for(let action of this.#listener["import"]) action({ target: this, before: before, after: after });
			for(let action of this.#listener["global"]) action({ target: this });
		}
	}

	/* getters and settes */

	get title(){ return this.getTitle(); }
	get descriptions(){ return this.getDescriptions(); }
	
	set title(title){}
	set descriptions(descriptions){}

	/* methods to just get or modify parameters */

	getTitle(){ return this.#title; }
	getDescriptions(){ return this.#descriptions; }
	getCreators(key){ return this.#creators.hasOwnProperty(key) ? this.#creators[key] : this.#creators; }

	setTitle(title){
		let before = this.getTitle();
		this.importObject({ title: title });

		let after = this.getTitle();
		for(let action of this.#listener["title-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	setDescriptions(descriptions){
		let before = this.getDescriptions();
		this.importObject({ descriptions: descriptions });

		let after = this.getDescriptions();
		for(let action of this.#listener["descriptions-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	addCreators(key, ...creators){
		let before = this.getCreators();

		let copy = JSON.parse(JSON.stringify(before));
		if(!copy.hasOwnProperty(key)) copy[key] = [];
		copy[key].push(...creators);
		this.importObject({ creators: copy });

		let after = this.getCreators();
		for(let action of this.#listener["creators-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	removeCreators(key, ...creators){
		let before = this.getCreators();

		let copy = JSON.parse(JSON.stringify(before));
		if(copy.hasOwnProperty(key)) copy = copy.filter(value => !creators.includes(value));
		this.importObject({ creators: copy });

		let after = this.getCreators();
		for(let action of this.#listener["creators-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	//

	addEventListener(key, ...actions){
		if(Object.keys(this.#listener).includes(key)) this.#listener[key].push(...actions.filter(value => typeof value === "function"));
	}

	removeEventListener(key, ...actions){
		if(Object.keys(this.#listener).includes(key)) {
				for(let action of actions) if(Object.keys(this.#listener[key]).includes(action)){
					let index = this.#listener[key].indexOf(action);
					this.#listener[key].splice(index, 1);
				}
		}
	}

	clearEventListener(key){
		if(Object.keys(this.#listener).includes(key))
			this.#listener[key] = [];
	}
}

SongData.prototype.valueOf = function(){
	return this.toObject();
}