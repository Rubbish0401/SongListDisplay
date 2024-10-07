var data;

// Elements
var back;

var leftListBtn;
var rightListBtn;

var prefBtn;
var prefDialogue;
var prefBase;

var prefURLInput;
var prefInput;

var currentTitle;
var currentDescription;
var prevItem;
var prevTitle;
var prevDescription;
var nextItem;
var nextTitle;
var nextDescription;

var listPane;
var listMainBack;
var listMain;
var listCurrentItem;
var listCloseBtn;

//
var currentPos;
var listSide;	// 0: left, 1: right
var listVisibility;

// Functions
function setPosition(pos) {
	// Initialise
	currentPos = 0;

	currentTitle.innerText = "";
	currentDescription.innerText = "";
	prevTitle.innerText = "";
	prevDescription.innerText = "";
	nextTitle.innerText = "";
	nextDescription.innerText = "";

	listCurrentItem.innerText = "";

	//
	if (data != null) {
		currentPos = Math.min(data["list"].length - 1, Math.max(0, pos));

		currentTitle.innerText = data["list"][currentPos]["title"];
		currentDescription.innerText = data["list"][currentPos]["description"];
		prevTitle.innerText = currentPos > 0 ? data["list"][currentPos - 1]["title"] : "";
		prevDescription.innerText = currentPos > 0 ? data["list"][currentPos - 1]["description"] : "";
		nextTitle.innerText = currentPos < data["list"].length - 1 ? data["list"][currentPos + 1]["title"] : "";
		nextDescription.innerText = currentPos < data["list"].length - 1 ? data["list"][currentPos + 1]["description"] : "";

		listCurrentItem.innerText = data["list"][currentPos]["title"];

		if (listMain.offsetWidth < listCurrentItem.offsetWidth) {
			listCurrentItem.classList.add("text-loop");
		} else {
			listCurrentItem.classList.remove("text-loop");
		}
	}
}

async function getDataFromUrl(url) {
	try {
		if (typeof url == "string") {
			let response = await fetch(url);
			if (response.ok) return response.json();
			else throw new Error("No response");
		} else {
			throw new Error(`${url} is not a string`);
		}
	} catch (error) {
		console.log(error.toString());
		return null;
	}
}

//

// Modify Elements
function buildList() {
	// Initialise
	while (listMain.children.length > 0) listMain.children[0].remove();

	//
	if (data) for (let i = 0; i < data["list"].length; i++) {
		let item = document.createElement("span");
		item.classList.add("list-item");
		item.innerText = data["list"][i]["title"];

		listMain.appendChild(item);
		if (listMain.offsetWidth < item.offsetWidth) item.classList.add("text-loop");
	}

	// Scroll Animation
	if (listMain.offsetHeight > listMainBack.offsetHeight) {
		listMain.style.animation = `${60 * data["list"].length / 8}s linear -${15 * data["list"].length / 8}s vertical-loop infinite`;
	} else {
		listMain.style.animation = "";
	}
}

function setListSide(side) {
	side = Boolean(side);
	listPane.classList.remove(`list-${side ? "left" : "right"}`);
	listPane.classList.add(`list-${!side ? "left" : "right"}`);

	listSide = Number(side);
}

function toggleListSide() {
	listPane.classList.toggle("list-left");
	listPane.classList.toggle("list-right");

	listSide = Number(listPane.classList.contains("list-right"));
}

function setListVisibility(bool) {
	if (bool) {
		back.classList.add("list-hide");
		listPane.classList.remove("list-hide");
	} else {
		back.classList.add("list-hide");
		listPane.classList.add("list-hide");
	}

	listVisibility = bool;
}

function toggleListVisibility() {
	back.classList.toggle("list-hide");
	listPane.classList.toggle("list-hide");

	listVisibility = !listPane.classList.contains("list-hide");
}