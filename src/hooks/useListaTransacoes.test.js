import { act, renderHook } from "@testing-library/react"
import { buscaTransacoes } from "../services/transacoes";
import useListaTransacoes from "./useListaTransacoes";

jest.mock('../services/transacoes');
const mockTransacao = [
    {
      id: 1,
      transacao: 'Depósito',
      valor: '100',
      data: '22/11/2022',
      mes: 'Novembro',
    },
];
describe('hooks/useListaTransacoes.js', ()=>{
    test('deve retornar uma lista de transações e uma função que a atualiza', async()=>{
        //dublando a req
        buscaTransacoes.mockImplementation(()=> mockTransacao);
        const {result} = renderHook(()=> useListaTransacoes());
        expect(result.current[0]).toEqual([]);

        //preciso fazer isso para buscaTransacoes.mockImplementation(()=> mockTransacao); dar certo pois busca transação precisa esperar alguns resultados
        await act(async()=>{
            result.current[1]();
        });
        expect(result.current[0]).toEqual(mockTransacao);
    })
})