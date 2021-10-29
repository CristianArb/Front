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
var serviceR = "http://localhost:8080/api/Reservation/";

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
            alert("Ha sucedido un problema al consultar reservaciones.");
        }

    });
}

function pintarRespuestaReservaciones(respuesta) {
    
    let myTable = "<table>";
    myTable += "<tr> <th>Startdate</th> <th>Devolutiondate</th> <th>Client</th> <th>Quadbike</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td>" + respuesta[i].quadbike.name + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaReservacion").html(myTable);
}

function guardarInformacionReservaciones() {

    let info = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: {idClient: $("#select-client-R").val()},
        quadbike : {id: $("#select-quadbike-R").val()}
    };

    $.ajax({
        url: serviceR + "save",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(info),




        success: function (response) {
            console.log(response);
            console.log("La reservacion se guardo correctamente");
            alert("La reservacion se guardo correctamente");
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("La reservacion no se guardo correctamente");
        }
    });

}

/**
 * autoInicioCliente()
 * Función que le inyecta a la lista desplegable clientes los datos de los
 * clientes en el formulario de Reservacion
 */
 function autoInicioCliente(){
    
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client-R");
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
 * de las cuatrimotos en el formulario de Reservacion
 */
function autoInicioCuatrimoto(){
    
    $.ajax({
        url: "http://localhost:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-quadbike-R");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}