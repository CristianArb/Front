/**
 * funcionQuadbike
 * Este script contiene las funciones para la tabla QUADBIKES.
 * Sus funciones se implementan tanto en el index.html como en
 * creacionCuatrimoto.html usando jQuery.
 * Para las peticiones http se utiliza ajax.
 * 
 * @since 2021-10-27
 * @version 1.0
 * @author Cristian Peña, Camilo Muñoz & Andres Bonilla
 */

/**
 * La url base para los servicios de la tabla Quadbike
 */
var serviceQ = "http://129.151.110.248:8080/api/Quadbike/";

/**
 * Función trae todos los registros de las cuatrimotos con petición GET
 */
function traerInformacionCuatrimotos() {
    $.ajax({
        url: serviceQ + "all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaCuatrimotos(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar Cuatrimoto.");
        }
    });
}

/**
 * Función que dibuja la tabla completa de registros de las cuatrimotos
 * @param {JSON con todos los registros de las Quadbikes} respuesta 
 */
function pintarRespuestaCuatrimotos(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Name</th> <th>Brand</th> <th>Year</th> <th>Description</th> </tr>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].year + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        /*
        myTable += "<td>" + '<button onclick="borrarCuatrimoto(' + respuesta[i].id + ')">Borrar</button>' + "<td>";
        myTable += "<td>" + '<button onclick="detalleCuatrimoto(this)">Detalle</button>' + "<td>";
        */
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tablaCuatrimoto").html(myTable);
}

/**
 * Función para guardar una cuatrimoto
 */
function guardarInformacionCuatrimotos() {

    if ($("#year").val() >= 1970 && $("#year").val() <= 2022) {

        let info = {
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val(),
        };

        $.ajax({
            url: serviceQ + "save",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(info),


            success: function (response) {
                window.location.reload();
                console.log(response);
                console.log("La cuatrimoto se guardo correctamente");
                alert("La cuatrimoto se guardo correctamente");

            },

            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
                console.log(errorThrown)
                alert("La cuatrimoto no se guardo correctamente");
            }
        });
    } else {
        alert("El año debe estar entre 1970 y 2022");
    }
}



// ******************************** Para el reto 4 ********************************
/*
function detalleCuatrimoto(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    var nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="nombre" id="nombreActulizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="number" name="marca" id="marcaActulizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td><input type="number" name="año" id="añoActulizado" value="' + nodosEnTr[3].textContent + '" size="1" </td>' +
        '<td><input type="text" name="descripcion" id="descripcionActulizado" value="' + nodosEnTr[4].textContent + '" size="1" </td>' +
        '<td><button onclick="borrarCuatrimoto(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosCuatrimoto(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}


function actualizarDatosCuatrimotos(codigo) {

    let info = {
        id: codigo,
        brand: $("#marcaActulizado").val(),
        model: $("#modeloActulizado").val(),
        category_id: $("#categoriaActulizado").val(),
        name: $("#nombreActulizado").val()
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: service + moduleQuadbike,
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionCuatrimotos();
            console.log("Entro");

        },
        error: function (errorThrown) {

            traerInformacionCuatrimotos();
            console.log(errorThrown)


        }
    });
}



function borrarCuatrimoto(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceQ + "",
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {
            traerInformacionQuadbikes();
            alert("Se ha eliminado la cuatrimoto.")
        },

        error: function (errorThrown) {
            console.log(errorThrown);
            alert("Ha sucedido un problema al actualizar la cuatrimoto.");
        }
    });
    
}

*/