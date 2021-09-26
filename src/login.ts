import registros from './registro';
import { Iusuario } from "./interfaces";



class Login {
    private _usuarioSesion: Iusuario;
    private _users: Array<Iusuario>

    public get usuarioSesion(): Iusuario {
        return this._usuarioSesion
    }

    constructor() {
        this._users = registros.getLocal('UsuariosRegitrados') ? JSON.parse(registros.getLocal('UsuariosRegitrados')!) : [];
        

        this._usuarioSesion = {
            id: 1,
            img:"",
            rol: "",
            nombre: "",
            apellid: "",
            usuario: "",
            password: "",
            email: "",
            cedula: "",
            Comentarios:[],
            Recetas:[],
        };
    
    }

    incioSesionUsuario() {

        let usuario: HTMLInputElement = document.querySelector('#emailLogin')!;
        let password: HTMLInputElement = document.querySelector('#passLogin')!;
        //let item: HTMLInputElement = document.querySelector('#checkid')!;

        let pos = this._users.findIndex(nam => nam.usuario == usuario.value);
        
        if (pos == -1) {
        
            alert('usuario no registrado');
        
        } else {
        
            let inicio = false;
        
            this._users[pos].password == registros.encriptarPassw(password.value) ? inicio = true : alert('contraseña incorrecta');
        
            if (inicio) {
                this._usuarioSesion = registros.usuariosRegistrados[pos];
                registros.setLocal('sesion', JSON.stringify(this._usuarioSesion));
                location.href = "./inicio.html";
            }
        }


        usuario.value = '';
        password.value = '';

    }

}

let login = new Login();

export default login;


