import registros from './registro';
import login from './login';
import recetas from './Recetas';
import Contenidos from './inicio';
import Swal from 'sweetalert2';


class Codigos {
    private _btn: HTMLButtonElement;
    private _pag: HTMLHtmlElement;
    
    constructor() {
        this._btn = document.querySelector('#btnRegister')!;

        this._pag = document.querySelector('#namepag')!;


        switch (this._pag.textContent) {
            case 'pagina inicio':
                this.inicio()
                break;
            case 'pagina login':
                this.login();
                break;
            case 'pagina registro':
                this.Registros();
                break;
            case 'pagina registro Recetas':
                this.RegistrarRecetas();
                break;
            case 'pagina Listar usuarios':
                this.generarContenidoListaUsuarios();
                break;
            case 'pagina Listar Recetas':
                this.generarContenidoListaRecetas();
                break;
            case 'pagina Ver Recetas':
                this.generarContenidoListaRecetasUsuario();
                break;
            case 'pagina listar Ingrediente':
                this.listarIngredientesRegistroInt();
                break;
            case 'pagina listar tipo Ingrediente':
                this.listarTipoIngredientesRegistroInt();
                break;
        }

    }

    Registros() {
        this._btn = document.querySelector('#btnRegister')!;
        this._btn.addEventListener('click', e => {
            registros.registrarUsuario();
        })
    }

    login() {
        this._btn = document.querySelector('#btnRegister2')!;
        this._btn.addEventListener('click', e => {
            login.incioSesionUsuario();
        })
    }

    cerrarCuenta() {
        let inicio = new Contenidos();
        inicio.cerrarSesion();
    }

    inicio() {
        let inicio = new Contenidos();
        /* 
        como esta en constante actualizacion 
        entonces se va a estar repitiendo a comparacion de los otros
         que se inician de manera manual */

    }

    RegistrarRecetas() {
        let inicio = new Contenidos();
        inicio.listarIngredientesRegistroRecetas()
        this._btn = document.querySelector('#btnRegisterRecetas')!;
        this._btn.addEventListener('click', e => {
            recetas.agregarReceta();
        })
    }

    generarContnidoReceta(cod:number) {
        let inicio = new Contenidos();
        this._btn = document.querySelector('#btnGenerarPaginaReg'+cod.toString())!;
        this._btn.addEventListener('click', e => {
            registros.setLocal('cod',JSON.stringify(cod));
            location.href = ('../dist/recetaPagina.html');       
        })
    }

    generarContnidoReceta2(){
        let inicio = new Contenidos();
        if (registros.getLocal('cod')){
            inicio.listarPagina(JSON.parse(registros.getLocal('cod')!));
        }else{
            location.href = ('../dist/inicio.html');
        }
    }

    generarContenidoListaUsuarios() {
        let inicio = new Contenidos();
        inicio.generarContenidoListaUsuario();
    }

    generarContenidoListaRecetas() {
        let inicio = new Contenidos();
        inicio.generarContenidoListaRecetas();
    }

    generarContenidoListaRecetasUsuario() {
        let inicio = new Contenidos();
        inicio.generarContenidoListaRecetasUsuario();
    }

    listarIngredientesRegistroInt() {
        this._btn = document.querySelector('#btnRegisterIngredientes')!;
        this._btn.addEventListener('click', e => {

            recetas.agregarIngrediente();
        })

        let inicio = new Contenidos();
        inicio.listarIngredientesRegistro();
        inicio.listarTiposEnIngredientes()

    }

    listarTipoIngredientesRegistroInt() {
        this._btn = document.querySelector('#btnRegisterTipoIngredientes')!;
        this._btn.addEventListener('click', e => {
            recetas.agregarTipoIngrediente();
        })
        let inicio = new Contenidos();
        inicio.listarTipoIngredientesRegistro();
    }

    editarUsuarioIndex(cod: number) {
        let inico = new Contenidos();
        inico.editarUsuario(cod);
    }

    editarUsuarioIndex2() {
        let inicio = new Contenidos();
        inicio.editarUsuario2();
    }

    eliminarUsuarioIndex(cod: number) {
        let inico = new Contenidos();
        inico.borrarUsuario(cod);
    }

    kkk() {
        Swal.fire({
            icon: 'error',
            title: 'kkkkk',
            text: 'No se puede borrar ni editar al admin pa',
        })
    }
    
    listarButtonad(){
        let inicio = new Contenidos();
        inicio.listarButton()
    }

    editarlistas(cod: number, select: number) {
        let inicio = new Contenidos();
        switch (select) {
            case 1:
                inicio.eliminarIngrediente(cod);
                break;
            case 2:
                inicio.editarIngrediente(cod);
                break;
            case 3:
                inicio.borrarTipoIngrediente(cod);
                break;
            case 4:
                inicio.editarTipoIngrediente(cod);
                break;
            case 5:
                inicio.borrarRecetaUsuario(cod);
                break;
        }


    }
    
    selecOption(cod: number, select: number) {
        let inicio = new Contenidos();
        switch (select) {
            case 1:
                inicio.borrarReceta(cod);
                break;
            case 2:
                inicio.ocultarReceta(cod);
                break;
            case 3:
                inicio.mostartReceta(cod);
                break;
            case 4:
                inicio.editarReceta(cod);
                break;
        }
    }

    listRecetasCompl(cod:number,pos:number){

        switch(pos){
            case 1:
                recetas.agregarIngredienteRegistro(cod);
                break;
            case 2:
                recetas.quitarIngrediente(cod);
                break;
        }
    }

    sendMensaje(codUser:number,codReceta:number){
        recetas.alamacenarMensajes(codUser,codReceta);
    }

    eliminarMensaje(codUser:number,codReceta:number){
        recetas.eliminarMensaje(codUser,codReceta);
    }

}

module.exports = {
    codigo: new Codigos()
};

