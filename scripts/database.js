class Database{
    constructor() {
        this.clients =localStorage.getItem('clients');
    }

    newstorage(arr){
        localStorage.setItem('clients', JSON.stringify(arr));
        this.clients =localStorage.getItem('clients');
    }
}

//localStorage.setItem('users',JSON.stringify([{ username: 'admin', password: 'admin',id:1 }]));


