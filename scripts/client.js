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

    loginFajax() {
        newhistory = history.state
        let name = document.querySelector('#uname').value;
        let password = document.querySelector('#pass').value;
        let fajax = new Fajax('login', { name: name, password: password }, (x) => {
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
    appendFunc(name) {
        let fajax = new Fajax('getContacts', name, (contacts) => {
            let panel = document.getElementById("contactsPanel")
            for (let person of contacts) {
                let p = document.createElement('p');
                p.setAttribute('id', contacts.indexOf(person));
                p.addEventListener('click', this.deleteContact.bind(this));
                // p.setAttribute('onclick',()=>this.deleteContact());
                p.innerHTML = `${person.name}<br>${person.phone}<br>`;
                panel.appendChild(p);
            }
        })
        this.username = name
        this.fajax = fajax;
        this.sendToNetwork();
    }



    createContact() {
        let contactName = document.querySelector('#addContactName').value;
        let contactPhone = document.querySelector('#addContactPhone').value;
        let panel = document.getElementById("contactsPanel");
        let regex = /^05\d([-]{0,1})\d{7}$/
        if (contactName != "" && regex.test(contactPhone)) {
            let fajax = new Fajax('postContact', { name: contactName, phone: contactPhone, username: this.username }, (id) => {
                let p = document.createElement('p');
                p.setAttribute('id', id);
                p.addEventListener('click', this.deleteContact.bind(this));
                // p.setAttribute('onclick',()=>this.deleteContact());
                p.innerHTML = `${contactName}<br>${contactPhone}<br>`;
                panel.appendChild(p);
            })

            this.fajax = fajax;
      
            this.sendToNetwork();
        }
    }

    registerFajax() {
        let name = document.querySelector('#uname1').value;
        let password = document.querySelector('#pass1').value;
        let fajax = new Fajax('register', { name: name, password: password }, (x) => {
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

    deleteContact(event) {
        if (!bool) {
            let target=event.target
            
            let butt = event.target.getAttribute("id")
            let fajax = new Fajax('deleteContact',{id: butt,username:this.username},()=>{
               let panel= document.getElementById("contactsPanel")
               panel.removeChild(target)
            })
            this.fajax = fajax;
           this.sendToNetwork()
        
        }
    }
}