class Client {
    constructor(network) {
        this.network = network;
        this.fajax = null;
        this.network.defineClient(this)
        // window.addEventListener('popstate',()=>{
        //     if (location.hash=="#login") history.replaceState(newhistory,"",location.hash)
        //     // this.loginFajax.bind(this)
        // });
        window.addEventListener('load', this.appendFunc.bind(this, sessionStorage.getItem('currentUser')));

    }

    sendToNetwork() {
        console.log(this.network.fajax);
        this.network.sendToServer(this.fajax);
        this.fajax = null;
    }

    onLoad(fajax) {
        this.fajax.onload(fajax.response)
    }

    registerFajax() {
        let name = document.querySelector('#uname1').value;
        let password = document.querySelector('#pass1').value;
        let fajax = new Fajax('POST', 'register', { name: name, password: password }, (x) => {
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

    loginFajax() {
        newhistory = history.state
        let name = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let fajax = new Fajax('POST', 'login', { name: name, password: password }, (x) => {
            if (x) {
                show("app")
                this.appendFunc(name)
                sessionStorage.setItem('currentUser', name);
            }
            else {
                document.getElementById("errorlog").style.display = "block"
                setTimeout(() => { document.getElementById("errorlog").style.display = "none" }, 5000)
            }
        });
        this.fajax = fajax;
        this.sendToNetwork();
    }

    createContact() {
        let contactName = document.querySelector('#addContactName').value;
        let contactPhone = document.querySelector('#addContactPhone').value;
        let panel = document.getElementById("contactsPanel");
        let regex = /^05\d([-]{0,1})\d{7}$/
        if (contactName != "" && regex.test(contactPhone)) {
            let fajax = new Fajax('POST', 'postContact', { name: contactName, phone: contactPhone, username: this.username }, (id) => {
                let panel = document.getElementById("contactsPanel")
                panel.innerHTML = ""
                this.appendFunc(this.username)
            })

            this.fajax = fajax;

            this.sendToNetwork();
        }
    }

    appendFunc(name) {

        let fajax = new Fajax('GET', 'getContacts', name, (contacts) => {
            let panel = document.getElementById("contactsPanel")
            for (let person of contacts) {
                let p = document.createElement('div');
                p.setAttribute('id', contacts.indexOf(person));
                p.addEventListener('click', this.deleteContact.bind(this));
                if (!deleteBool) { p.style.cursor = "pointer" }
                else p.style.cursor = "auto"
                p.innerHTML = `<b>Contact ${contacts.indexOf(person)}</b><br><i>${person.name}</i><br>${person.phone}<br>`;
                panel.appendChild(p);
            }
        })
        this.username = name

        this.fajax = fajax;
        this.sendToNetwork();


    }

    searchContact() {
        let byName = document.getElementById('searchByName').value;
        if (byName != '') {
            let fajax = new Fajax('GET', 'searchContact', { name: byName, username: this.username }, (id) => {
                document.getElementById('searchResult').innerHTML = id;
            })
            this.fajax = fajax;
            this.sendToNetwork()
        }
    }


    deleteContact(event) {

        if (!deleteBool) {

            let butt = event.target.getAttribute("id")
            let fajax = new Fajax('DELETE', 'deleteContact', { id: butt, username: this.username }, () => {
                let panel = document.getElementById("contactsPanel")
                panel.innerHTML = ""
                this.appendFunc(this.username)
            })
            this.fajax = fajax;
            this.sendToNetwork()
        }
    }

    putContact() {
        let contactId = document.getElementById('editByNumber').value;
        let contactNewName = document.getElementById('editContactName').value;
        let contactNewPhone = document.getElementById('editContactPhone').value;
        let regex = /^05\d([-]{0,1})\d{7}$/

        if (contactId != '' && (regex.test(contactNewPhone) || contactNewPhone == '')) {
            let fajax = new Fajax('PUT', 'putContact', { id: contactId, name: contactNewName, phone: contactNewPhone, username: this.username }, () => {
                let panel = document.getElementById("contactsPanel");
                panel.innerHTML = "";
                this.appendFunc(this.username);
            })
            this.fajax = fajax;
            this.sendToNetwork()
        }
    }



}

 // let p = document.createElement('div');
                // p.setAttribute('id', id);
                // p.addEventListener('click', this.deleteContact.bind(this));
                // if (!deleteBool) { p.style.cursor = "pointer" }
                // else p.style.cursor = "auto"
                // p.innerHTML = `<b>Contact ${id}</b><br><i>${contactName}</i><br>${contactPhone}<br>`;
                // panel.appendChild(p);