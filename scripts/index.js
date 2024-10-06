document.addEventListener("DOMContentLoaded", async function (root_event) {
	// Starting
	let url = new URL(location.href);
	let params = url.searchParams;
	if (params.has("dataFrom")) {
		let _data = await getDataFromUrl(params.get("dataFrom"));
		data = _data;
	}

	// Get Elements
	back = document.getElementById("back");

	leftListBtn = document.getElementById("btn-list-left");
	rightListBtn = document.getElementById("btn-list-right");

	prefBtn = document.getElementById("btn-pref");
	prefDialogue = document.getElementById("dialogue-pref");
	prefBase = document.getElementById("dialogue-base");

	prefURLInput = document.getElementById("input-pref-url");
	prefInput = document.getElementById("input-pref");

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
	listMain = document.getElementById("list-main");
	listCurrentItem = document.getElementById("list-current-item");
	listCloseBtn = document.getElementById("btn-close-list");

	//List
	if (data) {
		buildList();
		setPosition(data["startAt"]);
	}

	// Custom
	leftListBtn.addEventListener("click", function(event){
		listPane.classList.remove("animation");
		setListSide(0);
		
		setTimeout(() => {
			listPane.classList.add("animation");
			toggleListVisibility();
		}, 0);
	});

	rightListBtn.addEventListener("click", function(event){
		listPane.classList.remove("animation");
		setListSide(1);

		setTimeout(() => {
			listPane.classList.add("animation");
			toggleListVisibility();
		}, 0);
	});

	prefBtn.addEventListener("click", function (event) {
		prefDialogue.showModal();
	});

	prefDialogue.addEventListener("click", function (event) {
		if (event.target == prefDialogue) prefDialogue.close();
	});

	prefInput.addEventListener("change", async function (event) {
		if (event.target.files.length == 0) alert("File not selected");
		else {
			let data = JSON.parse(await event.target.files[0].text());
			console.log(data);
		}
	});

	prefURLInput.addEventListener("change", function (event) {
		if (event.target.value.length > 0) {
			let url = new URL(location.href);
			url.searchParams.set("dataFrom", event.target.value);

			location.href = url.toString();
		}
	});

	prevItem.addEventListener("click", event => setPosition(currentPos - 1));
	nextItem.addEventListener("click", event => setPosition(currentPos + 1));

	listCloseBtn.addEventListener("click", event => toggleListVisibility());

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