<?php

header("Access-Control-Allow-Origin: *");
//prelevare i dati mandati dal client in formato json
$json = file_get_contents('php://input');

//Prendere la data di oggi
$data = date('Y-m-d');
//Creo un file con le risposte dentro
$fp = fopen("files/".$data."_risposte.json","w");
fwrite($fp,$json);
fclose($fp);

$risp = new stdClass();
$risp->cod = 0;
$risp->desc = "Salvataggio dei dati su file avvenuti con successo";

return json_encode($risp);
?>