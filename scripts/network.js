class Network{
    constructor(server) {
        this.server = server;
        this.fajax = '';
    }

    sendToServer(fajax) {
        this.fajax = fajax;
        console.log('Passed network')
        checkInData(this.fajax);
        this.fajax = null;
       
    }


}