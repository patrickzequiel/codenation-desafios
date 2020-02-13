'use strict'
const fs = require ('fs')
const csvjson = require('csvjson')
let data = fs.readFileSync(('./data.csv'), { encoding : 'utf8'});

let options = {
  delimiter : ',', // optional
  quote     : '"' // optional
};

const planilha = csvjson.toObject(data, options);

// Quantas nacionalidades (coluna `nationality`) diferentes existem no arquivo? 
const q1 = () => [...new Set (planilha.map(lista => lista.nationality))].length;

// Quantos clubes (coluna `club`) diferentes existem no arquivo?
const q2 = () => { 
  const jogadoresComClub = planilha.filter(jogadores => jogadores.club)
  const clubes = jogadoresComClub.map(clubers => clubers.club)
  return [...new Set (clubes)].length
}

// Liste o primeiro nome dos 20 primeiros jogadores de acordo com a coluna `full_name`.
const q3 = () => planilha.slice(0, 20).map(nomes => nomes.full_name); 

// Quem são os top 10 jogadores que ganham mais dinheiro (utilize as colunas `full_name` e `eur_wage`)?
/* const q4 = () => {
   planilha.sort((a,b) => a.eur_wage == b.eur_wage ? b.full_name - a.full_name : b.eur_wage - a.eur_wage)
  return planilha.slice(0, 10).map(lista => lista.planilha);
 */
const q4 = () => planilha
    .sort((a, b) => b.eur_wage - a.eur_wage || b.full_name < a.full_name )
    .slice(0, 10)
    .map(name => name.full_name)

// Quem são os 10 jogadores mais velhos (use como critério de desempate o campo `eur_wage`)?
/* const q5 = () => {
  planilha.sort((a, b) => a.age == b.age ? b.eur_wage - a.eur_wage : b.age - a.age)
  return planilha.slice(0, 10).map(lista => lista.planilha);
} */
const q5 = () => planilha
    .sort((a, b) => b.age - a.age || b.eur_wage - a.eur_wage )
    .slice(0, 10)
    .map(name => name.full_name)

// Conte quantos jogadores existem por idade. Para isso, construa um mapa onde as chaves são as idades e os valores a contagem.
const q6 = () => {
  return planilha.reduce((acumulador, inicial) => {
    if (acumulador[inicial.age]) {
      return ({ ...acumulador, [inicial.age]: acumulador[inicial.age] + 1 })
    }
    return { ...acumulador, [inicial.age]: 1 }
  }, {})
}

module.exports = { q1, q2, q3, q4, q5, q6 }