window.onload = init;

var domande = [];
//let indirizzo = "https://localhost/4a/Ripasso/"
let indirizzo = window.location.href + "server/";

function init(){
let ris = fetch(indirizzo+"domande.php", {method:'GET'});
ris.then(async function(dati){
//Leggiamo i dati della risposta e li convertiamo in json
domande = await dati.json();

let div = document.getElementById("domande");

for(let j in domande){
    let domanda = document.createElement("div");
    domanda.innerHTML = domande[j].testo;
    div.appendChild(domanda);

    for(let i in domande[j].risp){
        let radio = document.createElement("div");
        radio.innerHTML = `
            <input type='radio' value='${domande[j].risp[i].cod}' name ='${domande[j].n}'  />
            ${domande[j].risp[i].desc}<br>
            `;
        domanda.appendChild(radio);
    }
}

});

document.getElementById("btnControlla").addEventListener("click", controlla);

}

function controlla()
{
    if(document.querySelectorAll("input:checked").length == domande.length)
    {
        
    }
    else{
        alert("Attenzione non hai selezionato una risposta per ogni domanda")
    }
}

