window.onload = init;

var domande = [];
let risultati = [];
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
    risultati = [];
    let risposte = document.querySelectorAll("input:checked");
    if(risposte.length == domande.length)
    {
        let contErrate = 0;
        for(let risposta of risposte){
            if(!domande[risposta.name].risp[risposta.value].corretta)
            contErrate++;
            risultati.push({nDomanda : risposta.name,
                            nRisposta: risposta.value});
        }
        
        alert("hai sbagliato "+contErrate+ " risposte");
    }
    else{
        alert("Attenzione non hai selezionato una risposta per ogni domanda");
    }
    console.log(risultati)
    console.log(JSON.stringify(risultati))
    //creo il download 
    let a = document.createElement("a");
    a.setAttribute("download","risultati.json");
    let data = "data:json/plain;charset=utf-8," + risultati;

    a.setAttribute("href",  data);

    a.click();

}


