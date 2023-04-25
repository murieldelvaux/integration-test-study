import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";

describe('componente <App/>', ()=>{
    test('deve permitir adicionar uma transação em Extrato', ()=>{
        render(<App/>, {wrapper: BrowserRouter});
        // Realizar algumas consultas
        const select = screen.getByRole('combobox');
        const fieldAmount = screen.getByPlaceholderText('Digite um valor');
        /* faço dessa forma abaixo pois só tenho esse botão na página */
        const buttonElement = screen.getByRole('button');
        /*  Simulando ações com userEvent para simular uma transação feita pelo usuário */
        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(fieldAmount, '100');
        userEvent.click(buttonElement);

        const newTransaction = screen.getByTestId('lista-transacoes');
        const extractItem = screen.getByRole('listitem');

        expect(newTransaction).toContainElement(extractItem); //espero que minha transação contenha o extractitem
    });

    test('Deve navegar até a página correspondente ao link clicado', async()=>{
        render(<AppRoutes/> , {wrapper: BrowserRouter});
        //consultas
        const linkCardsPage = screen.getByText('Cartões');
        //verificando se está no documento
        expect(linkCardsPage).toBeInTheDocument();
        userEvent.click(linkCardsPage);
        //preciso procurar, será um processo assincrono, preciso usar await para dar certo
        const titleCardsPage = await screen.findByText('Meus cartões');
        expect(titleCardsPage).toBeInTheDocument();
    });
    
    test('Deve navegar até a página de Investimentos', async()=>{
        render(<AppRoutes/> , {wrapper: BrowserRouter});
        //consultas
        const linkInvestmentPage = screen.getByText('Investimentos');
        //verificando se está no documento
        expect(linkInvestmentPage).toBeInTheDocument();
        userEvent.click(linkInvestmentPage);
        //preciso procurar, será um processo assincrono, preciso usar await para dar certo
        const titleInvestmentPage = await screen.findByText('Estatísticas');
        expect(titleInvestmentPage).toBeInTheDocument();
    });
})
