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
 * traerInformacionMensajes()
 * Función que trae todos los registros de los mensajes con petición GET
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
 * pintarRespuestaMensajes(respuesta)
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
        myTable += "<td>" + validarNombres(respuesta[i].client) + "</td>";
        myTable += "<td>" + validarNombres(respuesta[i].quadbike) + "</td>";
        myTable += "<td>" + '<button onclick="borrarMensaje(' + respuesta[i].idMessage + ')">Borrar</button>' + "</td>";
        myTable += "<td>" + '<button onclick="detalleMensaje(this)">Detalle</button>' + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaMensaje").html(myTable);
}

/**
 * guardarInformacionMensajes()
 * Función para guardar un mensaje
 */
function guardarInformacionMensajes() {

    if ($("#select-client").val() == "" || $("#select-quadbike").val() == "" ||
        $("#messageText").val() == "") {

        alert("Seleccione una cuatrimoto, un cliente y escriba un mensaje");

    } else {

        let info = {
            messageText: $("#messageText").val(),
            client: { idClient: $("#select-client").val() },
            quadbike: { id: $("#select-quadbike").val() }
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

/**
 * detalleMensaje(nodo)
 * Función que hace uso de un nodo para modificar los datos de tabla Mensaje
 * @param {Nodo con la fila de la tabla Mensaje} nodo 
 */
function detalleMensaje(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="menssageText" id="textoActulizado" value="' + nodosEnTr[1].textContent + '" style="width: 200px"></td>' +
        '<td>' + nodosEnTr[2].textContent + '</td>' +
        '<td>' + nodosEnTr[3].textContent + '</td>' +
        '<td><button onclick="borrarMensaje(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosMensaje(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosMensaje(codigo)
 * Función para actualizar la información del mensaje con un JSON en
 * el Backend mediante una peticion POST.
 * @param {id del mensaje a actualizar} codigo 
 */
function actualizarDatosMensaje(codigo) {

    if ($("#textoActulizado").val() == "") {

        alert("Debe colocar un mensaje");

    } else {
        let info = {
            idMessage: codigo,
            messageText: $("#textoActulizado").val(),

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
}

/**
 * borrarMensaje(codigo)
 * Función para borrar la información del mensaje con un JSON el
 * Backend mediante una peticion DELETE.
 * @param {id del mensaje a borrar} codigo 
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
function autoInicioCliente() {

    $.ajax({
        url: service + "/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-client");
            $.each(respuesta, function (idClient, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
            });
        }

    })

}

/**
 * autoInicioCuatrimoto()
 * Función que le inyecta a la lista desplegable cuatrimotos los datos
 * de las cuatrimotos en el formulario de Mensaje
 */
function autoInicioCuatrimoto() {

    $.ajax({
        url: service + "/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-quadbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
            });
        }

    })
}


/**
 * validarNameJSON()
 * Función que valida el atributo name del JSON cuando es nula.
 * @param {JSON con el registro de una tabla relacionada con la tabla
 * actual} JSON
 * @returns Devuelve el atributo name del JSON cuando no es null.
 */
function validarNombres(JSON) {

    if (JSON == null) {

        return "Sin nombre";

    }

    else {

        return JSON.name;

    }
}
