    num=0;
function agregarCampo(obj){
    num++;
    fi = document.getElementById('fiel'); // 1
    primerElemento=document.getElementById('row3'); // 2
    contenedor = document.createElement('div'); // 3 
    contenedor.id = 'div'+num; // 4
    contenedor.className='row py-1'; // 5
    fi.insertBefore(contenedor,primerElemento); // 6

    contenedor2 = document.createElement('div'); // 1
    contenedor2.id = 'div'+num; // 2
    contenedor2.className='col-lg-2 text-center';// 3
    contenedor.appendChild(contenedor2); // 4

    label = document.createElement('label'); // 1
    label.innerHTML = num+ 1;// 2
    contenedor2.appendChild(label);// 3

    contenedor3 = document.createElement('div'); // 1
    contenedor3.id = 'div'+num; // 2
    contenedor3.className='col-lg-7 text-left';//3
    contenedor.appendChild(contenedor3); // 4

    caja = document.createElement('input'); // 1
    caja.type = 'text'; // 2
    caja.className='form-control form-control-sm text-center'; //3
    contenedor3.appendChild(caja); //4

    contenedor4 = document.createElement('div'); // 1
    contenedor4.id = 'div'+num; // 2
    contenedor4.className='col-lg-3 text-center';//3
    contenedor.appendChild(contenedor4); // 4

    boton = document.createElement('button'); // 1
    boton.className='btn-borrar'; //2
    boton.onclick = function () {borrar(this.name)} // 3
    contenedor4.appendChild(boton); // 7

    i=document.createElement('i'); // 1
    i.className='fa fa-times'; //2
    i.ariaHidden='true'; //3
    boton.appendChild(i); //4

}
    function borrar(obj) {
        fi = document.getElementById('fiel'); // 1 
        fi.removeChild(document.getElementById(obj));
    }     


    