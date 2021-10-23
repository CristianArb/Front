
/**
 * La url base para los servicios de la tabla Reservaciones
 */
var service = "http://localhost:8080/api/"

/**
 * Función trae todos los registros de las reservaciones con petición GET
 */
function traerInformacionReservaciones() {
    $.ajax({
        url: service + "Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservaciones(respuesta);
        },

        error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar clientes.");
        }

    });
}

/**
 * Función que dibuja la tabla completa de registros de las reservaciones
 * @param {JSON con todos los registros de las reservaciones} respuesta 
 */
function pintarRespuestaReservaciones(respuesta) {
    
    let myTable = "<table>";
    myTable += "<tr> <th>Startdate</th> <th>Devolutiondate</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaReservacion").html(myTable);
}

/**
 * Función para guardar una categoria con peticion POST
 */
function guardarInformacionReservaciones() {

    let info = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
    };

    $.ajax({
        url: service + "Reservation/save",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(info),




        success: function (response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });

}