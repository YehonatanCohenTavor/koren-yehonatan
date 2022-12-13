class Server{
    constructor(database) {
        this.database = database;
    }

    checkInData(fajax) {
        let fajaxData = fajax.data;
        let fajaxFunction = fajax.func;
        
    }

    login(username, password) {
        let userArray = this.database;
        for (let user of userArray) {
            if (user.username === username && user.password === password) {
                alert(`Welcome back ${username}`);
                return;
            } 
        }
        alert('Login failed. Wrong username or password');
        return;
    }
}


