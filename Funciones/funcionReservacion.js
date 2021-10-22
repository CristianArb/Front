
/**
 * La url base para los servicios de la tabla Quadbike
 */
var serviceR = "http://129.151.110.94:8080/api/Reservation/"

/**
 * Función trae todos los registros de las cuatrimotos con petición GET
 */
function traerInformacionReservaciones() {
    $.ajax({
        url: serviceR + "all",
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

function guardarInformacionReservaciones() {

    let info = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
    };

    $.ajax({
        url: serviceR + "save",
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