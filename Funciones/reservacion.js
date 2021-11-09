/**
 * funcionReservacion
 * Este script contiene las funciones para la tabla RESERVACIONES.
 * Sus funciones se implementan tanto en el index.html como en
 * creacionCategoria.html usando jQuery.
 * Para las peticiones http se utiliza ajax.
 * 
 * @since 2021-10-27
 * @version 1.0
 * @author Cristian Peña, Camilo Muñoz & Andres Bonilla
 */

/**
 * La url base para los servicios de la tabla Reservaciones
 */
var serviceR = service + "/api/Reservation/";

/**
 * traerInformacionReservaciones()
 * Función trae todos los registros de las cuatrimotos con petición GET
 */
function traerInformacionReservaciones() {
    $.ajax({
        url: serviceR + "all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        },

        error: function(xhr, status) {
            alert("Ha sucedido un problema al consultar las reservas.");
        }

    });
}

/**
 * pintarRespuestaReservaciones(respuesta)
 * Función que dibuja la tabla completa de registros de las reservaciones
 * @param {JSON con todos los registros de las reservaciones} respuesta 
 */
function pintarRespuestaReservaciones(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Id</th> <th>Startdate</th> <th>Devolutiondate</th> <th>Client</th> <th>Quadbike</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idReservation + "</td>";
        myTable += "<td>" + arreglarFecha(respuesta[i].startDate) + "</td>";
        myTable += "<td>" + arreglarFecha(respuesta[i].devolutionDate) + "</td>";
        myTable += "<td>" + validarNameJSON(respuesta[i].client) + "</td>";
        myTable += "<td>" + validarNameJSON(respuesta[i].quadbike) + "</td>";
        myTable += "<td>" + '<button onclick="borrarReservacion(' + respuesta[i].idReservation + ')">Borrar</button>' + "</td>";
        myTable += "<td>" + '<button onclick="detalleReservacion(this)">Detalle</button>' + "</td>";

        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaReservacion").html(myTable);
}

/**
 * arreglarFecha(fecha)
 * Función que toma la fecha y la devuelve un string con la fecha en
 * formato yyyy/MM/dd
 * @param {Fecha a modificar} fecha 
 * @returns Fecha con formato yyyy/MM/dd
 */
function arreglarFecha(fecha) {
    let yyyy = fecha.substring(0, 4);
    let MM = fecha.substring(5, 7);
    let dd = fecha.substring(8, 10);
    return fechaNueva = yyyy + '/' + MM + '/' + dd;
}


/**
 * guardarInformacionReservaciones()
 * Función para guardar un JSON en el Backend con la información de la
 * reservación con una peticion POST
 */
function guardarInformacionReservaciones() {

    console.log($("#startDate").val());


    let info = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: { idClient: $("#select-client-R").val() },
        quadbike: { id: $("#select-quadbike-R").val() }
    };

    if (($("#startDate").val() == "" ||
            $("#devolutionDate").val() == "") ||
        ($("#startDate").val() > $("#devolutionDate").val())) {

        alert("Inserte las fechas corectamente.");

    } else {

        $.ajax({
            url: serviceR + "save",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(info),




            success: function(response) {

                console.log(response);
                alert("La reservacion se guardó correctamente.");
                window.location.reload()

            },

            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("Ha sucedido un problema al guardar la reserva llene todos los campos.");
            }
        });
    }
}

/**
 * detalleCuatrimoto(nodo)
 * Función que hace uso de un nodo para modificar los datos de tablaCuatrimoto
 * @param {Nodo con la fila de la tablaCuatrimoto} nodo 
 */
function detalleReservacion(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="date" name="fechaInicio" id="fechaIActulizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="date" name="fechaFinal" id="fechaFActulizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td>' + nodosEnTr[3].textContent + '</td>' +
        '<td>' + nodosEnTr[4].textContent + '</td>' +
        '<td><button onclick="borrarReservacion(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosReservacion(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosReservacion(codigo)
 * Función para actualizar la información de la reservación con un JSON en
 * el Backend mediante una peticion POST.
 * @param {id de la cuatrimoto a actualizar} codigo 
 */
function actualizarDatosReservacion(codigo) {

    let info = {
        idReservation: codigo,
        startDate: $("#fechaIActulizado").val(),
        devolutionDate: $("#fechaFActulizado").val(),

    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: serviceR + "update",
        type: "PUT",
        contentType: 'application/json',

        success: function(response) {

            traerInformacionReservaciones();
            alert("La reserva se actualizó correctamente.");

        },
        error: function(errorThrown) {

            traerInformacionReservaciones();
            alert("Ha sucedido un problem al actualizar la reserva.");


        }
    });
}


/**
 * borrarReservacion(codigo)
 * Función para borrar la información de la reservación con un JSON el
 * Backend mediante una peticion DELETE.
 * @param {id de la cuatrimoto a borrar} codigo 
 */
function borrarReservacion(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceR + codigo,
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function() {

            traerInformacionReservaciones();
            alert("La reserva se borró correctamente.")

        },

        error: function(errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar la reserva.");

        }
    });

}

/**
 * autoInicioCliente()
 * Función que le inyecta a la lista desplegable clientes los datos de los
 * clientes en el formulario de Reservacion
 */
function autoInicioCliente() {

    $.ajax({
        url: service + "/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            let $select = $("#select-client-R");
            $.each(respuesta, function(idClient, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
            });
        }

    })

}

/**
 * autoInicioCuatrimoto()
 * Función que le inyecta a la lista desplegable cuatrimotos los datos
 * de las cuatrimotos en el formulario de Reservacion
 */
function autoInicioCuatrimoto() {

    $.ajax({
        url: service + "/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            let $select = $("#select-quadbike-R");
            $.each(respuesta, function(id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
            });
        }

    })

}

/**
 * validarNameJSON()
 * Función que valida el atributo name del JSON cuando es nula.
 * @param {JSON con todos los registros de la una tabla relacionada con 
 * la tabla actual} JSON 
 * @returns devuelve el atributo name del JSON cuando no es null.
 */
function validarNameJSON(JSON) {

    if (JSON == null) {

        return JSON;

    } else {

        return JSON.name;

    }
}