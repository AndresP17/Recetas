import { Iusuario } from "./interfaces";
import Swal from "sweetalert2";
class Registros {

    private _usuariosRegistrados: Array<Iusuario>

    constructor() {
        if (this.getLocal('admin')) {
            this._usuariosRegistrados = JSON.parse(this.getLocal('UsuariosRegitrados')!);
        } else {
            this._usuariosRegistrados = [];
            this.registrarAdmin()
        }
    }

    public get usuariosRegistrados(): Array<Iusuario> {
        return this._usuariosRegistrados
    }

    registrarAdmin() {

        let admin: Iusuario = {
            id: 1001,
            rol: 'admin',
            img:"",
            nombre: 'pepe',
            apellid: '',
            usuario: 'administ11',
            password: this.encriptarPassw('123'),
            email: 'adminsUnitions@gmail.com',
            cedula: '',
            Comentarios: [],
            Recetas: []
        }
        this._usuariosRegistrados.push(admin);
        this.setLocal('admin', JSON.stringify(this._usuariosRegistrados));
        this.setLocal('UsuariosRegitrados', JSON.stringify(this._usuariosRegistrados));
    }

    registrarUsuario() {
        let uNam: HTMLInputElement = document.querySelector('#firstName')!;
        let uApell: HTMLInputElement = document.querySelector('#lastName')!;
        let uUsuario: HTMLInputElement = document.querySelector('#username')!;
        let uPass: HTMLInputElement = document.querySelector('#password')!;
        let uEmail: HTMLInputElement = document.querySelector('#email')!;
        let uCedula: HTMLInputElement = document.querySelector('#Cedula')!;
        let id: number = Math.trunc(Math.random() * 9999 + 1111);

        /*
                var inputs : HTMLInputElement[] = [...document.querySelectorAll<HTMLInputElement>("input[type='checkbox']")];
                
                console.log(inputs[0].checked); //si chekea es true si no es false 
        */
        let usuario: Iusuario = {
            id: id,
            img:"",
            rol: 'Usuario',
            nombre: uNam.value,
            apellid: uApell.value,
            usuario: uUsuario.value,
            password: this.encriptarPassw(uPass.value),
            email: uEmail.value,
            cedula: uCedula.value,
            Comentarios: [],
            Recetas: []
        }
        this._usuariosRegistrados.push(usuario)

        Swal.fire(
            'Bienvenido',
            `k pez mi zo ${uUsuario.value}`,
            'success'
        )
        this.elimnarCont();
        this.setLocal('UsuariosRegitrados', JSON.stringify(this._usuariosRegistrados));

    }

    elimnarCont() {
        let uNam: HTMLInputElement = document.querySelector('#firstName')!;
        let uApell: HTMLInputElement = document.querySelector('#lastName')!;
        let uUsuario: HTMLInputElement = document.querySelector('#username')!;
        let uPass: HTMLInputElement = document.querySelector('#password')!;
        let uEmail: HTMLInputElement = document.querySelector('#email')!;
        let uCedula: HTMLInputElement = document.querySelector('#Cedula')!;
        uNam.value = "";
        uApell.value = "";
        uUsuario.value = "";
        uPass.value = "";
        uEmail.value = "";
        uCedula.value = "";
    }
    
    encriptarPassw(pass: string) {


        let encryp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let dif = pass.toUpperCase().split('');
        let nueva = '';

        for (let i = 0; i < dif.length; i++) {
            let buscar = encryp.findIndex(element => element == dif[i])
            let resultado = buscar + 1
            if (dif[i] == 'Z') {
                resultado = 0
            } else if (dif[i] == '9') {
                resultado = 26
            }
            if (dif[i] == ' ') {
                nueva += '-'
            }
            nueva += encryp[resultado]
        }
        return nueva
    }

    setLocal(key: string, value: string) {
        localStorage.setItem(key, value)

    }

    getLocal(key: string) {
        return localStorage.getItem(key)
    }

}

let registros = new Registros()
export default registros;













