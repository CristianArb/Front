/**
 * funcionMensaje
 * Este script contiene las funciones para la tabla MENSAJES.
 * Sus funciones se implementan tanto en el index.html como en
 * creacionCategoria.html usando jQuery.
 * Para las peticiones http se utiliza ajax.
 * 
 * @since 2021-10-27
 * @version 1.0
 * @author Cristian Peña, Camilo Muñoz & Andres Bonilla
 */

/**
 * La url base para los servicios de la tabla Mensaje
 */
var serviceM = "http://localhost:8080/api/Message/";

/**
 * Función trae todos los registros de los mensajes con petición GET
 */
function traerInformacionMensajes() {
    $.ajax({
        url: serviceM + "all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar mensajes.");
        }
    });
}

/**
 * Función que dibuja la tabla completa de registros de los mensajes
 * @param {JSON con todos los registros de los mensajes} respuesta 
 */
function pintarRespuestaMensajes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Messagetext</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaMensaje").html(myTable);
}

/**
 * Función para guardar un mensaje
 */
function guardarInformacionMensajes() {
    let info = {
        messageText: $("#messageText").val()
        
    };

    $.ajax({
        url: serviceM + "save",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(info),


        success: function (response) {
            window.location.reload();
            console.log(response);
            console.log("El mensaje se guardo correctamente");
            alert("El mensaje se guardo correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            console.log(errorThrown);
            alert("El mensaje no se guardo correctamente");


        }
    });

}