const socket = io();

const btnChat = document.querySelector('#btnChat');
const formularioProdu = document.querySelector('#produForm');

btnChat.addEventListener('click', () => {
  const chatCorreo = document.querySelector("#chatCorreo");
  const chatMensaje = document.querySelector("#chatMensaje");
  socket.emit('mensaje', {'correo': chatCorreo.value, 'texto': chatMensaje.value});
});

let form = document.querySelector('#produForm');
let btnForm = document.querySelector('#btnGuardar');

btnForm.addEventListener('click', () =>{
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbail = document.getElementById('thumbail').value;
      fetch('/api/productos', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'title':  title, 'price': price, 'thumbail': thumbail})
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => 
            produCargado(response)
        );
});

function produCargado(response){
  fetch('/api/productosList')
    .then(response => response.json())
    .then(data =>
      socket.emit('producto', data)
    );    
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbail').value = '';
}

function render(data) {
  if (data != undefined && data != null){
      if (data.length > 0){
          document.getElementById("tablaProdB").innerHTML = '';
          var html = data
            .map(function (data, index) {
              return `<tr>
                          <td>${data.id} </td>
                          <td>${data.title} </td>
                          <td>${data.price} </td>
                          <td>${data.thumbail} </td>
                        </tr>`;
            })
            .join(" ");
            document.getElementById('tablaProd').style.display = "inline-table";
            document.getElementById("tablaProdB").innerHTML = html;
      }
  }
}
  
socket.on('productos', function (data) {
  if (data != undefined && data != null){
    if (data.length > 0){
      render(data);        
    }
  }
});

socket.on('mensajes', mensajes => {
  
    const mensajesInput = mensajes.map(mensaje => `${mensaje.mensaje.correo} :  ${mensaje.mensaje.texto}`).join("\n")
    document.querySelector("#chatContenedor").innerHTML = mensajesInput;
});

document.addEventListener("DOMContentLoaded",function(){
  traigoListado();
});

function traigoListado(){
    fetch('/api/productosList')
    .then(response => response.json())
    .then(data =>
       render(data)
    );
}

