let currTheme = localStorage.getItem('theme');
updateTheme(currTheme);

function switchTheme(){
	if (currTheme == null || currTheme == "null") 
	{ 
		currTheme = 'dark'; 
	}
	currTheme = currTheme == "light" ? "dark" : "light";
	updateTheme(currTheme);
}

function updateTheme(themeStr) {
	if (themeStr == null || themeStr == "null") { themeStr = 'dark'; }
    document.documentElement.setAttribute('data-bs-theme', themeStr)
	localStorage.setItem('theme', themeStr);
	
	let btn = document.getElementById("themeSwitch");
	btn.className = themeStr == "light" ? "btn btn-outline-dark d-flex" : "btn btn-outline-light d-flex"
	btn.innerText = themeStr == "light" ? "Dark" : "Light";
}