/**
 * funcionCategoria
 * Este script contiene las funciones para la tabla CATEGORIAS.
 * Sus funciones se implementan tanto en el index.html como en
 * creacionCategoria.html usando jQuery.
 * Para las peticiones http se utiliza ajax.
 * 
 * @since 2021-10-27
 * @version 1.0
 * @author Cristian Peña, Camilo Muñoz & Andres Bonilla
 */

/**
 * La url base para los servicios de la tabla Categoria
 */
 var serviceCT = service + "/api/Category/";

 /**
  * Función trae todos los registros de las categorias con petición GET
  */
 function traerInformacionCategorias() {
     $.ajax({
         url: serviceCT + "all",
         type: "GET",
         datatype: "JSON",
         success: function (respuesta) {
             console.log(respuesta);
             pintarRespuestaCategorias(respuesta);
         },
         error: function (xhr, status) {
             alert("Ha sucedido un problema al consultar las categorias.");
         }
     });
 }
 
 /**
  * Función que dibuja la tabla completa de registros de los mensajes
  * @param {JSON con todos los registros de las categorias} respuesta 
  */
 function pintarRespuestaCategorias(respuesta) {
 
     let myTable = "<table>";
     myTable += "<tr> <th>Id</th> <th>Name</th> <th>Description</th> </tr>";
     for (i = 0; i < respuesta.length; i++) {
         myTable += "<tr>";
         myTable += "<td>" + respuesta[i].id + "</td>";
         myTable += "<td>" + respuesta[i].name + "</td>";
         myTable += "<td>" + respuesta[i].description + "</td>";
         myTable += "<td>" + '<button onclick="borrarCategorias(' + respuesta[i].id+ ')">borrar</button>' + "</td>";
         myTable += "<td>" + '<button onclick="detalleCategoria(this)">Detalle</button>' + "</td>";
 

         myTable += "</tr>";
     }
     myTable += "</table>";
     $("#tablaCategoria").html(myTable);
 }
 
 /**
  * guardarInformacionCategorias()
  * Función para guardar una categoria
  */
 function guardarInformacionCategorias() {
     
     let info = {
         name: $("#nameCT").val(),
         description: $("#descriptionCT").val()
     };
 
     $.ajax({
         url: serviceCT + "save",
         type: 'POST',
         contentType: "application/json; charset=utf-8",
         dataType: 'JSON',
         data: JSON.stringify(info),
 
 
         success: function (response) {
             window.location.reload();
             console.log(response);
             alert("La categoria se guardó correctamente.");
 
         },
 
         error: function (jqXHR, textStatus, errorThrown) {
             window.location.reload();
             console.log(errorThrown);
             alert("Ha sucedido un problema al guarda la categoria.");
 
 
         }
     });
 
 }

/**
 * detalleCuatrimoto(nodo)
 * Función que hace uso de un nodo para modificar los datos de tablaCuatrimoto
 * @param {Nodo con la fila de la tablaCuatrimoto} nodo 
 */
function detalleCategoria(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="nameCT" id="nombreCTActulizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="text" name="descriptionCT" id="descripcionCTActulizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td><button onclick="borrarCategorias(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosCategorias(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosCategorias(codigo)
 * Función para actualizar la información de la categoria con un JSON en
 * el Backend mediante una peticion POST.
 * @param {id de la categoria a actualizar} codigo 
 */
function actualizarDatosCategorias(codigo) {

    let info = {
        id: codigo,
        name: $("#nombreCTActulizado").val(),
        description: $("#descripcionCTActulizado").val()
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: serviceCT + "update",
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionCategorias();
            alert("La categoria se actualizó correctamente.");

        },
        error: function (errorThrown) {

            traerInformacionCategorias();
            alert("Ha sucedido un problema al actualizar la categoria.");


        }
    });
}

/**
 * borrarCategorias(codigo)
 * Función para borrar la información de la categoria con un JSON el
 * Backend mediante una peticion DELETE.
 * @param {id de la categoria a borrar} codigo 
 */
function borrarCategorias(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceCT + codigo,
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {

            traerInformacionCuatrimotos();
            alert("La categoria se borró correctamente.")

        },

        error: function (errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar la categoria, verifique"
            + "que no tenga información almacenada de las cuatrimotos.");

        }
    });

}

