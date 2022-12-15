class Server {
    constructor(database) {
        this.database = database;

    }
    defineNetwork(network) {
        this.network = network
    }
    checkInData(fajax) {
        console.log('Passed in check')
        // let fajaxData = fajax.data;
        let fajaxFunction = fajax.func;
        let method = fajax.method;
        if (method == 'POST') {
            if (fajaxFunction === 'login') {
                this.loginCheck(fajax);
            }
            if (fajaxFunction === 'register') {
                this.register(fajax);
            }
            if (fajaxFunction === 'postContact') {
                this.postContact(fajax);
            }
        }
        if (method == 'GET') {
            if (fajaxFunction === 'getContacts') {
                this.getContacts(fajax);
            }
            if (fajaxFunction == 'searchContact') {
                this.searchContact(fajax);
            }
        }
        if (method == 'DELETE') {
            if (fajaxFunction === 'deleteContact') {
                this.deleteContact(fajax);
            }
        }
        if (method == 'PUT') {
            if (fajaxFunction === 'putContact') {
                this.putContact(fajax);
            }
        }
    }

    loginCheck(fajax) {
        let userArray = JSON.parse(this.database.clients);
        let loginObject = fajax.data;
        fajax.response = false;
        for (let user of userArray) {
            if (user.name == loginObject.name && user.password == loginObject.password) {
                fajax.response = true;
            }
        }
        this.backToNetwork(fajax);
    }

    backToNetwork(data) {
        this.network.backToClient(data)
    }

    register(fajax) {
        let registerObject = fajax.data
        console.log('Passed in register server')

        let userArray = JSON.parse(this.database.clients);
        let isExist = false;
        for (let user of userArray) {
            if (user.name == registerObject.name) {
                isExist = true;
            }
        }
        if (registerObject.name == "") isExist = true;
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
        fajax.response = isExist
        this.backToNetwork(fajax)
    }

    getContacts(fajax) {
        let username = fajax.data;
        let userArray = JSON.parse(this.database.clients);
        for (let person of userArray) {
            if (person.name == username) {
                fajax.response = person.contacts;
            }
        }
        this.backToNetwork(fajax);
    }

    postContact(fajax) {
        let contactObject = fajax.data;
        let userArray = JSON.parse(this.database.clients);
        let id;
        for (let user of userArray) {
            if (user.name == contactObject.username) {
                id = user.contacts.length;
                user.contacts.push({ name: contactObject.name, phone: contactObject.phone });
                user.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            }
        }
        fajax.response = id;
        this.database.newstorage(userArray)
        this.backToNetwork(fajax);
    }

    deleteContact(fajax) {
        let id = fajax.data.id
        let username = fajax.data.username
        let userArray = JSON.parse(this.database.clients);
        for (let user of userArray) {
            if (user.name == username) {
                user.contacts.splice(id, 1);
            }
        }
        this.database.newstorage(userArray)
        this.backToNetwork(fajax);
    }

    putContact(fajax) {
        let id = fajax.data.id;
        let newName = fajax.data.name;
        let newPhone = fajax.data.phone;
        let username = fajax.data.username;
        let userArray = JSON.parse(this.database.clients);
        for (let user of userArray) {
            if (user.name == username) {
                if (newName != '') {
                    user.contacts[id].name = newName;
                    user.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                }
                if (newPhone != '') {
                    user.contacts[id].phone = newPhone;
                }
            }
        }
        this.database.newstorage(userArray)
        this.backToNetwork(fajax);

    }

    searchContact(fajax) {
        let username = fajax.data.username;
        let name = fajax.data.name;
        console.log(fajax);
        let regex = new RegExp(`^${name}`);
        console.log(regex)
        let userArray = JSON.parse(this.database.clients);
        for (let user of userArray) {
            if (user.name == username) {
                let bool = true;
                for (let person of user.contacts) {
                    if (regex.test(person.name) && bool) {
                        fajax.response = user.contacts.indexOf(person);
                        bool = false;
                    }
                }
                if (bool) {
                    fajax.response = '';
                }
            }
        }
        this.backToNetwork(fajax);

    }

}




