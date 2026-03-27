import http from 'k6/http';
import { sleep, check } from 'k6';
import { obterToken } from '../helpers/autenticacao.js';
import { pegarBaseURL } from '../utils/variaveis.js';

export const options = {
  iterations: 1
};

export default function() {
  const token = obterToken()
   const url = pegarBaseURL() + '/transferencias';
   const payload = JSON.stringify({
    contaOrigem: 2,
    contaDestino: 1,
    valor: 11,
    token: ""
   });

   const params = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
};
  
  let res = http.post(url, payload, params);
  console.log('STATUS:', res.status);
  console.log('BODY:', res.body);
  check(res, { "status is 201": (res) => res.status === 201 });
  sleep(1);
}
