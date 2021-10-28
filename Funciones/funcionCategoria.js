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
 var serviceCT = "http://localhost:8080/api/Category/";

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
             alert("Ha sucedido un problema al consultar categorias.");
         }
     });
 }
 
 /**
  * Función que dibuja la tabla completa de registros de los mensajes
  * @param {JSON con todos los registros de las categorias} respuesta 
  */
 function pintarRespuestaCategorias(respuesta) {
 
     let myTable = "<table>";
     myTable += "<tr> <th>Name</th> <th>Description</th> </tr>";
     for (i = 0; i < respuesta.length; i++) {
         myTable += "<tr>";
         myTable += "<td>" + respuesta[i].name + "</td>";
         myTable += "<td>" + respuesta[i].description + "</td>";
         myTable += "</tr>";
     }
     myTable += "</table>";
     $("#tablaCategoria").html(myTable);
 }
 
 /**
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
             console.log("La categoria se guardo correctamente");
             alert("La categoria se guardo correctamente");
 
         },
 
         error: function (jqXHR, textStatus, errorThrown) {
             window.location.reload();
             console.log(errorThrown);
             alert("La categoria no se guardo correctamente");
 
 
         }
     });
 
 }