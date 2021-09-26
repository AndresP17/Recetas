import registros from './registro';
import { Iusuario, Ireceta } from "./interfaces";
import Swal from 'sweetalert2';
import recetas from './Recetas';


export default class Contenidos {

  private _usuario!: Iusuario;
  private _contenido!: Array<Ireceta>;
  private _contenidoPagina!: HTMLElement;

  public set user(v: Iusuario) {
    this._usuario = v;
  }

  public get user(): Iusuario {
    return this._usuario
  }

  constructor() {
    if (registros.getLocal('sesion')) {
      this._usuario = JSON.parse(registros.getLocal('sesion')!)
      this._contenido = registros.getLocal('recetas') ? JSON.parse(registros.getLocal('recetas')!) : this.sinRecetas();
      this._contenidoPagina = document.querySelector('#filasContenido')!;
      this.listarOpcionesAdmin();
      this.usuario();
    } else {
      this.inicioRequerido();
    }
  }

  fechas() {

    let hoy = new Date();
    let fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
    return fecha

  }

  hora() {
    var hoy = new Date();

    var hours = (hoy.getHours() + 24 - 2) % 24;
    var mid = 'am';
    if (hours == 0) {
      hours = hoy.getHours();
    } else if (hours > 12) {
      hours = hoy.getHours() % 12;
      mid = 'pm';
    }

    return `${hours}:${hoy.getMinutes()} ${mid}`
  }

  listarOpcionesAdmin() {
    let tabla: HTMLElement = document.querySelector('#contenidoVistaAdmin')!;

    if (this._usuario.rol == 'admin') {
      tabla.style.display = 'block'
    } else {
      tabla.style.display = 'none'
    }


  }

  listarButton() {
    recetas.recetas.map(e => {
      e.comentarios.map(elem => {
        let btn: HTMLButtonElement = document.querySelector('#contenidoVistaAdmin' + (elem.id.toString()))!;
        if (this._usuario.rol == 'admin') {
          btn.style.display = 'block'
        }
      });
    });
  }

  inicioRequerido() {
    Swal.fire({
      title: 'Oops!',
      text: "algo salio mal con la sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'iniciar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = ('./login.html');
      } else {
        this.inicioRequerido()
      }
    })
  }

  sinRecetas() {
    Swal.fire({
      title: 'Repanpanos aun no hay recetas',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Vamo!`,
      denyButtonText: `no k le paza`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Comencemos', 'waaaa el primero en registar una receta ojala sea un pan', 'success')
        location.href = ('./registrarReceta.html')
      } else if (result.isDenied) {
        Swal.fire('bueno se intento', 'mama mi time is com oooo awanta to breakfree', 'info')
      }
    })
  }

  usuario() {
    let nombre: HTMLElement = document.querySelector('#nombrePerfil')!;
    let recetas: HTMLElement = document.querySelector('#RecetasUser')!;
    let comentario: HTMLElement = document.querySelector('#comentariosUser')!;

    nombre.innerHTML = `Bienvenido, ${this._usuario.usuario}`;
    comentario.innerHTML = `Comentarios:${this._usuario.Comentarios.length}`;
    recetas.innerHTML = `Recetas: ${this._usuario.Recetas.length}`;
    
    let pag: HTMLElement = document.querySelector('#namepag')!;
    if (pag.textContent == 'pagina inicio') {
      this.listar();
    }
  }

  listar() {
    this._contenidoPagina.innerHTML = "";
    let idname = "btnGenerarPaginaReg";
    this._contenido.map(element => {
      this._contenidoPagina.innerHTML += `
            <div class="col-12  mt-4">
            <div class="card mb-3" style="width: 100%; height: 100%;">
              <div class="row g-0">
                <div class="col-md-4 ms-1 mt-2">
                  <img src="${element.urlImg}" alt="..." height="250px" width="270px">
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text"> dificultad: ${element.dificultad}</p>
                    <p class="card-text"> tiempo estimado: ${element.tiempo}</p>
                    <p class="card-text"> numero ingredientes: ${element.numIngredientes}</p>
                    <p class="card-text"><small class="text-muted">por: ${element.autor} </small></p>
                    <p class="card-text"><small class="text-muted">hace: ${element.horaSubida} </small></p>
                    <button class="btn btn-primary btn-sm" type="button" id="${idname + element.numero}" onclick="inicio.generarContnidoReceta(${element.numero})">ver mas</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
            `

    });


  }

  listarPagina(codigo: number) {
    let pagina: HTMLElement = document.querySelector('#RecetaPaginaContenido')!;
    let buscar = recetas.recetas.findIndex(value => value.numero == codigo);

    if (buscar != -1) {

      let ps = recetas.recetas[buscar]

      pagina.innerHTML = `
      <div class="row">
      <div class="col-lg-8">
        <!-- Post content-->
        <article>
          <!-- Post header-->
          <header class="mb-4">
            <!-- Post title-->
            <h1 class="fw-bolder mb-1">${ps.nombre} </h1>
            <!-- Post meta content-->
            <div class="text-muted fst-italic mb-2">subido ${ps.FechaSubida} a las ${ps.horaSubida}</div>
          </header>
          <!-- Preview image figure-->
          
          <section class="mb-5">
            <h2 class="fw-bolder mb-4 mt-5">Descripción</h2>
            <p class="fs-5 mb-4"> ${ps.descripcion} </p>
          </section>
          <!-- Post categories-->
          <figure class="mb-4"><img class="img-fluid rounded" src="${ps.urlImg}"
              alt="..." /></figure>
          <!-- Post content-->
          <section class="mb-5">
            <h2 class="fw-bolder mb-4 mt-5">Ingredientes</h2>
            <p class="fs-5 mb-4">${this.genIngredientes(ps.numero)}</p>
          </section>
        </article>
        <section class="mb-5">
          <h2 class="fw-bolder mb-4 mt-5">Preparacion</h2>
          <p class="fs-5 mb-4">${ps.elaboracion} </p>
        </section>
      </article>
        <!-- Comments section-->
        <section class="mb-5">
          <div class="card bg-light">
            <div class="card-body">
              <!-- Comment form-->
              <form class="mb-4"><textarea id="comentarioRecetas" class="form-control" rows="3"
                  placeholder="Dejar un comentario"></textarea>
                  <div class="d-grid  mt-2 gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary" type="button" onclick="inicio.sendMensaje(${this._usuario.id},${ps.numero})">Enviar <i class="fas fa-paper-plane"></i></button>
              </div>
              </form>

              <!-- Comment with nested comments-->
              <div class="row d-flex mb-4" id="comentariosRecetasSave"> </div>
              <!-- Single comment-->


            </div>
          </div>
        </section>


      </div>
      <!-- Side widgets-->
      <div class="col-lg-4">
        <!-- Categories widget-->
        <div class="card mb-4">
          <div class="card-header">Categories</div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <ul class="list-unstyled mb-0">
                  <li><a href="#!">Web Design</a></li>
                  <li><a href="#!">HTML</a></li>
                  <li><a href="#!">Freebies</a></li>
                </ul>
              </div>
              <div class="col-sm-6">
                <ul class="list-unstyled mb-0">
                  <li><a href="#!">JavaScript</a></li>
                  <li><a href="#!">CSS</a></li>
                  <li><a href="#!">Tutorials</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Side widget-->
        <div class="card mb-4">
          <div class="card-header">Por: ${ps.autor}</div>
          <div class="card-body">
          <p class="fs-5 mb-4"> Dificultad: ${ps.dificultad} </p>
          <p class="fs-5 mb-4"> Tiempo: ${ps.tiempo} </p>
          </div>
        </div>
      </div>
    </div>
      
      
      
      `



    } else {
      Swal.fire({
        title: `estamos teniendo problemas para obtener 
                la recetas... enviando todas las 
                nyan unidades diponibles para sulucionarlo`,
        width: 600,
        padding: '3em',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }
    let comm: HTMLElement = document.querySelector('#comentariosRecetasSave')!;
    comm.innerHTML = "";
    let namvar = "contenidoVistaAdmin"
    let pC = recetas.recetas[buscar].comentarios.map(elem => {
      comm.innerHTML += `              
      <div class="d-flex col-12">
      <button type="button" class="btn-close" aria-label="Close" style="display: none;" id="${namvar+elem.id}" onclick="inicio.eliminarMensaje(${elem.id},${buscar})"></button>
        <div class="flex-shrink-0"><img class="rounded-circle" src="${elem.url}" alt="..." /></div>
              <div class="ms-3">
                <div class="fw-bold">${elem.usuario}.</div> 
                <p> ${elem.comentario}</p>
                <p <small class="text-muted">enviado a las: ${elem.hora}  ${elem.fecha} </small></p>
              </div>
              
      </div>`
    });



  }

  genIngredientes(cod: number) {
    let pos = recetas.recetas.findIndex(element => element.numero == cod);
    let khe = "";
    let acom = 0;
    recetas.recetas[pos].ingredientes.map(element => {

      khe += ` ${acom}) ${element.cantidad} ${element.medida} de ${element.nombre} </br>`
      acom++
    })
    return khe

  }

  listarTiposEnIngredientes() {
    let list = document.querySelector('#inputGroupSelectIngrediente2')!;
    let num = 0;
    recetas.tipoIngrediente.map(element => {
      list.innerHTML += `<option value="${num}">${element.nombre}</option>`
      num++;
    })

  }

  listarIngredientesRegistro() {
    let list: HTMLTableElement = document.querySelector('#tableIngredientes > tbody')!;
    list.innerHTML = '';
    let num: number = 0;

    recetas.ingredientes.map(element => {

      list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre} </td>
      <td> ${element.tipo} </td>
      <td> ${element.medida} </td>
      <td> ${element.estado} </td>
      <td>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger" onclick="inicio.editarlistas(${element.cod},1)">Borrar</button>
      <button type="button" class="btn btn-warning"onclick="inicio.editarlistas(${element.cod},2)">Editar</button>
      </div> 
      </td>     
      </td>
      </tr>
  `
    });
  }

  eliminarIngrediente(cod: number) {
    let arrayIng = recetas.ingredientes
    let find = arrayIng.findIndex(element => element.cod == cod);

    arrayIng.splice(find, 1)

    localStorage.removeItem('ingredintes')
    registros.setLocal('ingredintes', JSON.stringify(arrayIng))
    this.listarIngredientesRegistro();
  }

  editarIngrediente(cod: number) {
    let arrayIng = recetas.ingredientes
    let index = arrayIng.findIndex(element => element.cod == cod);

    let nam: HTMLInputElement = document.querySelector('#nombreIngrediente')!;
    let url: HTMLInputElement = document.querySelector('#urlIngrediente')!;
    let selectmedida: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente')!;
    let selectTipo: HTMLSelectElement = document.querySelector('#inputGroupSelectIngrediente2')!;
    let descripcion: HTMLInputElement = document.querySelector('#DescripcionIngrediente')!;

    nam.value = arrayIng[index].nombre;
    url.value = arrayIng[index].urlimagen;
    selectmedida.value = arrayIng[index].medida;
    selectTipo.value = arrayIng[index].tipo;
    descripcion.value = arrayIng[index].descripcion;


    arrayIng.splice(index, 1);
    registros.setLocal('ingredintes', JSON.stringify(arrayIng));

  }

  listarTipoIngredientesRegistro() {
    let list: HTMLTableElement = document.querySelector('#tableTipoIngredientes > tbody')!;
    list.innerHTML = '';
    let num: number = 0;

    recetas.tipoIngrediente.map(element => {
      list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre} </td>
      <td>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger" onclick="inicio.editarlistas(${element.cod},3)">Borrar</button>
      <button type="button" class="btn btn-warning"onclick="inicio.editarlistas(${element.cod},4)">Editar</button>
      </div> 
      </td>     
      </td>
      </tr>
  `
    });
  }

  borrarTipoIngrediente(cod: number) {
    let arrayIng = recetas.tipoIngrediente
    let find = arrayIng.findIndex(element => element.cod == cod);

    arrayIng.splice(find, 1)

    localStorage.removeItem('tipoIngrediente')
    registros.setLocal('tipoIngrediente', JSON.stringify(arrayIng))
    this.listarTipoIngredientesRegistro();
  }

  editarTipoIngrediente(cod: number) {
    let arrayIng = recetas.tipoIngrediente
    let index = arrayIng.findIndex(element => element.cod == cod);

    let nam: HTMLInputElement = document.querySelector('#nombreTipoIngrediente')!;
    let url: HTMLInputElement = document.querySelector('#urlTipoIngrediente')!;

    nam.value = arrayIng[index].nombre;
    url.value = arrayIng[index].url;


    arrayIng.splice(index, 1);
    registros.setLocal('tipoIngrediente', JSON.stringify(arrayIng));
    this.listarTipoIngredientesRegistro()
  }

  generarContenidoListaUsuario() {
    let list: HTMLTableElement = document.querySelector('#tableUsers > tbody')!;
    list.innerHTML = '';
    let num: number = 0;
    registros.usuariosRegistrados.map(element => {
      if (element.id == 1001) {
        list.innerHTML += `                
        <tr>
        <th scope="row">${num++} </th>
        <td>${element.nombre + " " + element.apellid} </td>
        <td> ${element.usuario} </td>
        <td> ${element.Recetas.length} </td>
        <td><div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger" onclick="inicio.kkk()">borrar</button>
        <button type="button" class="btn btn-warning" onclick="inicio.kkk()">editar</button>
        </div>
        </td>
        </tr>
    `
      } else {
        list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre + " " + element.apellid} </td>
      <td> ${element.usuario} </td>
      <td> ${element.Recetas.length}</td>
      <td><div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger" onclick="inicio.eliminarUsuarioIndex(${element.id})">borrar</button>
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="inicio.editarUsuarioIndex(${element.id})">editar</button>
      </div>
      </td>
      </tr>
  `
      }
    })
  }

  borrarUsuario(user: number) {
    let arrayuser = registros.usuariosRegistrados
    let index = arrayuser.findIndex(e => e.id == user);

    arrayuser.splice(index, 1);

    localStorage.removeItem('UsuariosRegitrados')
    registros.setLocal('UsuariosRegitrados', JSON.stringify(arrayuser))
    this.generarContenidoListaUsuario();
  }

  editarUsuario(cod: number) {
    let find = registros.usuariosRegistrados.findIndex(element => element.id == cod);
    let editUser: Iusuario = registros.usuariosRegistrados[find];
    let uENam: HTMLInputElement = document.querySelector('#uENam')!;
    let userId: HTMLElement = document.querySelector('#elementtitle')!;
    let uEApell: HTMLInputElement = document.querySelector('#uEApell')!;
    let uEUsuario: HTMLInputElement = document.querySelector('#uEUsuario')!;
    let uEPass: HTMLInputElement = document.querySelector('#uEPass')!;
    let uEEmail: HTMLInputElement = document.querySelector('#uEEmail')!;
    let uECedula: HTMLInputElement = document.querySelector('#uECedula')!;
    userId.innerHTML = `usuario: ${editUser.id}`;
    uENam.value = editUser.nombre
    uEApell.value = editUser.apellid
    uEUsuario.value = editUser.cedula
    uEPass.value = editUser.password
    uEEmail.value = editUser.email
    uECedula.value = editUser.cedula
  }

  editarUsuario2() {
    let userId: HTMLElement = document.querySelector('#elementtitle')!;
    let niy = userId.textContent?.replace('usuario: ', "")
    let find = registros.usuariosRegistrados.findIndex(element => element.id == parseInt(niy!));

    let editUser = registros.usuariosRegistrados[find];

    let uENam: HTMLInputElement = document.querySelector('#uENam')!;
    let uEApell: HTMLInputElement = document.querySelector('#uEApell')!;
    let uEUsuario: HTMLInputElement = document.querySelector('#uEUsuario')!;
    let uEPass: HTMLInputElement = document.querySelector('#uEPass')!;
    let uEEmail: HTMLInputElement = document.querySelector('#uEEmail')!;
    let uECedula: HTMLInputElement = document.querySelector('#uECedula')!;

    let user: Iusuario = {
      id: editUser.id,
      rol: 'usuario',
      nombre: uENam.value,
      apellid: uEApell.value,
      usuario: uEUsuario.value,
      img: "",
      password: uEPass.value,
      email: uEEmail.value,
      cedula: uECedula.value,
      Comentarios: editUser.Comentarios,
      Recetas: editUser.Recetas,
    }
    let arrayuser = registros.usuariosRegistrados
    arrayuser[find] = user;




    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario editado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.removeItem('UsuariosRegitrados')
    registros.setLocal('UsuariosRegitrados', JSON.stringify(arrayuser))
    this.generarContenidoListaUsuario();

  }

  generarContenidoListaRecetas() {
    let list: HTMLTableElement = document.querySelector('#tableRecetas > tbody')!;
    list.innerHTML = '';
    let num: number = 0;
    recetas.recetas.map(element => {
      list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre} </td>
      <td> ${element.autor} </td>
      <td> ${element.comentarios.length} </td>
      <td>En lista</td>
      
      <td> <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger" onclick="inicio.selecOption(${element.numero},1)">borrar</button>
      <button type="button" class="btn btn-warning"onclick="inicio.selecOption(${element.numero},2)">ocultar</button>
      <button type="button" class="btn btn-info"onclick="inicio.selecOption(${element.numero},4)">editar</button>
    </div> </td>
    </tr>
  `
    });

    if (recetas.recetasOcultas[0]) {
      recetas.recetasOcultas.map(element => {

        list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre} </td>
      <td> ${element.autor} </td>
      <td> ${element.comentarios.length} </td>
      <td>oculta</td>
      
      <td> <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger" onclick="inicio.selecOption(${element.numero},1)">borrar</button>
      <button type="button" class="btn btn-success"onclick="inicio.selecOption(${element.numero},3)">mostrar</button>
      <button type="button" class="btn btn-info"onclick="inicio.selecOption(${element.numero},4)">editar</button>
    </div> </td>
    </tr>
  `
      });
    }






  }







  editarReceta(cod: number) {




  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  borrarReceta(numero: number) {

    Swal.fire({
      title: 'Seguro que desea borar?',
      text: "Al borrar esto se eliminara para siempre mucho mucho tiempo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        let arrayReceta = recetas.recetas
        let index = arrayReceta.findIndex(e => e.numero == numero);

        arrayReceta.splice(index, 1);
        registros.setLocal('recetas', JSON.stringify(arrayReceta));
        this.generarContenidoListaRecetas();
      }
    })
  }

  ocultarReceta(numero: number) {
    let arrayRecetaoculta = recetas.recetasOcultas
    let arrayReceta = recetas.recetas

    let index = arrayReceta.findIndex(e => e.numero == numero);
    arrayRecetaoculta.push(arrayReceta[index])
    arrayReceta.splice(index, 1);

    localStorage.removeItem('recetas');
    localStorage.removeItem('recetasOcultas');

    registros.setLocal('recetas', JSON.stringify(arrayReceta));
    registros.setLocal('recetasOcultas', JSON.stringify(arrayRecetaoculta))
    this.generarContenidoListaRecetas()

  }

  mostartReceta(numero: number) {
    let arrayRecetaoculta = recetas.recetasOcultas
    let arrayReceta = recetas.recetas

    let index = arrayRecetaoculta.findIndex(e => e.numero == numero);

    arrayReceta.push(arrayRecetaoculta[index])
    arrayRecetaoculta.splice(index, 1);

    localStorage.removeItem('recetas');
    localStorage.removeItem('recetasOcultas');

    registros.setLocal('recetas', JSON.stringify(arrayReceta));
    registros.setLocal('recetasOcultas', JSON.stringify(arrayRecetaoculta))
    this.generarContenidoListaRecetas();
  }

  generarContenidoListaRecetasUsuario() {
    let list: HTMLTableElement = document.querySelector('#tableRecetasUsuario > tbody')!;
    list.innerHTML = '';
    let num: number = 0;
    this._usuario.Recetas.map(element => {

      list.innerHTML += `                
      <tr>
      <th scope="row">${num++} </th>
      <td>${element.nombre} </td>
      <td> ${element.comentarios.length} </td>
      <td> <button type="button" class="btn btn-danger" onclick="inicio.editarlistas(${element.numero},5)">Borrar</button> </td>
      </tr>
  `
    });
  }

  borrarRecetaUsuario(numero: number) {
    Swal.fire({
      title: 'Seguro que desea borar?',
      text: "Al borrar esto se eliminara para siempre mucho mucho tiempo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        let arrayReceta = recetas.recetas
        let index = arrayReceta.findIndex(e => e.numero == numero);
        let indexuser = this._usuario.Recetas.findIndex(element => element.numero == numero)

        arrayReceta.splice(index, 1);
        this._usuario.Recetas.splice(indexuser, 1)

        registros.setLocal('sesion', JSON.stringify(this._usuario));
        registros.setLocal('recetas', JSON.stringify(arrayReceta));
        this.generarContenidoListaRecetasUsuario();
      }
    })
  }

  listarIngredientesRegistroRecetas() {
    let table: HTMLTableElement = document.querySelector('#tableRegistrosRecetas > tbody')!;
    let num = 0
    let aux = "";
    let nomvar = "numing"
    table.innerHTML = '';
    recetas.ingredientes.map(element => {


      recetas.IngredienteReceta.map(elem => {
        if (elem.cod == element.cod) {
          table.innerHTML += `<tr>
          <th scope="row">${num++} </th>
          <td>${elem.nombre} </td>
          <td> ${elem.tipo} </td>
          <td><div><input type="number" id="${nomvar + elem.cod}" min="1" placeholder="${elem.cantidad}"></div> ${elem.medida} </td>
          <td>usando</td>
          <td>
          <button type="button" class="btn btn-warning" onclick="inicio.listRecetasCompl(${elem.cod},2)">quitar</button>
          </td>
          </tr>
          `
        }
      });

      if (this.buscarSimilitud(element.cod)) {
        table.innerHTML += `<tr>
          <th scope="row">${num++} </th>
          <td>${element.nombre} </td>
          <td> ${element.tipo} </td>
          <td><div><input type="number" id="${nomvar + element.cod}" min="1" placeholder="0"> </div> ${element.medida} </td>
          <td>sin usar</td>
          <td>
          <button type="button" class="btn btn-success" onclick="inicio.listRecetasCompl(${element.cod},1)">agregar</button>
          </td>
          </tr>
          `
      }

    });
  }

  buscarSimilitud(cod: number) {
    let find = recetas.IngredienteReceta.findIndex(element => element.cod == cod)

    if (find != -1) {
      return false
    } else {
      return true
    }


  }

  cerrarSesion() {
    localStorage.removeItem('sesion')
    location.href = ('./login.html')
  }
  
}



