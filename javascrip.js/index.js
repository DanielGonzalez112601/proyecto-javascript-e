
let carrito = [];


class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const imagenesProductos = {
    "REAL MADRID": "./camisetas/real-madrid.webp",
    "P S G": "./camisetas/psg.webp",
    "REAL BETIS": "./camisetas/betis.webp",
    "VALENCIA": "./camisetas/valencia2.webp",
    "BARCELONA": "./camisetas/barselona.webp",
    "LIVERPOOL": "./camisetas/liverpool.webp"
  };
  
function agregarAlCarrito(id) {
    let producto;

    if (id === 1) {
        producto = new Producto(id, "REAL MADRID", 120, "./camisetas/real-madrid.webp");
    } else if (id === 2) {
        producto = new Producto(id, "P S G", 120, "./camisetas/psg.webp");
    } else if (id === 3) {
        producto = new Producto(id, "REAL BETIS", 100, "./camisetas/betis.webp");
    } else if (id === 4) {
        producto = new Producto(id, "VALENCIA", 100, "./camisetas/valencia2.webp");
    } else if (id === 5) {
        producto = new Producto(id, "BARCELONA", 100, "./camisetas/barselona.webp");
    } else if (id === 6) {
        producto = new Producto(id, "LIVERPOOL", 100, "./camisetas/liverpool.webp");
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agragaste al carrito',
        showConfirmButton: false,
        timer: 1500
      })

    carrito.push(producto);
    

 
    actualizarCarrito();
    actualizarMontoTotal();
}


function actualizarCarrito() {
    let carritoElemento = document.getElementById("carrito");
    carritoElemento.innerHTML = "";


    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];

        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        let spanNombre = document.createElement("span");
        spanNombre.textContent = producto.nombre;
        let spanPrecio = document.createElement("span");
        spanPrecio.textContent = "$" + producto.precio.toFixed(2);
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("onclick", "eliminarDelCarrito(" + i + ")");

        li.appendChild(img);
        li.appendChild(spanNombre);
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(spanPrecio);
        li.appendChild(botonEliminar);

        carritoElemento.appendChild(li);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarMontoTotal() {
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }

    let montoTotalElemento = document.getElementById("monto-total");
    montoTotalElemento.textContent = "$" + total.toFixed();


    localStorage.setItem("montoTotal", total.toFixed());
}


function cargarDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem("carrito");
    let montoTotalGuardado = localStorage.getItem("montoTotal");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    if (montoTotalGuardado) {
        let montoTotalElemento = document.getElementById("monto-total");
        montoTotalElemento.textContent = "$" + montoTotalGuardado;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    cargarDesdeLocalStorage();

    
});


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);


    actualizarCarrito();
    actualizarMontoTotal();
}



function finalizarCompra() {
   
    Swal.fire('Compra finalizada ')


    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    actualizarMontoTotal();
}






async function obtenerDatosDeAPI() {
    const url = 'https://football-pro.p.rapidapi.com/api/v2.0/fixtures/11867339?include=bench&tz=Europe%2FAmsterdam';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f2597f4f77mshf2f3868fac67838p188986jsnb13d7726fbcf',
            'X-RapidAPI-Host': 'soccer-football-info.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); 
        console.log(result);
        
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    obtenerDatosDeAPI();
});
