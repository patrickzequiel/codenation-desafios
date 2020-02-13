const fs = require ('fs')
const csvjson = require('csvjson')
let data = fs.readFileSync(('./data.csv'), { encoding : 'utf8'});

let options = {
    delimiter : ',', // optional
    quote     : '"' // optional
  };

const planilha = csvjson.toObject(data, options);

console.log(planilha)

//Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const nacionalidade = () => [...new Set (planilha.map(lista => lista.nationality))].length; 

console.log(nacionalidade())

//Quantos clubes (coluna `club`) diferentes existem no arquivo?

const club = () => [...new Set (planilha.map(lista => lista.club))].length; 

console.log(club())

const full_name = () => planilha.slice(0, 20).map(nomes => nomes.full_name); 

console.log(full_name())

//Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?

const maisBemPagos = () => {
  planilha.sort((a,b) => a.eur_wage == b.eur_wage ? b.full_name - a.full_name : b.eur_wage - a.eur_wage)
return planilha.slice(0, 10).map(lista => lista.planilha);
}

console.log(maisBemPagos())







