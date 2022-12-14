

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
    hash = window.location.hash
    show(newhash)
}

function show(name) {
    let html = document.getElementById(name).innerHTML
    let main = document.querySelector("main")
    main.innerHTML = html
}

function switchTemp() {
    if (hash == "#login") {
        hash = "#register"
        window.location.hash = "#register"
        show("register")
        console.log(window.location.hash)
    }
    else if (hash == "#register") {
        hash = "#login"
        window.location.hash = "#login"
        show("login")
    }
    console.log(window.location.hash)
}
let database = new Database();
let server = new Server(database);
let network = new Network(server);
let app = new Client(network);

// function regFunc() {
//     let name = document.getElementById("uname1").value
//     let password = document.getElementById("pass1").value
//     let obj = { name: name, password: password }
   
//     let check = true;
//     if (JSON.parse(localStorage.getItem("clients"))==null) localStorage.setItem("clients","[]")
//     arr = JSON.parse(localStorage.getItem("clients"))
//     console.log(arr)
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].name == name) {
//             check = false
//         }
//     }
//     if (check == true) {
//         arr.push(obj)
//         localStorage.setItem("clients", JSON.stringify(arr))
//     }

// }



// function logFunc() {
//     let name = document.getElementById("uname").value
//     let password = document.getElementById("pass").value
//     obj1 = { name: name, password: password }

//     arr = JSON.parse(localStorage.getItem("clients"))
//     let check = false;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].name == obj1.name && arr[i].password == obj1.password) {
//             check = true
//             console.log(i)
//         }
//     }
//     if (check == true) {

//         location.hash = "#app"
//         hash = window.location.hash
//         show("app")
//     }
// }