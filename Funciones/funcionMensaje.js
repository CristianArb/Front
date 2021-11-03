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
var serviceM = service + "/api/Message/";

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
    myTable += "<tr> <th>Id</th> <th>Messagetext</th> <th>Client</th> <th>Quadbike</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idMessage + "</td>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].quadbike.name + "</td>";
        myTable += "<td>" + '<button onclick="borrarMensaje(' + respuesta[i].idMessage + ')">Borrar</button>' + "</td>";
        myTable += "<td>" + '<button onclick="detalleMensaje(this)">Detalle</button>' + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaMensaje").html(myTable);
}

/**
 * Función para guardar un mensaje
 */
function guardarInformacionMensajes() {
    if ($("#select-client").val() == null  && 
    $("#select-quadbike").val() == null  ){

        alert("Seleccione una cuatrimoto y un cliente");

        }

        else{

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
                alert("El mensaje se guardó correctamente.");

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
                console.log(errorThrown);
                alert("Ha sucedido un problema al guardar el mensaje.");


            }  
        });
    }

}

// ******************************** Para el reto 4 ********************************

/**
 * detalleCuatrimoto(nodo)
 * Función que hace uso de un nodo para modificar los datos de tablaCuatrimoto
 * @param {Nodo con la fila de la tablaCuatrimoto} nodo 
 */
 function detalleMensaje(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="menssageText" id="nombreActulizado" value="' + nodosEnTr[0].textContent + '" size="1" </td>' +
        '<td><button onclick="borrarMensaje(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosMensaje(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosCuatrimotos(codigo)
 * Función para actualizar la información de la cuatrimoto con un JSON en el Backend mediante una peticion POST.
 * @param {id de la cuatrimoto a actualizar} codigo 
 */
function actualizarDatosMensaje(codigo) {

    let info = {
        id: codigo,
        messageText: $("#nombreActulizado").val(),
        
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: serviceM + "update",
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionMensajes();
            alert("El mensaje se actualizó correctamente.");

        },
        error: function (errorThrown) {

            traerInformacionMensajes();
            alert("Ha sucedido un problema al actualiza el mensaje.");


        }
    });
}


/**
 * borrarCuatrimoto(codigo)
 * Función para borrar la información de la cuatrimoto con un JSON el Backend mediante una peticion DELETE.
 * @param {id de la cuatrimoto a borrar} codigo 
 */
function borrarMensaje(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceM + codigo,
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {

            traerInformacionCuatrimotos();
            alert("El mensaje se borró correctamente.")

        },

        error: function (errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar el mensaje.");

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
        url: service + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
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
        url: service + "/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select = $("#select-quadbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            }); 
        }
    
    })
}
