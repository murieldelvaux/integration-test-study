import {render, screen} from "@testing-library/react";
import App from "./paginas/Principal/App";
import AppRoutes from './routes'
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Cartoes from './componentes/Cartoes'

describe('Rotas', ()=>{
    test('Deve renderizar a rota principal', ()=>{
        render(<App/>, {wrapper: BrowserRouter});
        const user = screen.getByText('Olá, Joana :)!');
        expect(user).toBeInTheDocument();
    });
    test('Deve renderizar a rota Cartões', ()=>{
        const rota = '/cartoes';
        render(
            <MemoryRouter initialEntries={[rota]}>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="cartoes" element={<Cartoes/>}/>
                    </Route>
                </Routes>
            </MemoryRouter>
        );
        const myCards = screen.getByText('Meus cartões');
        expect(myCards).toHaveTextContent('Meus cartões');
    });
    test('Deve renderizar a localização da rota atual', ()=>{
        const rota = '/cartoes';
        render(
            <MemoryRouter initialEntries={[rota]}>
               <App />
            </MemoryRouter>
        );
        const currentLocation = screen.getByTestId('local');
        expect(currentLocation).toHaveTextContent(rota);
    });
    test('Deve renderizar a página 404', ()=>{
        const rota = '/extrato';
        render(
            <MemoryRouter initialEntries={[rota]}>
               <AppRoutes />
            </MemoryRouter>
        );
        const errorPage = screen.getByTestId('pagina-404');
        expect(errorPage).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
    });
})