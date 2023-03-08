window.onload = init;

//window.location.href -> info sull'indirizzo attuale del sito e server
var indirizzo = window.location.href + "server/";

function init(){
    let ris = fetch(indirizzo+"domande.php", {method:'GET'});
    //Aspettiamo la risposta
    ris.then(async function(dati){
        //Leggiamo i dati della risposta e li convertiamo in json => chiamata asincrona
        let domande = await dati.json();
        let div = document.getElementById("divDomande");

        let domanda = document.createElement("div");
        domanda.innerHTML = domande[0].testo;
        let radio = document.createElement("div");
        radio.innerHTML = `
            <input type='radio' value='${domande[0].risp[0].cod}'  />
            ${domande[0].risp[0].desc}<br>
            `;
        domanda.appendChild(radio);

        div.appendChild(domanda);
    });
}
