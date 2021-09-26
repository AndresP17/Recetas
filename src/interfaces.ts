export interface Iusuario {
    id:number
    rol: string
    nombre: string,
    apellid: string,
    usuario: string,
    password: string,
    email: string,
    cedula: string,
    Comentarios:Array<IComentario>,
    Recetas:Array<Ireceta>,
    img:string
}

export interface IComentario{
    id:number
    usuario:string,
    url:string,
    comentario:string
    hora:string,
    fecha:string,
}

export interface Ireceta{
    numero:number
    nombre:string
    tiempo:string
    dificultad:string
    numIngredientes: number
    ingredientes:Array<Iingrediente>
    urlImg:string
    elaboracion:string,
    descripcion:string
    comentarios:Array<IComentario>,
    autor:string 
    horaSubida:string
    FechaSubida:string
}

export interface Iingrediente {

    nombre:string
    cod:number
    urlimagen:string
    medida:string
    tipo:string//tipo ingrediente aki 
    descripcion:string
    estado:string
    cantidad:string

}

export interface ItipoIngrediente{
    nombre:string
    cod:number
    url:string
}