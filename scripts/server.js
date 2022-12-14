class Server {
    constructor(database) {
        this.database = database;
        
    }
    defineNetwork(network){
        this.network=network
    }
    checkInData(fajax) {
        console.log('Passed in check')
        let fajaxData = fajax.data;
        let fajaxFunction = fajax.func;
        if (fajaxFunction === 'login') {
            this.loginCheck(fajax);
        }
        if (fajaxFunction === 'register') {
            this.register(fajax);
        }
    }

    loginCheck(fajax) {
        let userArray = JSON.parse(this.database.clients);
        let loginObject=fajax.data;
        fajax.response=false;
        for (let user of userArray) {
            if (user.name == loginObject.name && user.password == loginObject.password) {
                fajax.response=true;
            }
        }
        this.backToNetwork(fajax);
    }

    backToNetwork(data){
        this.network.backToClient(data)
    }

    register(fajax) {
        let registerObject=fajax.data
        console.log('Passed in register server')
        
        let userArray = JSON.parse(this.database.clients);
        let isExist = false;
        for (let user of userArray) {
            if (user.name == registerObject.name) {
                isExist = true;
            }
        }
        if(registerObject.name=="")   isExist = true;
        if (!isExist) {
            let newUser = {
                name: registerObject.name,
                password: registerObject.password,
                contacts: [] 
            }
            userArray.push(newUser)
            console.log(newUser);
        }
        
         this.database.newstorage(userArray)
         fajax.response=isExist
        this.backToNetwork(fajax)
    }
}


