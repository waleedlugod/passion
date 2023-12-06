const delay = ms => new Promise(res => setTimeout(res, ms));

window.onload = () => {

	init()

}

function init() {

	// get code
	const codeURL = "https://raw.githubusercontent.com/waleedlugod/jco/main/seamcarver.py"
	fetch(codeURL)
	.then(res => res.text())
	.then(text => createText(text));

}

function createText(text) {

	const codeWrapper = document.createElement("div");
	codeWrapper.id = "codeWrapper";

	for (var l = 0; l <= text.length; l++) {

		const char = document.createElement("span");

		char.id = "char" + l;
		char.className = "char";
		char.setAttribute("data-fire", "false");
		if (/\n/.test(text.charAt(l))) {
			char.innerHTML = "<br/>"
		} else if (/\t/.test(text.charAt(l))) {
			char.innerHTML = "&emsp;"
		} else if (/ /.test(text.charAt(l))) {
			char.innerHTML = "&nbsp;"
		} else {
			char.innerHTML = text.charAt(l)
		}

		char.addEventListener("click", () => {
			burn(char.id)
		})

		codeWrapper.appendChild(char);
	}

	document.body.appendChild(codeWrapper);

}

async function burn(id) {

	const char = document.getElementById(id);

	if (char.innerHTML !== "🔥") {

		char.innerHTML = "🔥";
		char.setAttribute("data-fire", "true");
		console.log(id + " on fire 🔥")

		await delay(200);
		burn(char.nextElementSibling.id)
		burn(char.previousElementSibling.id)

		await delay(1000);
		char.remove()
		console.log(id + " burnt ⚱️")

	}

}

function getRndInt(min,max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
