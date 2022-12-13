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
        let username = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let fajax = new Fajax('login', { username: username, password: password });
        this.fajax = fajax;
        this.sendToNetwork();
    }
}