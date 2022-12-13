class Network{
    constructor(server) {
        this.server = server;
        this.fajax = '';
    }

    sendToServer(fajax) {
        this.fajax = fajax;
        checkInData(this.fajax);
        this.fajax = null;
    }


}