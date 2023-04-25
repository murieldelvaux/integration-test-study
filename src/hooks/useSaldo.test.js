import { act, renderHook } from "@testing-library/react"
import { buscaSaldo } from '../services/saldo';
import useSaldo from "./useSaldo";

jest.mock('../services/saldo');
const mockSaldo ={
      valor: '100',
};

describe('hooks/useListaTransacoes.js', ()=>{
    test('deve retornar uma lista de transações e uma função que a atualiza', async()=>{
        //dublando a req
        buscaSaldo.mockImplementation(() => mockSaldo.valor);
        const {result} = renderHook(()=> useSaldo());
        expect(result.current[0]).toEqual(0);

        //preciso fazer isso para buscaTransacoes.mockImplementation(()=> mockSaldo); dar certo pois busca transação precisa esperar alguns resultados
        await act(async()=>{
            result.current[1]();
        });
        expect(result.current[0]).toEqual(mockSaldo.valor);
    })
})