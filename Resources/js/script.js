let isThemeLight = localStorage.getItem('theme');
updateTheme(isThemeLight);

function switchTheme(){
	if (isThemeLight == null || isThemeLight == "null") { isThemeLight = false; }
	isThemeLight = !isThemeLight;
	updateTheme(isThemeLight);
}

function updateTheme(state) {
	if (state == null || state == "null") { state = false; }
	if (state) {
        document.documentElement.setAttribute('data-bs-theme','light')
		localStorage.setItem('theme', true);
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
		localStorage.setItem('theme', false);
    }
	let btn = document.getElementById("themeSwitch");
	btn.className = state ? "btn btn-outline-dark d-flex" : "btn btn-outline-light d-flex"
	btn.innerText = state ? "Dark" : "Light";
}