//Variables Globales
const agregarBtnUI = document.querySelector('#agregarBtn');
const contenidoUI = document.querySelector('#contenido');
const errorUI = document.querySelector('#error');
const totalUI =document.querySelector('#total');
let tipoTrabajo = document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex].value;
const containerTableUI = document.querySelector('#containerTable');
const contenedorPeriodoUI = document.querySelector('#contenedorPeriodo');
let datos = [];

//Functions
const crearItem = (periodo, nombre, direccion, sqft, tipoTrabajo, costoTrabajo, subtotalItemformat, subtotalItem)=>{
    if(datos===null){
        datos=[]
        let item ={
            periodo            : periodo,
            nombre             : nombre,
            direccion          : direccion,
            sqft               : sqft,
            tipoTrabajo        : tipoTrabajo,
            costoTrabajo       : costoTrabajo,
            subtotalItemformat : subtotalItemformat,
            subtotalItem       : subtotalItem
        }
        datos.push(item);
    }
    else{
        let item ={
            periodo            : periodo,
            nombre             : nombre,
            direccion          : direccion,
            sqft               : sqft,
            tipoTrabajo        : tipoTrabajo,
            costoTrabajo       : costoTrabajo,
            subtotalItemformat : subtotalItemformat,
            subtotalItem       : subtotalItem
        }
        datos.push(item);
        console.log(datos)
    }    
}

const limpiarInput = () =>{
    document.querySelector('#periodo').value = "";
    document.querySelector('#nombre').value ="";
    document.querySelector('#direccion').value="";
    document.querySelector('#sqft').value="";
    document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex=0];
    document.querySelector('#periodo').focus;
}

const guardarDB =() =>{
    localStorage.setItem('detalleMedicion', JSON.stringify(datos));
}

const pintarDatos = () =>{
    contenedorPeriodoUI.innerHTML='';
    datos = JSON.parse(localStorage.getItem('detalleMedicion'));
    if(datos===null){
        datos=[]
    }
    else{
        let datosOrdenados = datos.sort((a, b) => new Date(a.periodo) > new Date(b.periodo))
        const grouped = groupBy(datosOrdenados, i => i.periodo);

        datosOrdenados.forEach((element,index)=>{
            contenedorPeriodoUI.innerHTML +=`
            <table class="table table-hover table-darktable-responsive-sm">
                        <thead>
                            <tr class="mb-2">
                                <td class=""><h5>Periodo:${grouped.get('periodo')}</h5></td>
                            </tr>
                            <tr class="thead-dark">
                                <th style="text-align:center">#</th>
                                <th style="text-align:center">NOMBRE</th>
                                <th style="text-align:center">DIRECCION</th>
                                <th style="text-align:center">SQFT</th>
                                <th style="text-align:center">TIPO</th>
                                <th style="text-align:center">SUBTOTAL </th>
                                <th colspan="2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="text-align:left">${index}</td>
                                <td style="text-align:center">${element.nombre}</td>
                                <td style="text-align:justify">${element.direccion}</td>
                                <td style="text-align:center">${element.sqft}</td>
                                <td style="text-align:left">${element.tipoTrabajo}</td>
                                <td style="text-align:center">${element.subtotalItemformat}</td>
                                <td style="text-align:left">
                                <button class="btn-borrar btn-sm" id=${index}><i class="fa fa-times" aria-hidden="true" id=${index}></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>` 
        });
    }
}

const sumarPosiciones = () =>{
    if(datos===null){
        datos=[]
    }
    else{
        datos = JSON.parse(localStorage.getItem('detalleMedicion'));
        suma=0;
        datos.forEach(element=>{
            suma = suma + element.subtotalItem;
        })
        totalUI.value=(formatNumber.new(suma, "$"));
    }
}

const validarCampos = () =>{

    let periodo = document.querySelector('#periodo');
    let nombre = document.querySelector('#nombre');
    let direccion = document.querySelector('#direccion');
    let sqft = document.querySelector('#sqft');
    let tipoTrabajo = parseFloat(document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex].value);
    
    if(periodo.value===''){
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Seleccione la fecha.
        </div>
        `;
        periodo.className="form-control is-invalid";
        return false
    }

    else if(nombre.value===''){
        periodo.className="form-control is-valid";
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Ingrese el nombre del cliente.
        </div>
        `;
        nombre.className="form-control is-invalid";
        return false
    }

    else if(direccion.value===''){
        periodo.className="form-control is-valid";
        nombre.className="form-control is-valid";
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Ingrese la direccion del cliente.
        </div>
        `;
        direccion.className="form-control is-invalid";
        return false
    }
    else if(sqft.value===''){
        periodo.className="form-control is-valid";
        nombre.className="form-control is-valid";
        direccion.className="form-control is-valid";
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Ingrese el valor de SQFT.
        </div>
        `;
        sqft.className="form-control is-invalid";
        return false
    }
    else if(isNaN(sqft.value)){
        periodo.className="form-control is-valid";
        nombre.className="form-control is-valid";
        direccion.className="form-control is-valid";        
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            SQFT solo admite valores numericos.
        </div>
        `;
        sqft.className="form-control is-invalid";
        return false
    }
    else if(tipoTrabajo.value===''){
        periodo.className="form-control is-valid";
        nombre.className="form-control is-valid";
        direccion.className="form-control is-valid";
        sqft.className="form-control is-valid";        
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Seleccione el tipo de trabajo.
        </div>
        `;
        tipoTrabajo.className="form-control is-invalid";
        return false
    }
    else if(document.getElementById('tipoTrabajo').selectedIndex===0){
        periodo.className="form-control is-valid";
        nombre.className="form-control is-valid";
        direccion.className="form-control is-valid";
        sqft.className="form-control is-valid";        
        errorUI.innerHTML=`
        <div class="alert alert-danger" role="alert">
            Seleccione el tipo de trabajo.
        </div>
        `;
        tipoTrabajo.className="form-control is-invalid";
        return false
    }
    else{
        periodo.className="form-control form-sm text-center";
        nombre.className="form-control form-sm";
        direccion.className="form-control form-sm";
        sqft.className="form-control form-sm";
        tipoTrabajo.className="form-control";
        errorUI.innerHTML=``;

        let valorPeriodo       = periodo.value;
        let valorNombre        = nombre.value;
        let valorDireccion     = direccion.value;
        let valorSqft          = parseFloat(sqft.value);
        let valorTipoTrabajo   = document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex].text;
        let valorCostoTrabajo  = parseFloat(document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex].value);
        
        let subtotalItemformat, valorSubtotal;

        if((valorCostoTrabajo === 75)||(valorCostoTrabajo=== 75)){
            subtotalItemformat = '75$';
            valorSubtotal = 75;
        }
        else{
            subtotalItemformat = (formatNumber.new((valorSqft * 1.5), "$"));
            valorSubtotal = valorSqft * 1.5;
        }       
         
        crearItem(valorPeriodo,valorNombre,valorDireccion,valorSqft,valorTipoTrabajo,valorCostoTrabajo, subtotalItemformat, valorSubtotal);
        guardarDB();
        pintarDatos();
        sumarPosiciones();
        limpiarInput();
        activarPrimerControl();

    }
}
var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
   }

   function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

//AddEventListener
const activarPrimerControl = () =>{
    document.querySelector('#periodo').focus();
}

document.getElementById('agregarBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    validarCampos(); 
});

document.addEventListener('DOMContentLoaded', (e)=>{
    activarPrimerControl();
    pintarDatos();
    limpiarInput();
    sumarPosiciones();
});
contenidoUI.addEventListener('click', (e)=>{
    if((e.target.classList[1]==='fa-times') || (e.target.classList[0]=='btn-borrar')){
        console.log(e.target.id)
    }
})