class Client{
    constructor(network) {
        this.network = network;
        this.fajax = null;
    }

    sendToNetwork() {
        console.log(this.network.fajax);
        this.network.sendToServer(this.fajax);
       this.fajax = null;
    }

    loginFajax() {
        let name = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let fajax = new Fajax('login', { name: name, password: password });
        this.fajax = fajax;
        this.sendToNetwork();
    }

    registerFajax() {
        let name = document.querySelector('#uname1').value;
        let password = document.querySelector('#pass1').value;
        let fajax = new Fajax('register', { name: name, password: password });
        this.fajax = fajax;
        this.sendToNetwork();
    }
}