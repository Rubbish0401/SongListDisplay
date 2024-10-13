document.addEventListener("DOMContentLoaded", function (root_event) {
	// Starting

	// Get Elements
	back = document.getElementById("back");

	leftListBtn = document.getElementById("btn-list-left");
	rightListBtn = document.getElementById("btn-list-right");

	currentTitle = document.getElementById("current-title");
	currentDescription = document.getElementById("current-description");
	prevItem = document.getElementById("prev-item");
	prevTitle = document.getElementById("prev-title");
	prevDescription = document.getElementById("prev-description");
	nextItem = document.getElementById("next-item");
	nextTitle = document.getElementById("next-title");
	nextDescription = document.getElementById("next-description");

	listPane = document.getElementById("list-pane");
	listMainBack = document.getElementById("list-main-back");
	listCurrentItem = document.getElementById("list-current-item");
	listCloseBtn = document.getElementById("btn-close-list");

	currentLeftBtn = document.getElementById("btn-current-left");
	currentRightBtn = document.getElementById("btn-current-right");

	playPauseBtn = document.getElementById("btn-play-pause");
	uploadBtn = document.getElementById("btn-upload");
	downloadBtn = document.getElementById("btn-download");
	saveBtn = document.getElementById("btn-save");
	removeBtn = document.getElementById("btn-remove");

	//List

	// Custom
	leftListBtn.addEventListener("click", function (event) {
		listPane.classList.remove("animation");
		setListSide(0);

		setTimeout(() => {
			listPane.classList.add("animation");
			toggleListVisibility();
		}, 0);
	});

	rightListBtn.addEventListener("click", function (event) {
		listPane.classList.remove("animation");
		setListSide(1);

		setTimeout(() => {
			listPane.classList.add("animation");
			toggleListVisibility();
		}, 0);
	});

	// List

	listPane.addEventListener("click", event => setListVisibility(false));
	for (child of listPane.children) if (child != listCloseBtn) child.addEventListener("click", event => event.stopPropagation());

	// Global

	// Others
	listSide = Number(listPane.classList.contains("list-right"));
	listVisibility = !listPane.classList.contains("list-hide");
});

window.addEventListener("load", function (root_event) {
	// Custom

	// Global

	// Others
});