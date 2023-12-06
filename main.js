window.onload = () => {

	init()

}

function init() {

	// get code
	const codeURL = "https://raw.githubusercontent.com/waleedlugod/jco/main/seamcarver.py"
	fetch(codeURL)
	.then(res => res.text())
	.then(text => createText(text));

	document.onmouseup = burnSelected
}

// creates element where all characters are inside a span
function createText(text) {

	const codeWrapper = document.createElement("div");
	codeWrapper.id = "codeWrapper";

	for (var l = 0; l <= text.length; l++) {

		const char = document.createElement("span");

		char.id = "char" + l;
		char.className = "char";
		char.setAttribute("data-fire", "false");

		// conserve spacing, new lines, and tabs
		if (/\n/.test(text.charAt(l))) {
			char.innerHTML = "<br/>"
		} else if (/\t/.test(text.charAt(l))) {
			char.innerHTML = "&emsp;"
		} else if (/ /.test(text.charAt(l))) {
			char.innerHTML = "&nbsp;"
		} else {
			char.innerHTML = text.charAt(l)
		}

		char.onclick = () => burn(char.id)

		codeWrapper.appendChild(char);
	}

	document.body.appendChild(codeWrapper);

}

// replaces the character with 🔥
async function burn(id) {

	const char = document.getElementById(id);

	if (char.innerHTML !== "🔥") {

		char.innerHTML = "🔥";
		char.setAttribute("data-fire", "true");

		// burn nearby chars
		setInterval(() => {
			if (char.nextElementSibling) { burn(char.nextElementSibling.id) }
			if (char.previousElementSibling) { burn(char.previousElementSibling.id) }
		}, getRndInt(0, 1000));

		// flame dies
		setInterval(() => { char.remove() }, getRndInt(1000, 30000));

		burnout()

	}

}

// burn chars selected with cursor
function burnSelected() {

	const selection = window.getSelection();
	if (!selection.rangeCount) return;

	const range = selection.getRangeAt(0);

	range.cloneContents()
		.querySelectorAll('.char')
		.forEach(e => burn(e.id));

}

// closes the window if no more chars
function burnout() {

	const codeWrapper = document.getElementById("codeWrapper")
	if (codeWrapper.childElementCount <= 0) { close() }

}

function getRndInt(min,max) {

	return Math.floor(Math.random() * (max - min)) + min;

}
