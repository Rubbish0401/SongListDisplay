import { songlist } from "../data-process/data-process.mjs";
import { createListView } from "../SongList/SongListView.mjs";

document.addEventListener("DOMContentLoaded", root_event => {
	// Get Elements
	back = document.getElementById("back");
	captureBtn = document.getElementById("capture-btn");
	uploadBtn = document.getElementById("upload-btn");

	// Classes

	// Custom
	songlist.setName("SetList");

	// EventListener
	captureBtn.addEventListener("click", event => {
		html2canvas(listview,
			{
				width: listview.offsetWidth,
				scale: captureScale,
				backgroundColor: null,
			}
		).then(canvas => {
			let anchor = document.createElement("a");
			anchor.href = canvas.toDataURL();
			anchor.download = `${songlist.getName()}.png`;
			anchor.click();
			anchor.remove();
		});
	});

	uploadBtn.addEventListener("click", event => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = "application/json";

		input.addEventListener("change", uploadEvent => {
			if(input.files.length > 0){
				let data = input.files[0];
				let reader = new FileReader();

				reader.addEventListener("load", readEvent => {
					let json = JSON.parse(reader.result);
					songlist.importObject(json);

					if(listview) listview.remove();

					listview = createListView(songlist);
					listview.classList.add("screenshot");
					back.insertBefore(listview, captureBtn);
				});

				reader.readAsText(data);
			}

			input.remove();
		})

		input.click();
	});

	// Append
});