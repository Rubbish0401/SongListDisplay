import { SongData } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongData.mjs";
import { SongList } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongList.mjs";
import { StringProcess } from "https://rubbish0401.github.io/JavaScriptUtils/StringProcess.mjs";

// Constants
const KEY = {
	DATA: "U5DKtyuEeNuJ2DU5owQYnZpw",
};

//

// Functions
saveData = function(position,  songlist){
	let savedData = loadData();
	savedData[position] = songlist.toObject();

	localStorage.setItem(KEY.DATA, JSON.stringify(savedData));
};

loadData = function(position){
	let savedData = JSON.parse(localStorage.getItem(KEY.DATA));
	if(!savedData) savedData = [];

	return isNaN(position) ? savedData : savedData[position];
};