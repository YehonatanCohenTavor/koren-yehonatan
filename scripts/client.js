class Client {
    constructor(network) {
        this.network = network;
        this.fajax = null;
        this.network.defineClient(this)
        this.sent = 0
    }

    sendToNetwork() {
        console.log(this.network.fajax);
        this.network.sendToServer(this.fajax);
        this.fajax = null;
    }

    onLoad(fajax) {
        this.fajax.onload(fajax.response)
    }

    loginFajax() {
        let name = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let fajax = new Fajax('login', { name: name, password: password }, (x) => {
            if (x) {
                show("app")
            }
            else { document.getElementById("errorlog").style.display = "block"
            setTimeout(() => { document.getElementById("errorlog").style.display = "none" }, 5000)}
        });
        this.fajax = fajax;
        this.sendToNetwork();
    }

    registerFajax() {
        let name = document.querySelector('#uname1').value;
        let password = document.querySelector('#pass1').value;
        let fajax = new Fajax('register', { name: name, password: password }, (x) => {
            if (x == true) {
                document.getElementById("errorreg").style.display = "block"
                setTimeout(() => { document.getElementById("errorreg").style.display = "none" }, 5000)

            }
            else {
                document.getElementById("goodreg").style.display = "block"
                setTimeout(() => { document.getElementById("goodreg").style.display = "none" }, 5000)
            }
        });
        this.fajax = fajax;
        this.sendToNetwork();
    }
}