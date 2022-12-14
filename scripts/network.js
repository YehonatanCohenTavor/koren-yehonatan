class Network{
    constructor(server) {
        this.server = server;
        this.fajax = '';
        this.server.defineNetwork(this)
    }

    sendToServer(fajax) {
        this.fajax = fajax;
        console.log('Passed network')
        this.server.checkInData(this.fajax);
        this.fajax = null;
    }


}