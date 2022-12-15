let deleteBool = true
if (location.hash == "") {
    location.hash = "#login"
}
show(location.hash.replace('#', ''))

let hash = window.location.hash;


let arr = []
let obj1

history.replaceState({}, 'wd', location.hash);
window.addEventListener('popstate', poppin);


let database = new Database();
let server = new Server(database);
let network = new Network(server);
let app = new Client(network);
let newhistory = {}


if (location.hash=="#app"&& sessionStorage.getItem("currentUser")=="") {
    document.getElementById("appErrorDiv").style.display = "block"
    document.getElementById("appShowDiv").style.display = "none"
}
else if(location.hash=="#app") {
    document.getElementById("appErrorDiv").style.display = "none"
    document.getElementById("appShowDiv").style.display = "block"
}

function poppin() {
    let newhash = location.hash.replace('#', '');
    show(newhash);
    if (location.hash == '#login') {
        sessionStorage.setItem("currentUser","");
    }
    if (location.hash=="#app"&& sessionStorage.getItem("currentUser")=="") {
        document.getElementById("appErrorDiv").style.display = "block"
        document.getElementById("appShowDiv").style.display = "none"
    }
    else if(location.hash=="#app") {
        document.getElementById("appErrorDiv").style.display = "none"
        document.getElementById("appShowDiv").style.display = "block"
    }

}

function show(name) {
    location.hash = `#${name}`
    let html = document.getElementById(name).innerHTML
    let main = document.querySelector("main")
    main.innerHTML = html
}

function switchTemp() {
    if (location.hash == "#login") {
        window.location.hash = "#register"
        show("register")
    }
    else if (location.hash == "#register") {
        window.location.hash = "#login"
        show("login")
    }
}

function canDelete() {
    let contactArr = document.getElementById("contactsPanel").children
    if (deleteBool) {
        document.getElementById("delMessage").style.display = "block"
        deleteBool = false
        document.getElementById("deleteButton").innerText = "Back"
        for (let child of contactArr) {
            child.style.cursor = "pointer"
        }
    }
    else {
        document.getElementById("delMessage").style.display = "none"
        deleteBool = true
        document.getElementById("deleteButton").innerText = "Delete"
        for (let child of contactArr) {
            child.style.cursor = "auto"
        }
    }
}
