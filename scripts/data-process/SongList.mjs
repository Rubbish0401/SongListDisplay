import { SongData } from "./SongData.mjs";

var count = 0;

export class SongList{
	#name = `SongList ${count}`;
	#startAt = 0;
	#position = 0;
	#songs = [];

	//

	#listener = {
		"global": [],
		"import": [],
		"name-change": [],
		"position-change": [],
		"songs-change": [],
		"songs-add": [],
		"songs-remove": [],
		"song-change": [],
	};

	//

	constructor(obj){
		if(obj instanceof SongList) obj = obj.toObject();
		this.importObject(obj);
		this.setPosition(this.#startAt);

		count++;
	}

	//
	toObject(){
		let self = this;
		return {
			name: this.#name,
			startAt: this.#startAt,
			list: [...(function* (){ for(let song of self.getAllSongs()) yield song.toObject() })()],
		}
	}

	importObject(obj){
		let before = this.toObject();
		
		if(typeof obj === "object"){
			if(typeof obj.name === "string") this.#name = obj.name;
			if(!isNaN(obj.startAt)) this.#startAt = obj.startAt;
			if(!isNaN(obj.position) && obj.position >= 0 && obj.position < this.getLength()) this.#position = Math.floor(obj.position);
			if(typeof obj.list === "object") this.#songs = [...(function*(){ for(let songObj of obj.list) yield new SongData(songObj) })()];
			if(typeof obj.songs === "object") this.#songs = obj.songs.filter(value => value instanceof SongData);

			let after = this.toObject();
			for(let action of this.#listener["import"]) action({ target: this, before: before, after: after });
			for(let action of this.#listener["global"]) action({ target: this });
		}
	}

	/* getter and setter*/
	get length(){ return this.getLength(); }
	get position(){ return this.getPosition(); }

	set length(length){}
	set position(pos){ return this.setPosition(pos); }

	/* methods to just get or modify parameters */

	getName(){ return this.#name; }
	getPosition(){ return this.#position; }
	getLength(){ return this.#songs.length; }

	setName(name){
		let before = this.getName();
		this.importObject({ name: name });

		let after = this.getName();
		for(let action of this.#listener["name-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	setPosition(pos){
		let before = this.getPosition();
		this.importObject({ position: pos });
		
		let after = this.getPosition();
		for(let action of this.#listener["global"]) action({ target: this });
		for(let action of this.#listener["position-change"]) action({ target: this, before: before, after: after });
	}

	shiftPosition(diff){
		let pos = this.getPosition(), len = this.getLength();
		this.setPosition(((pos + diff % len) + len) % len);
	}

	*getTitleList(){ for(let song of this.#songs) yield song.getTitle(); }

	/* Songs */

	get(pos = this.getPosition()){ return this.getSongData(pos); }
	getSongData(pos = this.getPosition()){ return this.#songs[parseInt(pos)]; }
	getAll(){ return this.getAllSongs() }
	getAllSongs(){ return [...this.#songs]; }

	set(pos, songdata){ this.setSongData(pos, songdata); }
	add(pos = this.getLength(), ...songdata){ this.addSongData(pos, ...songdata); }
	remove(pos){ return this.removeSongData(pos); }

	setSongData(pos, songdata){
		let before = this.getSongData(pos), beforeAll = this.getAllSongs();

		let copy = [...beforeAll];
		if(songdata instanceof SongData && pos >= 0 && pos < this.getLength()) copy[Math.floor(pos)] = songdata;
		this.importObject({ songs: copy });

		let after = this.getSongData(pos), afterAll = this.getAllSongs();
		for(let action of this.#listener["song-change"]) action({ target: this, position: Math.floor(pos), before: before, after: after });
		for(let action of this.#listener["songs-change"]) action({ target: this, before: beforeAll, after: afterAll });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	addSongData(pos = this.getLength(), ...songdata){
		let before = this.getAllSongs();

		let copy = [...before];
		copy = [
			...copy.slice(0, pos),
			...songdata.filter(value => value instanceof SongData),
			...copy.slice(pos)
		];
		this.importObject({ songs: copy });

		let after = this.getAllSongs();
		for(let action of this.#listener["songs-add"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["songs-change"]) action({ target: this, before: before, after: after });
		for(let action of this.#listener["global"]) action({ target: this });
	}

	removeSongData(pos){
		let before = this.getAllSongs();
		
		pos = Math.floor(pos);
		let copy = [...before];
		let target = this.getSongData(pos);
		this.importObject({ songs: [...copy.slice(0, pos), ...copy.slice(1 + pos)]});

		let after = this.getAllSongs();
		for(let action of this.#listener["songs-remove"]) action({ target: this, position: pos, removed: target, before: before, after: after });
		for(let action of this.#listener["songs-change"]) action({ target: this, before: before, after: after });
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