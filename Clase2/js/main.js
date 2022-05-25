const accionesCompra = document.querySelector("#accionesC");
const enCarrito = document.querySelector("#cCompra")
const aComprar = document.querySelector("#totalDelCarrito")

// variable global del carrito
let carrito = []

// genero funcion y lo aniado al HTML 

fetch("./data/acciones.json")
    .then((Response) => Response.json())
    .then((inv) => {
        inv.forEach(e => {
            const { img, nombre, precio, id } = e
            let div = document.createElement("div")
            div.className = "col-12 mb-2 col-md-4"
            div.innerHTML += `
                    <div class="card">
                        <img src=${img} alt="" class="card-img-top">
                        <div class="card-body">
                            <h5>${nombre}</h5>
                            <p>$${precio}</p>
                            <button class="btn btn-dark" id="${id}" >Agregar</button>
                        </div>
                    </div>
                </div>`
            accionesCompra.appendChild(div)
            // genero el log al clickear boton AGREGAR
            let botonAgregar = document.getElementById(`${id}`)
            botonAgregar.addEventListener('click', () => {
                sumarAlCarrito(id);
            })
        })
    });

// aniadir al carrito

function sumarAlCarrito(x) {
    let anidar = carrito.find(i => i.id == x)
    if (anidar) {
        anidar.cantidadAcc++
        document.getElementById(`cA${anidar.id}`).innerHTML = `<td id="cA${anidar.id}">${anidar.cantidadAcc}</td>`
        carritoWeb()
    } else {
        let sumoCarrito = inventarioAcciones.find(e => e.id == x);
        sumoCarrito.cantidadAcc = 1
        carrito.push(sumoCarrito);
        cCompra(sumoCarrito)
        carritoWeb()
    }
    localStorage.setItem("itemsGuardados", JSON.stringify(carrito))
};

// lo muestro en carrito

function cCompra(sumoCarrito) {

    let tr = document.createElement("tr")
    const { id, cantidadAcc, nombre, precio } = sumoCarrito
    tr.className = "table-primary"
    tr.innerHTML = `
    <td>${id}</td>
    <td>${nombre}</td>
    <td id="cA${id}">${cantidadAcc}</td>
    <td><button class="btn btn-info btn-sm" data-id="2" id="sumar${id}">+</button>
    <button class="btn btn-danger btn-sm" data-id="2" id="borrar${id}">-</button></td>
    <td>$${precio}</td>`
    enCarrito.appendChild(tr)

    let eliminar = document.getElementById(`borrar${sumoCarrito.id}`)
    eliminar.addEventListener('click', () => {
        sumoCarrito.cantidadAcc == 1 ? (
            carrito = carrito.filter(item => item.id != sumoCarrito.id),
            eliminar.parentElement.parentElement.remove(),
            carritoWeb(),
            localStorage.setItem("itemsGuardados", JSON.stringify(carrito))
        ) : (sumoCarrito.cantidadAcc--,
            document.getElementById(`cA${sumoCarrito.id}`).innerHTML = `<td id="cA${sumoCarrito.id}">${sumoCarrito.cantidadAcc}</td>`,
            carritoWeb(),
            localStorage.setItem("itemsGuardados", JSON.stringify(carrito))
        )
    })
    let sumar = document.getElementById(`sumar${sumoCarrito.id}`)
    sumar.addEventListener('click', () => {
        sumoCarrito.cantidadAcc == 0 ? (
            carrito = carrito.filter(item => item.id != sumoCarrito.id),
            carritoWeb(),
            localStorage.setItem("itemsGuardados", JSON.stringify(carrito))
        ) : (sumoCarrito.cantidadAcc++,
            document.getElementById(`cA${sumoCarrito.id}`).innerHTML = `<td id="cA${sumoCarrito.id}">${sumoCarrito.cantidadAcc}</td>`,
            carritoWeb(),
            localStorage.setItem("itemsGuardados", JSON.stringify(carrito))
        )
    })
};

// JSON

function aplicandoJson() {
    let aj = JSON.parse(localStorage.getItem("itemsGuardados"))
    if (aj) {
        aj.forEach(e => {
            cCompra(e)
            carrito.push(e)
            carritoWeb()
        })
    }
};
aplicandoJson()

// Multiplico las acciones seleccionadas por el precio para sacar el total y genero el boton comprar.

function carritoWeb() {
    aComprar.innerHTML = carrito.reduce((x, e) => x + (e.precio * e.cantidadAcc), 0)

    let finalizarCompra = document.querySelector("#botonFinalizar")
    finalizarCompra.addEventListener('click', () => {
        if (carrito.length >= 1) {
            fncomprar()
        }
    })
};

//  Boton "Comprar" 

function fncomprar() {
    enCarrito.innerHTML = '',
    aComprar.innerHTML = '',
    carrito = [],
        localStorage.setItem("itemsGuardados", JSON.stringify(carrito)),
        Swal.fire({
            title: `Transaccion completada.`,
            icon: 'success',
        }).then(() => {
            Toastify({
                text: "Muchas gracias por su compra!",
                duration: 1500,
        }).showToast()
    })
};


