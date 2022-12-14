class Network{
    constructor(server) {
        this.server = server;
        this.fajax = '';
        this.server.defineNetwork(this)
       
    }

    defineClient(client){
        this.client=client
    }
    backToClient(fajax){
        this.client.onLoad(fajax)
    }

    sendToServer(fajax) {
        this.fajax = fajax;
        console.log('Passed network')
        this.server.checkInData(this.fajax);
        this.fajax = null;
    }


}