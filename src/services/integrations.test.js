import api from './api';
import { buscaTransacoes, salvaTransacao } from './transacoes';

jest.mock('./api');

const mockTransacao = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

//função para simular retorno da API

const mockRequisicao = (retorno) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: retorno,
        });
      }, 200);
    });
};
const mockRequisicaoErro = () => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject();
      }, 200);
    });
};

describe('Requisições para API', () => {
   test('Deve retornar umalista de transações', async()=>{
        /* vou dublar o comportamento da minha api */
        api.get.mockImplementation(() => mockRequisicao(mockTransacao));

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual(mockTransacao);
        //verificar se a função está sendo chamada com algfum parâmetro
        expect(api.get).toHaveBeenCalledWith('/transacoes');
   });

   test('Deve retornar uma lista vazia quando falhar a requisição', async()=>{
        /* vou dublar o comportamento da minha api */
        api.get.mockImplementation(() => mockRequisicaoErro());

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual([]);
        //verificar se a função está sendo chamada com algfum parâmetro
        expect(api.get).toHaveBeenCalledWith('/transacoes');
   });
});

/* describe('Requisições para API', () => {
    test('Deve retornar uma lista de transações', async () => {
        const transacoes = await buscaTransacoes();
        expect(transacoes).toHaveLength(3);

        render(<App />, { wrapper: BrowserRouter });
        const transacao = await screen.findAllByText('Novembro');
        transacao.forEach(transacao => expect(transacao).toBeInTheDocument());
    });
}); */

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 201,
        });
      }, 200);
    });
};
const mockRequisicaoPostErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
        reject();
        }, 200);
    });
};
describe('requisição tipo post', ()=>{

    test('Deve retornar um status 201 - (Created) após uma requisição POST', async () => {
        api.post.mockImplementation(() => mockRequisicaoPost());
        const status = await salvaTransacao(mockTransacao[0]);
        expect(status).toBe(201);
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
    });
    
    test('Deve retornar um saldo de 1000 quando a requisição POST falhar', async () => {
        api.post.mockImplementation(() => mockRequisicaoPostErro());
        const status = await salvaTransacao(mockTransacao[0]);
        expect(status).toBe('Erro na requisição');
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
    });
});