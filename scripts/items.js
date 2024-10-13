import { SongData } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongData.mjs";
import { SongList } from "https://rubbish0401.github.io/JavaScriptUtils/SongListDisplay/SongList.mjs";
import { StringProcess } from "https://rubbish0401.github.io/JavaScriptUtils/StringProcess.mjs";

//
var global = window.globalThis;

//
var editing;

var scrollCount = 0;
var scrollable0;
var scrollable1;
var scrollInterval;

function createItemAdder() {
	let back = document.createElement("div");
	back.classList.add("list-item-common", "item-adder");

	let img = document.createElement("img");
	img.classList.add("item-adder-icon");
	img.src = "src/images/svg/plus_white.svg";

	back.addEventListener("click", function (event) {
		let songdata = new SongData({ "title": "New", "descriptions": "New song" });
		let pos = [...back.parentElement.children].indexOf(back) / 2;

		let newItem = createNewItem(songdata);
		let newAdder = createItemAdder();

		data.addSongData(pos, songdata);
		back.after(newItem);
		newItem.after(newAdder);
	});

	back.appendChild(img);

	return back;
}

function createNewItem(songdata) {
	let to;

	let back = document.createElement("div");
	back.classList.add("list-item-common", "list-item-main");
	setTimeout(() => {
		back.classList.add("shown");
	}, 0);

	let textHolder = document.createElement("div");
	textHolder.classList.add("list-item-text");

	let label = document.createElement("input");
	label.classList.add("list-item-label");
	label.type = "text";
	label.value = songdata.getTitle();
	label.disabled = true;
	label.addEventListener("change", function (event) {
		songdata.setTitle(event.target.value);
		label.disabled = true;
		descriptions.focus();
	});
	label.addEventListener("keydown", function (event) {
		if (event.key == "Tab") event.preventDefault();
		if (event.key == "Enter" || event.key == "Tab") event.target.dispatchEvent(new InputEvent("change"));
	});

	let descriptions = document.createElement("input");
	descriptions.classList.add("list-item-descriptions");
	descriptions.type = "text";
	descriptions.value = songdata.getDescriptions();
	descriptions.disabled = true;
	descriptions.addEventListener("change", function (event) {
		songdata.setDescriptions(event.target.value);
		descriptions.disabled = true;
	});
	descriptions.addEventListener("keydown", function (event) {
		if (event.key == "Enter") event.target.dispatchEvent(new InputEvent("change"));
	});

	let editBtn = document.createElement("img");
	editBtn.classList.add("list-item-edit-btn");
	editBtn.src = "src/images/svg/edit_white.svg";
	editBtn.style.transform = "rotateY(0deg)";
	editBtn.addEventListener("click", function (event) {
		if (event.target.style.transform == "rotateY(0deg)") {
			label.disabled = false;
			descriptions.disabled = false;

			label.focus();

			editing = [textHolder, label, descriptions];
		} else {
			listMainBack.children[2 * data.position + 1].classList.remove("selected");

			let index = [...listMainBack.children].indexOf(back);
			let pos = (index - 1) / 2;
			let isPrevious = pos < data.position;

			data.remove(pos);

			listMainBack.children[index + 1].remove();
			listMainBack.children[index].remove();

			setPosition(data.position + (-1) * isPrevious);
		}
	});
	editBtn.addEventListener("contextmenu", function (event) {
		event.preventDefault();

		let index = Number(event.target.style.transform == "rotateY(0deg)");
		event.target.style.transform = ["rotateY(0deg)", "rotateY(180deg)"][index];

		to = setTimeout(function () {
			event.target.src = ["src/images/svg/edit_white.svg", "src/images/svg/delete_white.svg"][index];
			to = null;
		}, 250);
	});
	editBtn.addEventListener("pointerout", function (event) {
		clearTimeout(to);
		to = null;

		editBtn.style.transform = "rotateY(0deg)";
		editBtn.src = "src/images/svg/edit_white.svg";
	});


	textHolder.appendChild(label);
	textHolder.appendChild(descriptions);

	back.appendChild(textHolder);
	back.appendChild(editBtn);

	return back;
}

function setPosition(pos) {
	// Initialise

	currentTitle.innerText = "";
	currentDescription.innerText = "";
	prevTitle.innerText = "";
	prevDescription.innerText = "";
	nextTitle.innerText = "";
	nextDescription.innerText = "";

	listCurrentItem.innerText = "";

	//
	if (data.length > 0) {
		listMainBack.children[2 * data.position + 1].classList.remove("selected");
		data.position = pos;

		listMainBack.children[2 * data.position + 1].classList.add("selected");
		if (!scrollable1) listMainBack.children[2 * data.position + 1].scrollIntoView({ behavior: "smooth" });

		let prev = data.get(data.position - 1), cur = data.get(), next = data.get(data.position + 1);

		currentTitle.innerText = cur.title;
		currentDescription.innerText = cur.descriptions;
		prevTitle.innerText = prev ? prev.title : "";
		prevDescription.innerText = prev ? prev.descriptions : "";
		nextTitle.innerText = next ? next.title : "";
		nextDescription.innerText = next ? next.descriptions : "";

		listCurrentItem.innerText = cur.title;

		/*if (listMain.offsetWidth < listCurrentItem.offsetWidth) {
			listCurrentItem.classList.add("text-loop");
		} else {
			listCurrentItem.classList.remove("text-loop");
		}*/
	}
}

function buildList() {
	// Initialise
	if (scrollInterval) clearInterval(scrollInterval);
	scrollInterval = null;
	scrollCount = data.position;

	while (listMainBack.children.length > 0) listMainBack.children[0].remove();

	// Main part of the list
	listMainBack.appendChild(createItemAdder());
	if (data && data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			listMainBack.appendChild(createNewItem(data.getSongData(i)));
			listMainBack.appendChild(createItemAdder());
		}
		setTimeout(function(){
			listMainBack.children[2 * data.position].scrollIntoView({ behavior: "smooth" });
		}, 1000);

		listCurrentItem.innerText = data.get().title;

		scrollable0 = true;
		scrollable1 = false;

		playPauseBtn.src = `src/images/svg/${["play", "pause"][Number(scrollable1)]}_white.svg`;
		playPauseBtn.title = ["Play", "Pause"][Number(scrollable1)];

		scrollInterval = setInterval(function () {
			if (data.length > 0 && scrollable0 && scrollable1) {
				scrollCount++;
				listMainBack.children[2 * (scrollCount % data.length)].scrollIntoView({ behavior: "smooth" });
			}
		}, 5000);
	}
}

document.addEventListener("DOMContentLoaded", async function (root_event) {
	let url = new URL(location.href);
	let params = url.searchParams;
	data = new SongList();
	if (params.has("dataFrom")) {
		let _data = await getDataFromUrl(decodeURIComponent(params.get("dataFrom")));
		if(_data){
			data = SongList.parse(_data);
			dataFrom = url;
		}
	}else{
		let _data = loadData(0);
		if(_data) data = SongList.parse(_data);
	}

	buildList();
	setPosition(data.position);

	//
	currentLeftBtn.addEventListener("click", event => setPosition(data.position - 1));
	currentRightBtn.addEventListener("click", event => setPosition(data.position + 1));

	playPauseBtn.addEventListener("click", function (event) {
		scrollable1 = !scrollable1;
		event.target.src = `src/images/svg/${["play", "pause"][Number(scrollable1)]}_white.svg`;
		event.target.title = ["Play", "Pause"][Number(scrollable1)];
	});

	uploadBtn.addEventListener("click", function (event) {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = "application/json";
		input.click();

		input.addEventListener("change", function (event) {
			let files = event.target.files;
			if (files.length > 0) {
				let file = files[0];
				let reader = new FileReader();
				reader.onload = () => {
					let _data = JSON.parse(reader.result);
					data = new SongList([...SongData.bulkConstructor(_data["list"])], _data["startAt"]);

					buildList();
					setPosition(data.position);
				};

				reader.readAsText(file);
			}
			input.remove();
		});
	});

	downloadBtn.addEventListener("click", function (event) {
		if(data.length > 0){
			let now = new Date();
			let filename = "songlist_" + [
				StringProcess.fillChars(String(now.getFullYear()), 4, "0"),
				StringProcess.fillChars(String(now.getMonth() + 1), 2, "0"),
				StringProcess.fillChars(String(now.getDate()), 2, "0"),
				StringProcess.fillChars(String(now.getHours()), 2, "0"),
				StringProcess.fillChars(String(now.getMinutes()), 2, "0"),
				StringProcess.fillChars(String(now.getSeconds()), 2, "0"),
				StringProcess.fillChars(String(now.getMilliseconds()), 3, "0"),
			].join("") + ".json";

			let blob = new Blob([JSON.stringify(data.toObject())], { type: "application/json" });
			let anchor = document.createElement("a");
			anchor.href = URL.createObjectURL(blob);
			anchor.download = filename;
			anchor.click();
			anchor.remove();
		}
	});

	saveBtn.addEventListener("click", function (event) {
		saveData(0, data);
		if(dataFrom) location.href = url.href.replace(url.search, "");
	});

	removeBtn.addEventListener("click", function(event){
		data = new SongList();
		buildList();
		setPosition(data.position);
	});

	//
	document.addEventListener("pointerover", function (event) {
		if (editing && editing.indexOf(event.target) == -1) {
			editing[1].dispatchEvent(new InputEvent("change"));
			editing[2].dispatchEvent(new InputEvent("change"));
			editing = null;
		}
	});

	listMainBack.addEventListener("pointerover", function (event) {
		scrollable0 = false;
	});

	listMainBack.addEventListener("pointerout", function (event) {
		scrollable0 = true;
	});

	//
	prevItem.addEventListener("click", event => setPosition(data.position - 1));
	nextItem.addEventListener("click", event => setPosition(data.position + 1));

	//
	document.addEventListener("keydown", function(event){
		let keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
		let index = keys.indexOf(event.key);
		if(!editing){
			if(index != -1) setPosition(data.position - (-1) ** index);
			else if(event.key == " ") playPauseBtn.dispatchEvent(new PointerEvent("click"));
		}
	});
});

window.addEventListener("load", async function () {
});