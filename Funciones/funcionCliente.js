// Este script contiene las funciones para la tabla CLIENTES

/**
 * La url base para los servicios de la tabla Cliente
 */
var serviceCL = "http://129.151.110.94:8080/api/Client/"

/**
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
            alert("Ha sucedido un problema al consultar clientes.");
        }
    });
}

/**
 * Función que dibuja la tabla completa de registros de los clientes
 * @param {JSON con todos los registros de los clientes} respuesta 
 */
function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Email</th> <th>Password</th> <th>Name</th> <th>Age</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaCliente").html(myTable);
}

/**
 * Función para guardar un cliente
 */
function guardarInformacionClientes() {
    let info = {
        name: $("#name").val(),
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
            console.log("El cliente se guardo correctamente");
            alert("El cliente se guardo correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            console.log(errorThrown);
            alert("El cliente no se guardo correctamente");


        }
    });

}
