class Fajax {
    constructor(method,func, data, onloadFunc) {
        this.method=method;
        this.func = func;
        this.data = data;
        this.onloadfunc = onloadFunc
    }
    
    onload(response) {
        if (this.onloadfunc) this.onloadfunc(response)
    }

}



