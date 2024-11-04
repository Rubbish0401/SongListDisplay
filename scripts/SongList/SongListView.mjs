import { SongList } from "../data-process/SongList.mjs";
import { SongData } from "../data-process/SongData.mjs";

import songlistStructure from "../../styles/SongList/songlist-structure.css" with { type: "css" };
import songlistFace from "../../styles/SongList/songlist-face.css" with { type: "css" };

document.addEventListener("DOMContentLoaded", event => {
	let structureCss = document.createElement("link");
	let faceCss = document.createElement("link");

	structureCss.rel = "stylesheet";
	faceCss.rel = "stylesheet"

	structureCss.href = "styles/SongList/songlist-structure.css";
	faceCss.href = "styles/SongList/songlist-face.css";

	document.head.appendChild(structureCss);
	document.head.appendChild(faceCss);
});

export function createListView(songlist){
	// Create Element
	let back = document.createElement("div");

	let titleHead = document.createElement("div");
	let title = document.createElement("div");
	let mainHead = document.createElement("div");
	let mainSection = document.createElement("div");

	let mainScroller = document.createElement("div");

	// Classes
	back.classList.add("songlist", "list-back");

	titleHead.classList.add("songlist", "section-label", "title-head");
	title.classList.add("songlist", "title-label");
	mainHead.classList.add("songlist", "section-label");
	mainSection.classList.add("songlist", "main-section");

	mainScroller.classList.add("songlist", "main-scroller");

	// Custom
	titleHead.innerText = "Current";
	title.innerText = "It\'s now singing";
	mainHead.innerText = "List";

	// EventListener

	// Append
	back.appendChild(titleHead);
	back.appendChild(title);
	back.appendChild(mainHead);
	back.appendChild(mainSection);

	mainSection.appendChild(mainScroller);

	// If songlist is available
	if(songlist instanceof SongList){
		title.innerText = songlist.get().getTitle();
		mainHead.innerText = songlist.getName();

		songlist.addEventListener("position-change", obj => {
			title.innerText = obj.target.get().getTitle();
		});

		for(let songdata of songlist.getAllSongs()){
			// Create Elements
			let itemBack = document.createElement("div");
			let mainLabel = document.createElement("div");
			let subLabel = document.createElement("div");
	
			// Classes
			itemBack.classList.add("songlist", "list-item", "item-back");
			mainLabel.classList.add("songlist", "list-item", "main-label");
			subLabel.classList.add("songlist", "list-item", "sub-label");
	
			// Custom
			mainLabel.innerText = songdata.getTitle();
			subLabel.innerText = songdata.getDescriptions();
	
			// EventListner
			songdata.addEventListener("import", obj => {
				mainLabel.innerText = obj.after.title;
				subLabel.innerText = obj.after.descriptions;
			});
	
			// Append
			itemBack.appendChild(mainLabel);
			itemBack.appendChild(subLabel);
			mainScroller.appendChild(itemBack);
		}
	}

	// End

	return back;
}