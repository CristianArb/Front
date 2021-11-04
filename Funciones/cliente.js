/**
 * funcionCliente
 * Este script contiene las funciones para la tabla CLIENTES.
 * Sus funciones se implementan tanto en el index.html como en
 * creacionCliente.html usando jQuery.
 * Para las peticiones http se utiliza ajax.
 * 
 * @since 2021-10-27
 * @version 1.0
 * @author Cristian Peña, Camilo Muñoz & Andres Bonilla
 */

/**
 * La url base para los servicios de la tabla Cliente
 */
var serviceCL = service + "/api/Client/";

/**
 * traerInformacionClientes()
 * Función trae todos los registros de los clientes con petición GET
 */
function traerInformacionClientes() {
    $.ajax({
        url: serviceCL + "all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar los clientes.");
        }
    });
}

/**
 * pintarRespuestaClientes(respuesta)
 * Función que dibuja la tabla completa de registros de los clientes
 * @param {JSON con todos los registros de los clientes} respuesta 
 */
function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Id</th> <th>Email</th> <th>Password</th> <th>Name</th> <th>Age</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idClient + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td>" + '<button onclick="borrarClientes(' + respuesta[i].idClient + ')">Borrar</button>' + "</td>";
        myTable += "<td>" + '<button onclick="detalleClientes(this)">Detalle</button>' + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaCliente").html(myTable);
}

/**
 * guardarInformacionClientes()
 * Función para guardar un cliente
 */
function guardarInformacionClientes() {
    let info = {
        name: $("#nameCL").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        age: $("#age").val(),
    };

    $.ajax({
        url: serviceCL + "save",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(info),


        success: function (response) {
            window.location.reload();
            console.log(response);
            console.log("El cliente se guardó correctamente");
            alert("El cliente se guardo correctamente.");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            console.log(errorThrown);
            alert("Ha sucedido un problema al guardar el cliente.");


        }
    });

}

/**
 *  detalleClientes(nodo)
 * Función que hace uso de un nodo para modificar los datos de tabla
 * cliente
 * @param {Nodo con la fila de la tabla cliente} nodo 
 */
 function detalleClientes(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="email" id="emailActualizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="text" name="password" id="passwordActualizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td><input type="text" name="nameCL" id="nameCLActualizado" value="' + nodosEnTr[3].textContent + '" size="1" </td>' +
        '<td><input type="number" name="age" id="ageActualizado" value="' + nodosEnTr[4].textContent + '" size="1" </td>' +
        '<td><button onclick="borrarCliente(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick=" actualizarDatosCliente(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosCliente(codigo)
 * Función para actualizar la información del cliente con un JSON en el
 * Backend mediante una peticion POST.
 * @param {id del cliente a actualizar} codigo 
 */
function actualizarDatosCliente(codigo) {

    let info = {
        idClient: codigo,
        email: $("#emailActualizado").val(),
        password: $("#passwordActualizado").val(),
        name: $("#nameCLActualizado").val(),
        age: $("#ageActualizado").val()
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: serviceCL + "update",
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionClientes();
            alert("El cliente se actualizó correctamente.");

        },
        error: function (errorThrown) {

            traerInformacionClientes();
            alert("El cliente no se actualizó correctamente.");


        }
    });
}


/**
 * borrarClientes(codigo)
 * Función para borrar la información del cliente con un JSON el Backend
 * mediante una peticion DELETE.
 * @param {id del cliente a borrar} codigo 
 */
function borrarClientes(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceCL + codigo,
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {

            traerInformacionCuatrimotos();
            alert("El cliente se borró correctamente.")

        },

        error: function (errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar el cliente, verifique que"
            + "no tenga información almacenada de las reservas y los mensajes."
            );

        }
    });

}

