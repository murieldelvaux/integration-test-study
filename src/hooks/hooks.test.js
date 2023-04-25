import { renderHook } from "@testing-library/react"
import { useState, useEffect } from "react"

//componente do react-library chamado renderHook
test('hooks', ()=>{
    const { result } = renderHook(()=> {
        const [nome, setNome] = useState('');
        useEffect(()=>{
            setNome('Alice');
        }, []);

        return nome;
    });

    expect(result.current).toBe('Alice');
})