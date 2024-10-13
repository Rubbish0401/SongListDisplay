var data;
var dataFrom;

// Elements
var back;

var leftListBtn;
var rightListBtn;

//
var currentTitle;
var currentDescription;
var prevItem;
var prevTitle;
var prevDescription;
var nextItem;
var nextTitle;
var nextDescription;

// Floating List

var listPane;
var listMainBack;
var listCurrentItem;
var listCloseBtn;

var currentLeftBtn;
var currentRightBtn;

var playPauseBtn;
var uploadBtn;
var downloadBtn;
var saveBtn;
var removeBtn;

//
var listSide;	// 0: left, 1: right
var listVisibility;

var test;

// Functions

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

// Modify Elements

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

//
function saveData(){}
function loadData(){}