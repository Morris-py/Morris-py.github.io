// comentario en una sola linea
/*
esto es
un 
comentario de muchas lineas
*/

console.log("Bienvenidos a mi CV Web!!!");


function agregarFondoOscuroCards(){
    for(var i = 0; i < document.getElementsByClassName("card-body").length; i++)
        document.getElementsByClassName("card-body")[i].className += " fondo-card-oscuro";
}

const switchButton = document.getElementById("switch");
switchButton.addEventListener("click",()=>{
    let opcion_body_dark = document.body.classList.toggle("dark");    
    let opc_dark_btn = switchButton.classList.toggle("active");
     
    if(opcion_body_dark == true && opc_dark_btn == false){
        console.log("El usuario seleccionó modo: OSCURO");
        agregarFondoOscuroCards();
        let modo_oscuro = "oscuro";
        localStorage.setItem("modo", modo_oscuro);
    }else{
        console.log("El usuario seleccionó modo: CLARO");
        let modo_claro = "claro";
        localStorage.setItem("modo", modo_claro);

        for (var i = 0; i<document.getElementsByClassName("card-body").length; i++) {
            document.getElementsByClassName("card-body")[i].classList.remove("fondo-card-oscuro");
        }
    }
})

function obtener_localstorage(){
    let modo = localStorage.getItem("modo");
    if(modo){
        if(modo=="oscuro"){
            console.log("El usuario tiene seteado en modo: OSCURO");
            document.body.classList.toggle("dark");
            switchButton.classList.toggle("active");
            agregarFondoOscuroCards();
        }else{
            console.log("El usuario tiene seteado en modo: CLARO");
        }    
    }else{
        console.log("El usuario todavía no ha seleccionado modo oscuro.");
    }
}

const nombre = document.getElementById("nameandsurname");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("consulta");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e=>{
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    parrafo.innerHTML = "";
    if(nombre.value == ""){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(telefono.value.length < 10){
        warnings += `El telefono no es valido <br>`
        entrar = true
    }
    if(mensaje.value == ""){
        warnings += `El mensaje no es valido <br>`
        entrar = true
    }
    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado!"
        if(localStorage.getItem("modo")=="oscuro"){
            document.getElementById("modal").classList.add("fondo-card-oscuro");
            $("#ventana-modal").modal("show");
        }else if(localStorage.getItem("modo")=="claro"){
            document.getElementById("modal").classList.remove("fondo-card-oscuro");
            $("#ventana-modal").modal("show");
        }else{
            $("#ventana-modal").modal("show");
        }
    }
})



//Obtener geolocalizacion:
function getLocation() {
  if (navigator.geolocation) {
    console.log("Geolocalizacion exitosa");
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocalización no soportada en este navegador.");
  }
}
//Obtener long y latitud:
function showPosition(position) {
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    console.log("Latitud: "+latitud+", "+"Longitud: "+longitud);

    let apiId = '41ff038bb1fccb633f66c1af5114ac00'; 
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitud+'&lon='+longitud+'&appid='+apiId;
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON =>{
            showWeatherUser(dataJSON);
        })
        .catch(error =>{
            console.log(error);
        })
    /*document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;*/
}
function showWeatherUser(data){
    let {name, main:{temp}, weather:[arr]} = data;
    let degrees = kelvinToCentigrade(temp);
    let contentWeatherUser = document.createElement('div');
    contentWeatherUser.innerHTML = `
    <h2 class="txt-centrado" style="color:red;">${degrees}º C</h2>
    <img style="display:block;margin:auto" src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    `;
    document.getElementById("cityUsuario").innerHTML = `<b>`+name+`</b>`;
    document.getElementById("btn-info").style.display = 'none';
    document.getElementById("tempUsuario").appendChild(contentWeatherUser);
}


function obtenerClimaBari(){
    const apiId = '41ff038bb1fccb633f66c1af5114ac00'; 
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Bariloche&appid='+apiId;
    
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON =>{
            showWeather(dataJSON);
        })
        .catch(error =>{
            console.log(error);
        })
}
function showWeather(data){
    const {name, main:{temp}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);

    const contentBari = document.createElement('div');
    contentBari.innerHTML = `
        <h2 class="txt-centrado" style="color:red;">${degrees}º C</h2>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    `;
    document.getElementById('tempBari').appendChild(contentBari);

    console.log(name);
    console.log(temp);
    console.log(arr.icon);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}



