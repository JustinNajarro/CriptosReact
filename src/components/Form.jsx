import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrencies from '../hooks/useSelectCurrencies'
import {currencies} from '../data/currencies'
import axios from 'axios';

const InputSubtmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;
    :hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ currencie ,SelectCurrencies] = useSelectCurrencies('Elige tu moneda',currencies)
    const [ cripto ,SelectCripto] = useSelectCurrencies('Elige tu CriptoMoneda',criptos)

    useEffect(() => {
        const consultAPI = async () => {
          try {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const response = await axios.get(url);
            const data = response.data.Data;
    
            const mappedCriptos = data.map(cripto => ({
              id: cripto.CoinInfo.Name,
              name: cripto.CoinInfo.FullName,
            }));
            
            setCriptos(mappedCriptos);
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
    
        consultAPI();
      }, []);

    const handleSubmit = e => {
        e.preventDefault()

        if([currencie, cripto].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setCurrencies({
            currencie,
            cripto
        })
    }

    return (
        <>
            {error && <Error>Todo los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectCurrencies/>
                <SelectCripto />
                <InputSubtmit type="submit" value='Cotizar' />
            </form>
        </>
    )
}

export default Form