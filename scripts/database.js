class Database{
    constructor() {
        this.users = localStorage.getItem('users');
    }
}

//localStorage.setItem('users',JSON.stringify([{ username: 'admin', password: 'admin',id:1 }]));


