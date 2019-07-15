//Variables Globales
const agregarBtnUI = document.querySelector('#agregarBtn');
const contenidoUI = document.querySelector('#contenido');
const totalContainerUI = document.querySelector('#totalContainer');
const errorUI = document.querySelector('#error');
const totalUI =document.querySelector('#total');
let tipoTrabajo = document.getElementById('tipoTrabajo').options[document.getElementById('tipoTrabajo').selectedIndex].value;
const containerTableUI = document.querySelector('#containerTable');
const contenidoModalUI = document.querySelector('#contenidoModal');
const EliminarBtnUI = document.querySelector('#eliminarBtn');
const tablaDetalleUI = document.querySelector('#tablaDetalles');
const pdfButtonUI = document.querySelector('#pdfButton');
const btnExportarPdfUI = document.querySelector('#pdf');
const excelButtonUI = document.querySelector('#excelButton');
const contenidoTablaPdf = document.querySelector('#contenidoTablaPdf');
const totalContainerTablaPdf = document.querySelector('#totalContainerTablaPdf');
const fechaUI= document.querySelector('#fecha');
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
    contenidoUI.innerHTML='';
    datos = JSON.parse(localStorage.getItem('detalleMedicion'));
    if(datos===null){
        datos=[]
    }
    else{
        let datosOrdenados = datos.sort((a, b) => new Date(a.periodo) > new Date(b.periodo))
        datosOrdenados.forEach((element, index)=>{
            contenidoUI.innerHTML +=`<td style="text-align:left; width:100px">${element.periodo}</td><td style="text-align:left; width:200px">${element.nombre}</td><td style="text-align:left; width:400px">${element.direccion}</td><td style="text-align:center; width:100px">${element.sqft}</td><td style="text-align:left; width:150px">${element.tipoTrabajo}</td><td style="text-align:center; width:170px">${element.subtotalItemformat}</td><td style="text-align:center" class="" border="0"><button class="btn-borrar btn-sm" id=${index}><i class="fa fa-times" aria-hidden="true" id=${index}></i></button></td>`
        });

    }
}

// 

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
        totalContainerUI.innerHTML=`
        <tr>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:right" class="bg-dark text-white">Total USD</td>
            <td style="text-align:center" class="bg-dark text-white" >${(formatNumber.new(suma, "$"))}</td>
            <td style="text-align:center" class="bg-dark text-white"></td>
        </tr>`
              
    }
}

const eliminarValor = (posicion) =>{
    if(datos===null){
        datos=[]
        totalContainerUI.innerHTML=``
    }
    else{
        datos.splice(posicion, 1);
        guardarDB();
        pintarDatos();
        sumarPosiciones();
        totalContainerUI.innerHTML=`
        <tr>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:center" class="bg-dark text-white" ></td>
            <td style="text-align:right" class="bg-dark text-white">Total USD</td>
            <td style="text-align:center" class="bg-dark text-white" >${(formatNumber.new(suma, "$"))}</td>
            <td style="text-align:center" class="bg-dark text-white"></td>
        </tr>`
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
            Ingrese la direccion o descripción de la actividad.
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

        if((valorCostoTrabajo === 75)||(valorCostoTrabajo===75)){
            subtotalItemformat = '$75';
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


const resetDatos = () => {
    localStorage.removeItem('detalleMedicion');
    pintarDatos();
    totalContainerUI.innerHTML='';
}

function HTMLtoPDF(){
        var pdf = new jsPDF('p', 'pt', 'letter');
        source = $('#HTMLtoPDF')[0];
        specialElementHandlers = {
            '#bypassme': function(element, renderer){
                return true
            }
        }
        margins = {
            top: 50,
            left: 60,
            width: 545
          };
        pdf.fromHTML(
              source // HTML string or DOM elem ref.
              , margins.left // x coord
              , margins.top // y coord
              , {
                  'width': margins.width // max width of content on PDF
                  , 'elementHandlers': specialElementHandlers
              },
              function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                pdf.save('html2pdf.pdf');
              }
          )		
}

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = uri + base64(format(template, ctx))
    }
  })()

const exportarDatosPdf = () =>{
    fechaUI.innerHTML='';
    contenidoTablaPdf.innerHTML='';
    totalContainerTablaPdf.innerHTML='';
    datos = JSON.parse(localStorage.getItem('detalleMedicion'));
    if(datos===null){
        datos=[]
    }
    else{

        fechaUI.innerHTML=``;

        fechaUI.innerHTML=`<b>Fecha:<span id="fecha" style="color:#fff;"> ${fecha}</span></b>`;

        let datosOrdenados = datos.sort((a, b) => new Date(a.periodo) > new Date(b.periodo))
        datosOrdenados.forEach((element, index)=>{
            contenidoTablaPdf.innerHTML +=`<td style="text-align:left; width:100px">${element.periodo}</td><td style="text-align:left; width:200px">${element.nombre}</td><td style="text-align:left; width:500px">${element.direccion}</td><td style="text-align:center; width:100px">${element.sqft}</td><td style="text-align:left; width:200px">${element.tipoTrabajo}</td><td style="text-align:center; width:170px">${element.subtotalItemformat}</td>`
        
        totalContainerTablaPdf.innerHTML=`
            <tr>
                <td style="text-align:center" class="bg-dark text-white" ></td>
                <td style="text-align:center" class="bg-dark text-white" ></td>
                <td style="text-align:center" class="bg-dark text-white" ></td>
                <td style="text-align:center" class="bg-dark text-white" ></td>
                <td style="text-align:right; width:150px;" class="bg-dark text-white">Total USD</td>
                <th style="text-align:center" class="bg-dark text-white" >${(formatNumber.new(suma, "$"))}</th>
            </tr>`    
        });

    }
} 

const fechaActual = () =>{
    var f = new Date();
    fecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    return(fecha);
}

//AddEventListener
const activarPrimerControl = () =>{
    if(datos===null){
        datos=[]
    }
    else{
        document.querySelector('#periodo').focus();
    }
    
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
    fechaActual();
});

contenidoUI.addEventListener('click', (e)=>{
e.preventDefault();

    if((e.target.classList[1]==='fa-times') || (e.target.classList[0]=='btn-borrar')){
        let posicionArray =e.target.id;
        eliminarValor(posicionArray);   
    }
    // if((e.target.classList[0]==='btn-edit') || (e.target.classList[1]=='fa-edit') 
    // || (e.target.classList[0]=='svg-inline--fa') ||(e.target.classList[2]=='fa-w-18')){
    //     let posicionArray =e.target.id;
    //     editarValor(posicionArray);      
    // }
})

EliminarBtnUI.addEventListener('click', (e)=>{
    e.preventDefault();
    resetDatos();
})

pdfButtonUI.addEventListener('click', (e)=>{
    e.preventDefault();
    exportarDatosPdf();
})



excelButtonUI.addEventListener('click', (e)=>{
    e.preventDefault();
    tableToExcel('tabladeDetalles', 'DetallesFacturacion')
})

btnExportarPdfUI.addEventListener('click', (e)=>{
    e.preventDefault();
    HTMLtoPDF();
})