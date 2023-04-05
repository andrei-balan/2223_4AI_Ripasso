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



inserisciDomande();


});

document.getElementById("btnControlla").addEventListener("click", controlla);

}
function inserisciDomande(filtro = null)
{

    let div = document.getElementById("domande");
    div.innerHTML = "";
    for(let j in domande){
        let domanda = document.createElement("div");
        domanda.innerHTML = domande[j].testo;
        
        //console.log(filtro)
        if (filtro == null ||domande[j].testo.toLowerCase().indexOf(filtro.toLowerCase())!= -1 )
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
    //il blob incapsula un file o oggetto o stringa per poterla gestire in maniera più semplice
    let a = document.createElement("a");
    a.setAttribute("download","risultati.json");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(risultati));

    a.click();
    //Contatto il server e mando le risposte
    let promise = fetch(indirizzo+"risposte.php",{method:'POST',body: JSON.stringify(risultati)});
    promise.then(async function(risp){
      let json =await risp.json();
      alert(json.desc);
    });


}
function premuto(evento)
{
    //leggiamo ciò che è scritto nella txt
    



    console.log(evento);
    console.log("onkeydown : "+ evento.target.value);

}
function rilasciato(evento)//aggiornato
{
    console.log(evento);
    console.log("onkeyup : "+ evento.target.value);
    

    
    let filtro = evento.target.value;

    inserisciDomande(filtro);


   
}
