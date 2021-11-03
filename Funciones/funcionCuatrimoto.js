/**
 * funcionCuatrimoto
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
 * La url base para los servicios 
 */
 var serviceC = service + "/api/Quadbike/";

/**
 * traerInformacionCuatrimotos()
 * Función trae todos los registros de las cuatrimotos del Backend con una petición GET
 */
function traerInformacionCuatrimotos() {

    $.ajax({

        url: serviceC + "all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaCuatrimotos(respuesta);
        },
        error: function (xhr, status) {
            alert("Ha sucedido un problema al consultar cuatrimoto.");
        }
    });
}

/**
 * pintarRespuestaCuatrimotos(respuesta)
 * Función que dibuja la tabla completa de registros de las cuatrimotos
 * @param {JSON con todos los registros de las Quadbikes} respuesta 
 */
function pintarRespuestaCuatrimotos(respuesta) {

    let myTable = "<table>";
    myTable += "<tr> <th>Id</th> <th>Brand</th> <th>Name</th> <th>Year</th> <th>Description</th > <th>Category</th > <th>Borrar</th> <th>Detalle</th> </tr>";

    for (i = 0; i < respuesta.length; i++) {

        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].id + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].year + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" + respuesta[i].category.name + "</td>";

        myTable += "<td>" + '<button onclick="borrarCuatrimoto(' + respuesta[i].id + ')">Borrar</button>' + "</td>";
        myTable += "<td>" + '<button onclick="detalleCuatrimoto(this)">Detalle</button>' + "</td>";

        myTable += "</tr>";
    }

    myTable += "</table>";
    $("#tablaCuatrimoto").html(myTable);

}

/**
 * guardarInformacionCuatrimotos()
 * Función para guardar un JSON en el Backend con la información de la cuatrimoto con una peticion POST
 */
function guardarInformacionCuatrimotos() {

    console.log($("#select-category"))
    if ($("#select-category").val() == null ){

        alert("Seleccione una categoria");

        }

        else{

        if ($("#year").val() >= 1970 && $("#year").val() <= 2022) {

            let info = {
                name: $("#name").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description").val(),
                category: { id: $("#select-category").val() },
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
                    alert("La cuatrimoto se guardó correctamente.");

                },

                error: function (jqXHR, textStatus, errorThrown) {
                    window.location.reload();
                    console.log(errorThrown)
                    alert("Ha sucedido un problema al guardar la cuatrimoto.");
                }
            });
        } else {
            alert("El año debe estar entre 1970 y 2022");
        }
    }
}



// ******************************** Para el reto 4 ********************************

/**
 * detalleCuatrimoto(nodo)
 * Función que hace uso de un nodo para modificar los datos de tablaCuatrimoto
 * @param {Nodo con la fila de la tablaCuatrimoto} nodo 
 */
function detalleCuatrimoto(nodo) {

    var nodoTd = nodo.parentNode;
    var nodoTr = nodoTd.parentNode;
    var nodosEnTr = nodoTr.getElementsByTagName('td');

    let nuevoCodigoHtml =

        '<td>' + nodosEnTr[0].textContent + '</td>' +
        '<td><input type="text" name="nombre" id="nombreActulizado" value="' + nodosEnTr[1].textContent + '" size="1" </td>' +
        '<td><input type="text" name="marca" id="marcaActulizado" value="' + nodosEnTr[2].textContent + '" size="1" </td>' +
        '<td><input type="number" name="año" id="añoActulizado" value="' + nodosEnTr[3].textContent + '" size="1" </td>' +
        '<td><input type="text" name="descripcion" id="descripcionActulizado" value="' + nodosEnTr[4].textContent + '" size="1" </td>' +
        '<td>' + nodosEnTr[5].textContent + '</td>' +
        '<td><button onclick="borrarCuatrimoto(' + nodosEnTr[0].textContent + ')">Borrar</button></td>' +
        '</td><td><button onclick="actualizarDatosCuatrimotos(' + nodosEnTr[0].textContent + ')">Aceptar</button></td>';

    nodoTr.innerHTML = nuevoCodigoHtml;

}

/**
 * actualizarDatosCuatrimotos(codigo)
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
        url: serviceC + "update",
        type: "PUT",
        contentType: 'application/json',

        success: function (response) {

            traerInformacionCuatrimotos();
            alert("La cuatrimoto se actualizó correctamente.");

        },
        error: function (errorThrown) {

            traerInformacionCuatrimotos();
            alert("Ha sucedido un problema al actualizar la cuatrimoto.");


        }
    });
}


/**
 * borrarCuatrimoto(codigo)
 * Función para borrar la información de la cuatrimoto con un JSON el Backend mediante una peticion DELETE.
 * @param {id de la cuatrimoto a borrar} codigo 
 */
function borrarCuatrimoto(codigo) {

    let info = {
        id: codigo
    };

    let dataToSend = JSON.stringify(info);

    $.ajax({
        url: serviceC + codigo,
        type: "DELETE",
        data: dataToSend,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function () {

            traerInformacionCuatrimotos();
            alert("La cuatrimoto se borró correctamente.")

        },

        error: function (errorThrown) {

            console.log(errorThrown);
            alert("Ha sucedido un problema al borrar la cuatrimoto, verifique "
            + "que no tenga información almacenada de las reservas y los" + 
            "mensajes.");

        }
    });

}

/**
 * autoInicioCategoria()
 * Función que le inyecta a la lista desplegable los datos de las
 * categorias en el formulario de Cuatrimoto
 */
function autoInicioCategoria() {
    
    $.ajax({
        url: service + "/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
            });
        }

    })

}