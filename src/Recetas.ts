import registros from "./registro";
import { Ireceta, Iingrediente, ItipoIngrediente, IComentario } from "./interfaces";
import Contenidos from "./inicio";
import { electron } from "webpack";


class Recetas {

    private _recetas: Array<Ireceta>;
    private _ingredientes: Array<Iingrediente>
    private _recetasOcultas: Array<Ireceta>
    private _tipoIngrediente!: Array<ItipoIngrediente>
    private _ingredientesRegistrados: Array<Iingrediente>

    constructor() {
        this._recetas = registros.getLocal('recetas') ? JSON.parse(registros.getLocal('recetas')!) : [];
        this._ingredientes = registros.getLocal('ingredintes') ? JSON.parse(registros.getLocal('ingredintes')!) : [];
        this._recetasOcultas = registros.getLocal('recetasOcultas') ? JSON.parse(registros.getLocal('recetasOcultas')!) : [];
        this._ingredientesRegistrados = registros.getLocal('ingredientesRegistro') ? JSON.parse(registros.getLocal('ingredientesRegistro')!) : [];

        if (registros.getLocal('tipoIngrediente')) {
            this._tipoIngrediente = JSON.parse(registros.getLocal('tipoIngrediente')!);
        } else {
            this._tipoIngrediente = [];
            this.agregarTipoIngredientesbase();
        }

    }

    public get recetas(): Array<Ireceta> {
        return this._recetas
    }

    public get ingredientes(): Array<Iingrediente> {
        return this._ingredientes
    }

    public get recetasOcultas(): Array<Ireceta> {
        return this._recetasOcultas
    }

    public get tipoIngrediente(): Array<ItipoIngrediente> {
        return this._tipoIngrediente
    }
    
    public get IngredienteReceta(): Array<Iingrediente> {
        return this._ingredientesRegistrados
    }

    agregarReceta() {

        let num: number = Math.trunc(Math.random() * 999 + 111);
        let nombre1: HTMLInputElement = document.querySelector('#nombreReceta')!;
        let tiempo1: HTMLInputElement = document.querySelector('#tiempoReceta')!;
        let dificultad1: HTMLSelectElement = document.querySelector('#inputGroupSelect01')!;
        let select = "";
        let descripcion1: HTMLInputElement = document.querySelector('#DescripcionRecetas')!;
        let url: HTMLInputElement = document.querySelector('#urlReceta')!;
        let elaboracion: HTMLInputElement = document.querySelector('#elaboracionReceta')!;


        switch (dificultad1.value) {
            case '1':
                select = 'Facil';
                break;
            case '2':
                select = 'Medio';
                break;
            case '3':
                select = 'Dificil';
                break;
            case '4':
                select = 'Master';
                break;
            default:
                select = 'No definida';


        }
        let inico = new Contenidos();



        let recetaObj: Ireceta = {
            numero: num,
            nombre: nombre1.value,
            tiempo: tiempo1.value,
            dificultad: select,
            numIngredientes: this._ingredientesRegistrados.length,
            ingredientes: this._ingredientesRegistrados,
            urlImg: url.value,
            descripcion: descripcion1.value,
            elaboracion: elaboracion.value,
            comentarios: [],
            autor: inico.user.usuario,
            horaSubida: inico.hora(),
            FechaSubida: inico.fechas()
        }

        this._recetas.push(recetaObj);
        inico.user.Recetas.push(recetaObj);
        registros.setLocal('recetas', JSON.stringify(this._recetas));
        registros.setLocal('sesion', JSON.stringify(inico.user));
    }

    agregarIngredienteRegistro(cod: number) {
        let find = this._ingredientes.findIndex(element => element.cod == cod);
        let aux = "numing";
        let num = `#${aux + cod}`;
        let valor: HTMLInputElement = document.querySelector(num)!;
        let array = this._ingredientes[find]

        let recet: Iingrediente = {
            nombre: array.nombre,
            cod: array.cod,
            urlimagen: array.urlimagen,
            medida: array.medida,
            tipo: array.tipo,
            descripcion: array.descripcion,
            estado: array.estado,
            cantidad: valor.value,
        }

        this._ingredientesRegistrados.push(recet);
        registros.setLocal('ingredientesRegistro', JSON.stringify(this._ingredientesRegistrados));
        let inicio = new Contenidos();
        inicio.listarIngredientesRegistroRecetas();
    }

    quitarIngrediente(cod: number) {

        let find = this._ingredientesRegistrados.findIndex(element => element.cod == cod);

        this._ingredientesRegistrados.splice(find, 1);

        registros.setLocal('ingredientesRegistro', JSON.stringify(this._ingredientesRegistrados))
        let inicio = new Contenidos();
        inicio.listarIngredientesRegistroRecetas();

    }

    agregarOpciones() {
        let barra;


    }

    agregarIngrediente() {
        let nam: HTMLInputElement = document.querySelector('#nombreIngrediente')!;
        let url: HTMLInputElement = document.querySelector('#urlIngrediente')!;
        let codigo: number = Math.trunc(Math.random() * 9999 + 1111);
        let selectmedida: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente')!;
        let selectTipo: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente2')!;
        let descripcion: HTMLInputElement = document.querySelector('#DescripcionIngrediente')!;

        let aux1: string;
        let aux2 = this._tipoIngrediente[parseInt(selectTipo.value)].nombre;
        switch (selectmedida.value) {
            case '1':
                aux1 = 'Libras';
                break;
            case '2':
                aux1 = 'Litros';
                break;
            case '3':
                aux1 = 'Onzas';
                break;
            case '4':
                aux1 = 'Gramos';
                break;
            case '5':
                aux1 = 'inidades';
                break;
            default:
                aux1 = 'No definida';


        };

        let ingredinte: Iingrediente = {
            nombre: nam.value,
            cod: codigo,
            urlimagen: url.value,
            medida: aux1,
            tipo: aux2,
            descripcion: descripcion.value,
            estado: 'En lista',
            cantidad: ""
        };

        this._ingredientes.push(ingredinte);
        registros.setLocal('ingredintes', JSON.stringify(this._ingredientes));
        let inicio = new Contenidos();
        inicio.listarIngredientesRegistro();
        this.eliminarText1()
    }

    eliminarText1() {
        let nam: HTMLInputElement = document.querySelector('#nombreIngrediente')!;
        let url: HTMLInputElement = document.querySelector('#urlIngrediente')!;
        let selectmedida: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente')!;
        let selectTipo: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente2')!;
        let descripcion: HTMLInputElement = document.querySelector('#DescripcionIngrediente')!;

        nam.value = "";
        url.value = "";
        selectmedida.value = 'Seleccione el tipo de medida';
        selectTipo.value = 'Seleccione el tipo de Ingrediente';
        descripcion.value = "";
    }

    agregarTipoIngrediente() {
        let nam: HTMLInputElement = document.querySelector('#nombreTipoIngrediente')!;
        let url: HTMLInputElement = document.querySelector('#urlTipoIngrediente')!;
        let codigo: number = Math.trunc(Math.random() * 99999 + 11111);

        let ingre: ItipoIngrediente = {
            nombre: nam.value,
            cod: codigo,
            url: url.value
        }
        this._tipoIngrediente.push(ingre)
        registros.setLocal('tipoIngrediente', JSON.stringify(this._tipoIngrediente))
        let inicio = new Contenidos();
        inicio.listarTipoIngredientesRegistro();
        this.eliminarText2()
    }

    eliminarText2() {
        let nam: HTMLInputElement = document.querySelector('#nombreTipoIngrediente')!;
        let url: HTMLInputElement = document.querySelector('#urlTipoIngrediente')!;
        nam.value = "";
        url.value = "";
    }

    agregarTipoIngredientesbase() {
        let auxName = "";
        for (let x = 0; x < 10; x++) {
            switch (x) {
                case 1:
                    auxName = 'Aperitivos';
                    break;
                case 2:
                    auxName = 'Aceites y Vinagres';
                    break;
                case 3:
                    auxName = 'Arroces, Pastas, Legumbres';
                    break;
                case 4:
                    auxName = 'Bebidas';
                    break;
                case 5:
                    auxName = 'Conservas y Deshidratados';
                    break;
                case 6:
                    auxName = 'Especias y Hiervas';
                    break;
                case 7:
                    auxName = 'Preparados';
                    break;
                case 8:
                    auxName = 'Salsas';
                    break;
                case 9:
                    auxName = 'Sales y Azúcares';
                    break;
                case 10:
                    auxName = 'Verduras';
                    break;
            };

            let ing: ItipoIngrediente = {
                nombre: auxName,
                cod: x,
                url: ''
            }

            this._tipoIngrediente.push(ing)

        }
        registros.setLocal('tipoIngrediente', JSON.stringify(this._tipoIngrediente));
    }

    alamacenarMensajes(codUser: number, codReceta: number) {
        let inicio = new Contenidos();
        let findReceta = this._recetas.findIndex(element => element.numero == codReceta);
        let findUser = registros.usuariosRegistrados.findIndex(element => element.id == codUser);
        let Coment:HTMLTextAreaElement = document.querySelector('#comentarioRecetas')!;
        let num = Math.trunc(Math.random()*9999999 +1111111);
        let mensaje: IComentario = {
            id:num,
            url:registros.usuariosRegistrados[findUser].img,
            usuario: registros.usuariosRegistrados[findUser].usuario,
            comentario: Coment.value,
            hora: inicio.hora(),
            fecha: inicio.fechas()
        }

        this._recetas[findReceta].comentarios.push(mensaje);
         let actualizarssion = inicio.user.Comentarios.push(mensaje)
        let findG = registros.usuariosRegistrados.findIndex(elem => elem.id == inicio.user.id);
        let atualizarUsuarios = registros.usuariosRegistrados[findG].Comentarios.push(mensaje);
        
        
        registros.setLocal('sesion',JSON.stringify(actualizarssion));
        registros.setLocal('UsuariosRegitrados',JSON.stringify(atualizarUsuarios));
        registros.setLocal('recetas',JSON.stringify(this._recetas));
        inicio.listarPagina(JSON.parse(registros.getLocal('cod')!));
    }

    eliminarMensaje(comnrID: number, codReceta: number){
        let inicio = new Contenidos();
        let findReceta = this._recetas.findIndex(element => element.numero == codReceta);
        console.log(this._recetas[findReceta])
        let findComent = this._recetas[findReceta].comentarios.findIndex(elem => elem.id == comnrID);
        this._recetas[findReceta].comentarios.splice(findComent,1);
        registros.setLocal('recetas',JSON.stringify(this._recetas));
        inicio.listarPagina(JSON.parse(registros.getLocal('cod')!));
    }

}



let recetas = new Recetas();
export default recetas;

