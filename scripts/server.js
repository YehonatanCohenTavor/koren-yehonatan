class Server {
    constructor(database) {
        this.database = database;

    }

    checkInData(fajax) {
        console.log('Passed in check')
        let fajaxData = fajax.data;
        let fajaxFunction = fajax.func;
        if (fajaxFunction === 'login') {
            this.loginCheck(fajaxData);
        }
        if (fajaxFunction === 'register') {
            this.register(fajaxData);
        }
    }

    loginCheck(loginObject) {
        let userArray = JSON.parse(this.database.clients);
        for (let user of userArray) {
            if (user.name == loginObject.name && user.password == loginObject.password) {
                backToNetwork('login',user.contacts)
            }
        }
    }

    register(registerObject) {
        console.log('Passed in register server')
        if (JSON.parse(localStorage.getItem("clients")) == null) localStorage.setItem("clients", "[]");
        let userArray = JSON.parse(this.database.clients);
        let isExist = false;
        for (let user of userArray) {
            if (user.name == loginObject.name) {
                isExist = true;
            }
        }
        if (!isExist) {
            let newUser = {
                name: registerObject.name,
                password: registerObject.password,
                contacts: [] 
            }
            userArray.push(newUser)
            localStorage.setItem('clients', JSON.stringify(userArray));
            console.log(newUser);
        }else console.log('Already exists');
        //backToNetwork('register', isExist);
    }
}


