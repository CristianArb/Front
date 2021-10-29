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
    myTable += "<tr> <th>Messagetext</th> <th>Client</th> <th>Quadbike</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].quadbike.name + "</td>";
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
        messageText: $("#messageText").val(),
        client: {idClient: $("#select-client").val()},
        quadbike : {id: $("#select-quadbike").val()}          
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

/**
 * autoInicioCliente()
 * Función que le inyecta a la lista desplegable clientes los datos de los
 * clientes en el formulario de Mensaje
 */
 function autoInicioCliente(){
    
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    
    })

}

/**
 * autoInicioCuatrimoto()
 * Función que le inyecta a la lista desplegable cuatrimotos los datos
 * de las cuatrimotos en el formulario de Mensaje
 */
function autoInicioCuatrimoto(){
    
    $.ajax({
        url: "http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-quadbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}