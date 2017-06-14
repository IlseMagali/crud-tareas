// console.log("ilse");
var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click", ".eliminador", borrarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}

var plantillaTabla = "<tr data-id='__id-tarea__'>"+
        "<td>__nombre_tarea__</td>"+
        "<td>__estado_tarea__</td>"+
        "<td>"+
          "<span class='glyphicon glyphicon-zoom-in'></span>"+
          "<span class='glyphicon glyphicon-pencil'></span>"+
          "<span class='glyphicon glyphicon-remove-circle eliminador' data-id='__id-tarea__'></span>"+
        "</td>"+
      "</tr>";

var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var idTarea = tarea._id;
  // creamos la fila
  // var $tr = $("<tr />");
  // // creamos la celda del nombre
  // var $nombreTd = $("<td />");
  // $nombreTd.text(nombre);
  // // creamos la celda del estado
  // var $estadoTd = $("<td />");
  // $estadoTd.text(estado);
  // // agregamos las celdas a la fila
  // $tr.append($nombreTd);
  // $tr.append($estadoTd);

  // reemplazar en plantilla
  var reemplazarEnPlantilla = plantillaTabla.replace("__nombre_tarea__", nombre).replace("__estado_tarea__", estado).replace("__id-tarea__", idTarea);
  // agregamos filas a la tabla
  $tasksList.append(reemplazarEnPlantilla);
};

var agregarTarea = function (e) {
  e.preventDefault();

  // necesitamos el valor del input para agregarlo a algo
  var nombre = $("#nombre-tarea").val();
  // este metodo necesita parametros: url, informacion que queremos enviar es el segundo parámetro (el objeto),
  // el tercer paramentro es la respuesta
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    $("#myModal").modal("hide");
    cargarTareas();
    console.log(tarea);
  });
};

var borrarTarea = function () {
  var $idABorrar = $(this).attr("data-id");
  $.ajax({
    url: api.url + id,
    type: 'DELETE',
    success: function (data) {
      cargarTareas();
    }
  });
}

$(document).ready(cargarPagina);
