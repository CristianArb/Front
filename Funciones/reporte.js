
/**
* reporteStatuts()  
* Función que trae todos los registros de cantidad de reservas completadas y 
* canceladas
* con petición GET
*/
function reporteStatus() {
    console.log("test");
    $.ajax({
        url: serviceR + "report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaStatus(respuesta);
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
    myTable += "<tr> <th>completadas</th> <th>canceladas</th> </tr>" ;
    myTable += "<tr> <td>" + respuesta.completed + "</td>";
    myTable += "<td>" + respuesta.cancelled + "</td> </tr>";
    myTable += "</tr>";
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
    
    $.ajax({
        url: serviceR + "report-dates/" + fechaInicio + "/" + fechaCierre,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
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
    myTable += "<tr>";

    for (i = 0; i < respuesta.length; i++) {

        myTable += "<th>total</th>";
        myTable += "<td>" + arreglarFecha(respuesta[i].startDate) + "</td>";
        myTable += "<td>" + arreglarFecha(respuesta[i].devolutionDate) + "</td>"
        myTable += "<td>" + respuesta[i].status + "</td>";


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
 function arreglarFecha(fecha) {
    let yyyy = fecha.substring(0,4);
    let MM = fecha.substring(5,7);
    let dd = fecha.substring(8,10);
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
        url: serviceR + "report-clients",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

/**
* pintarRespuestaDate(respuesta)
* Función que dibuja la tabla completa deregistros de los clientes que más 
* dinero le  han dejado a la compañia
* @param {JSON con todos losregistros de los clientes que más dinero le 
* han dejado a la compañia} respuesta 
*/
function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<th>total</th>";
        myTable += "<td>" + respuesta[i].total + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].client.email + "</td>";
        myTable += "<td>" + respuesta[i].client.age + "</td>";

        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoClientes").html(myTable);
}

