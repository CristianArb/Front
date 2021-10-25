// Este script contiene las funciones para la tabla QUADBIKES
jQuery.support.cors = true;

/**
 * La url base para los servicios 
 */
var service = "http://localhost:8080/api/"

/**
 * Función trae todos los registros de las cuatrimotos del Backend con una petición GET
 */
function traerInformacionCuatrimotos() {

    jQuery.support.cors = true;
    
    $.ajax({
        
        url: service + "Quadbike/all",
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
    
    jQuery.support.cors = true;
    let myTable = "<table>";
    myTable += "<tr> <th>Id</th> <th>Name</th> <th>Brand</th> <th>Year</th> <th>Description</th ><th>Borrar</th> <th>Detalle</th> </tr>";

    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].id + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].year + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        
        myTable += "<td>" + '<button onclick="borrarCuatrimoto(' + respuesta[i].id + ')">Borrar</button>' + "<td>";
        myTable += "<td>" + '<button onclick="detalleCuatrimoto(this)">Detalle</button>' + "<td>";        

        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#tablaCuatrimoto").html(myTable);

}

/**
 * Función para guardar un JSON en el Backend con la información de la cuatrimoto con una peticion POST
 */
function guardarInformacionCuatrimotos() {

    jQuery.support.cors = true;

    if ($("#year").val() >= 1970 && $("#year").val() <= 2022) {

        let info = {
            name: $("#name").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description").val(),
        };

        $.ajax({
            url: service + "Quadbike/save",
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

/**
 * Función que hace uso de un nodo para modificar los datos de tablaCuatrimoto
 * @param {Nodo con la fila de la tablaCuatrimoto} nodo 
 */
function detalleCuatrimoto(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode; 
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    jQuery.support.cors = true;

    let nuevoCodigoHtml =
        
        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="nombre" id="nombreActulizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="number" name="marca" id="marcaActulizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td><input type="number" name="año" id="añoActulizado" value="' + nodosEnTr[3].textContent + '" size="1" </td>' +
        '<td><input type="text" name="descripcion" id="descripcionActulizado" value="' + nodosEnTr[4].textContent + '" size="1" </td>' +
        '<td><button onclick="borrarCuatrimoto(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosCuatrimotos(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * Función para actualizar la información de la cuatrimoto con un JSON en el Backend mediante una peticion POST.
 * @param {id de la cuatrimoto a actualizar} codigo 
 */
function actualizarDatosCuatrimotos(codigo) {

    let info = {
        id: codigo,
        name: $("#nombreActulizado").val(),
        brand: $("#marcaActulizado").val(),
        year: $("#añoActulizado").val(),
        description: $("#descripcionActulizado").val()
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: service + "Quadbike/update",
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionCuatrimotos();
            alert("La cuatrimoto se actualizo correctamente");

        },
        error: function (errorThrown) {

            traerInformacionCuatrimotos();
            alert("La cuatrimoto no se actualizo correctamente");


        }
    });
}


/**
 * Función para borrar la información de la cuatrimoto con un JSON el Backend mediante una peticion DELETE.
 * @param {id de la cuatrimoto a borrar} codigo 
 */
function borrarCuatrimoto(codigo) {

    $.support.cors = true;

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: service + "Quadbike/",
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {

            traerInformacionQuadbikes();
            alert("Se ha borrado la cuatrimoto se actualizo.")

        },

        error: function (errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar la cuatrimoto.");

        }
    });
    
}


