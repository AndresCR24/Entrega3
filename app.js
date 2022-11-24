const stockProductos = [
  {
    id: 1,
    nombre: "cocas grandes 30 Oz",
    cantidad: 200,
    desc: "Conservar tus alientos frescos ahora es mas facil! Amplia variedad de colores",
    precio: 400000,
    img: "img/cocas.jpeg",
  },
  {
    id: 2,
    nombre: "Pocillos",
    cantidad: 600,
    desc: "Maxima calidad y resistencia para tus bebidas calientes",
    precio: 600000,
    img: "img/pocillos.jpeg",
  },
  {
    id: 3,
    nombre: "Ganchos",
    cantidad: 300,
    desc: "Gancho de Ropa premium Alta Calidad y alta resistencia",
    precio: 90000,
    img: "img/gancho.jpeg",
  },
  {
    id: 4,
    nombre: "cocas pequeñas 16 Oz",
    cantidad: 200,
    desc: "Maxima hermeticidad!! Maxima Calidad!! Hermeticos Beed. El Original",
    precio: 280000,
    img: "img/cocaPequeña.jpeg",
  },
  {
    id: 5,
    nombre: "Cartera de florez",
    cantidad: 250,
    desc: "La cartera multi usos , la de flores la original",
    precio: 500000,
    img: "img/cartera.jpeg",
  },
  {
    id: 6,
    nombre: "Canasta para huevos ",
    cantidad: 100,
    desc: "Ya tienes donde ordenar tus huevos? Te presentamos nuestra gallina portahuevos un elemento que no puede faltar en tu cocina",
    precio: 135000,
    img: "img/huevos.jpeg",
  },
  {
    id: 7,
    nombre: "Balde 12 litros",
    cantidad: 50,
    desc: "Balde 12 litros. Con su Asa en el fondo facilita el vaciado. Producto premium de alta calidad",
    precio: 199900,
    img: "img/balde.jpeg",
  },
  {
    id: 8,
    nombre: "Lolitas",
    cantidad: 100,
    desc: "Vajilla con 15 piezas para que los niños simulen la hora del té",
    precio: 150000,
    img: "img/lolitasrial.jpeg",
  },
  {
    id: 9,
    nombre: "Shaker",
    cantidad: 50,
    desc: "Botella plastica libre de BPA ideal para consumo de suplementos deportivos",
    precio: 200000,
    img: "img/shaker.jpeg",
  },
  {
    id: 10,
    nombre: "Cubiertos",
    cantidad: 500,
    desc: "Kit cuchara, cuchillo, tenedor ideal para llevar a cualquier lugar",
    precio: 80000,
    img: "img/cubiertos.jpeg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
    alert("Carrito Vacio")
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio COP: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + 1 * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + 1 * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const persona = document.querySelector('#persona').value
   const email = document.querySelector('#correo').value

   if(email === '' || persona == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

   //document.getElementById('form')
   //.addEventListener('submit', function(event) {
     //event.preventDefault();
  
     btn.value = 'Sending...';
  
     const serviceID = 'default_service';
     const templateID = 'template_n6d52ae';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Correo enviado';
        alert('Enviado!');
      }, (err) => {
        btn.value = 'Correo enviado';
        alert(JSON.stringify(err));
      });
  ;
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }
