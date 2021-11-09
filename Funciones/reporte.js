/**
 * reporteStatuts()  
 * Función que trae todos los registros de cantidad de reservas completadas y 
 * canceladas
 * con petición GET
 */
function reporteStatus() {
    
    $.ajax({
        url: service + "/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);
        },error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar las reservas.");
        }
    });
}

/**
 * pintarRespuestaStatus(respuesta)
 * Función que dibuja la tabla completa de registros de status de las reservas 
 * completadas y canceladas
 * @param {JSON con todos los registros de status de las reservas} respuesta 
 */
function pintarRespuestaStatus(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Completadas</th> <th>Canceladas</th> </tr>";
    myTable += "<tr> <td>" + respuesta.completed + "</td>";
    myTable += "<td>" + respuesta.cancelled + "</td> </tr>";
    myTable += "</table>";
    $("#resultadoStatus").html(myTable);
}

/**
 * reporteFecha()  
 * Función que trae todos los registros de las reservas hechas
 * en un periodo de tiempo con petición GET
 */
function reporteFecha() {


    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;

    console.log(fechaInicio);

    if ((fechaInicio == "" || fechaCierre == "") ||
        (fechaInicio >= fechaCierre)) {

        alert("Inserte las fechas corectamente.");

    } else {

        $.ajax({
            url: service + "/api/Reservation/report-dates/" + fechaInicio + "/" + fechaCierre,
            type: "GET",
            datatype: "JSON",
            success: function(respuesta) {
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
}

/**
 * pintarRespuestaDate(respuesta)
 * Función que dibuja la tabla completa de registros de las reservas hechas
 * en un periodo de tiempo
 * @param {JSON con todos los registros de las reservas hechas en un periodo 
 * de tiempo} respuesta 
 */
function pintarRespuestaDate(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Id</th> <th>Startdate</th> <th>Devolutiondate</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idReservation + "</td>";
        myTable += "<td>" + arreglarFechaR(respuesta[i].startDate) + "</td>";
        myTable += "<td>" + arreglarFechaR(respuesta[i].devolutionDate) + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoDate").html(myTable);
}

/**
 * arreglarFecha(fecha)
 * Función que toma la fecha y la devuelve un string con la fecha en
 * formato yyyy/MM/dd
 * @param {Fecha a modificar} fecha 
 * @returns Fecha con formato yyyy/MM/dd
 */
function arreglarFechaR(fecha) {
    let yyyy = fecha.substring(0, 4);
    let MM = fecha.substring(5, 7);
    let dd = fecha.substring(8, 10);
    return fechaNueva = yyyy + '/' + MM + '/' + dd;
}


/**
 * reporteClientes()  
 * Función que trae todos los registros de los clientes que más dinero le 
 * han dejado a la compañia
 * con petición GET
 */
function reporteClientes() {
    $.ajax({
        url: service + "/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success: function(respuesta) {
            console.log(respuesta);
            pintarReporteClientes(respuesta);
        }
    });
}

/**
 * pintarReporteClientes(respuesta)
 * Función que dibuja la tabla completa de registros de los clientes que
 * reservaciones han hecho
 * @param {JSON con todos los registros de los clientes que más dinero le 
 * han dejado a la compañia} respuesta 
 */
function pintarReporteClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Total reservaciones</th> <th>Cliente</th> </tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].total + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClientes").html(myTable);
}