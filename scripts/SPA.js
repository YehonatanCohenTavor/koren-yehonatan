let bool=true

if (location.hash == "") {
    location.hash = "#login"
}
show(location.hash.replace('#', ''))

let hash = window.location.hash;


let arr = []
let obj1

history.replaceState({}, 'wd', location.hash);
window.addEventListener('popstate', poppin);

function poppin() {
    let newhash = location.hash.replace('#', '');
    show(newhash)
}

function show(name) {
    location.hash=`#${name}`
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

function canDelete(){
    if(bool){
        document.getElementById("delMessage").style.display="block"
        bool=false
        document.getElementById("deleteButton").innerText="Back"
    }
    else{
        document.getElementById("delMessage").style.display="none"
        bool=true
        document.getElementById("deleteButton").innerText="Delete"
    }
}

let newhistory={}

let database = new Database();
let server = new Server(database);
let network = new Network(server);
let app = new Client(network);
