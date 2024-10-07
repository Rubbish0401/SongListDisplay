import { SongData } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongData.mjs";
import { SongList } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongList.mjs";

function createAddItem(){
	let back = document.createElement("div");
	let img = document.createElement("img");
	img.src = "https://rubbish.github.io/SongListDisplay/src/images/svg/plus_white.svg";

	back.addEventListener("click", function(event){
		let songdata = new SongData();
		let pos = [...back.parentElement.children].indexOf(back);

		let newItem = createNewItem(songdata);
		let newAddItem = createAddItem();

		window.globalThis.data.addSongData(pos, songdata);
		back.after(newItem);
		newItem.after(newAddItem);
	});

	back.appendChild(img);

	return back;
}

function createNewItem(songdata){
	let back = document.createElement("div");

	return back;
}

window.addEventListener("load", function(){
	window.globalThis.data = new SongList();
	window.globalThis.listMain.appendChild(createAddItem());
});