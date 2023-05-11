// Obtenemos referencias a los elementos del DOM
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const listaDeContactos = document.getElementById('lista-de-contactos');

// Definimos la variable para almacenar los contactos
let contactos = [];

// Funcion para renderizar la lista de contactos en el DOM
function renderizarListaDeContactos() {
  // Limpiamos el contenido de la lista
  listaDeContactos.innerHTML = '';

  // Iteramos sobre los contactos y agregamos cada uno a la lista
  for (let i = 0; i < contactos.length; i++) {
    const contacto = contactos[i];
    const li = document.createElement('li');

    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = contacto.nombre;
    li.appendChild(nombreSpan);

    const telefonoSpan = document.createElement('span');
    telefonoSpan.textContent = contacto.telefono;
    li.appendChild(telefonoSpan);

    const editarBoton = document.createElement('button');
    editarBoton.innerHTML = 
`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editIcon ">
<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
`  
  
    editarBoton.addEventListener('click', () => editarContacto(i));
    li.appendChild(editarBoton);

    const borrarBoton = document.createElement('button');
    borrarBoton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="editCheck">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
  `
    borrarBoton.addEventListener('click', () => borrarContacto(i));
    li.appendChild(borrarBoton);

    listaDeContactos.appendChild(li);
  }
}

// Funcion para agregar un contacto a la lista
function agregarContacto(nombre, telefono) {
  contactos.push({ nombre, telefono });
  renderizarListaDeContactos();
  guardarContactos();
}

// Funcion para editar un contacto de la lista
function editarContacto(indice) {
  const contacto = contactos[indice];
  const nuevoNombre = prompt('Ingrese la nueva tarea:', contacto.nombre);
  const nuevoTelefono = prompt('Ingrese la nueva fecha:', contacto.telefono);

  if (nuevoNombre !== null && nuevoTelefono !== null) {
    contactos[indice] = { nombre: nuevoNombre, telefono: nuevoTelefono };
    renderizarListaDeContactos();
    guardarContactos();
  }
}

// Funcion para borrar un contacto de la lista
function borrarContacto(indice) {
  contactos.splice(indice, 1);
  renderizarListaDeContactos();
  guardarContactos();
}

// Funcion para validar el formulario
function validarFormulario() {
  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();
   // Validamos que se hayan ingresado los datos requeridos
   if (nombre === '' || telefono === '') {
    alert('Debe ingresar la tarea y la nueva fecha');
    return false;
  }

  // Agregamos el contacto y limpiamos el formulario
  agregarContacto(nombre + " " + telefono);
  nombreInput.value = '';
  telefonoInput.value = ' ';

  return true;
}

// Funcion para guardar los contactos en el almacenamiento local
function guardarContactos() {
  localStorage.setItem('contactos', JSON.stringify(contactos));
}

// Funcion para cargar los contactos desde el almacenamiento local
function cargarContactos() {
  const contactosGuardados = localStorage.getItem('contactos');

  if (contactosGuardados !== null) {
    contactos = JSON.parse(contactosGuardados);
    renderizarListaDeContactos();
  }
}

// Cargamos los contactos al cargar la pagina
cargarContactos();
console.log(listaDeContactos.children.length);

// Agregamos el evento submit al formulario
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  validarFormulario();
});

