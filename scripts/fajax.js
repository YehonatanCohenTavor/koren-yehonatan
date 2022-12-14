class Fajax {
    constructor(func, data, onloadFunc) {
        this.func = func;
        this.data = data;
        this.onloadfunc = onloadFunc
    }
    
    onload(response) {
        if (this.onloadfunc) this.onloadfunc(response)
    }

}



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