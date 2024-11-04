import { SongData } from "./SongData.mjs";
import { SongList } from "./SongList.mjs";

//

const KEY = {
	CURRENT_LIST: "RB9xz8n6LgI9A711fPGe2KBRxiOJCT3O"
};

//

export var songlist = new SongList();

window.addEventListener("storage", event => {
	let dataPlain = localStorage.getItem(KEY.CURRENT_LIST);
	songlist.importObject(dataPlain ? JSON.parse(dataPlain) : (new SongList()).toObject());
});

//