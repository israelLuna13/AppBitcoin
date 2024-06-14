import { useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import { Pair } from "../types"
import { set } from "zod"
import ErrorMessage from "./ErrorMessage"
function CriptoSearchForm() {
    //acedemos a nuestro estado global
    const cryptoCureencies = useCryptoStore((state)=>state.cryptocurrencies)
    const fetchData = useCryptoStore((state)=>state.fetchData)

    //estado para validar el formulario
    const [pair,setPair] = useState<Pair>({
        currency:'',
        criptocurrency:''
    })
    //state para el error
    const [error,setError] = useState('')

    //cuando se seleccione alguna opcion la ponemos en el state
    const handleChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    setPair({
        ...pair,
        [e.target.name]:e.target.value
    })    
    }

    //validamos que se haya seleccionado la moneda y la conversion
   const handleSubmit=( e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(Object.values(pair).includes('')){
        setError('Todos los campos son obligatorios')
        return
    }
    setError('')
    //consultar la api
    fetchData(pair)
    }
    
  return (


    <form className='form' onSubmit={handleSubmit}>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className='field'>
            <label htmlFor="currency">Moneda: </label>
            <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>

                <option value="">--Seleccione</option>
                {currencies.map(currency=>(
                    <option value={currency.code} key={currency.code}>{currency.name}</option>
                ))}
            </select>
        </div>

        
        <div className='field'>
            <label htmlFor="criptocurrency">criptomoneda: </label>
            <select name="criptocurrency" id="criptocurrency"  onChange={handleChange} value={pair.criptocurrency}>

                <option value="">--Seleccione</option>
                {cryptoCureencies.map(crypto =>(
                   <option
                   key={crypto.CoinInfo.FullName}
                   value={crypto.CoinInfo.Name}
                   >
                    {crypto.CoinInfo.FullName}
                   </option> 
                ))}
            </select>
        </div>
        <input type="submit" value='Cotizar' />
    </form>
  )
}

export default CriptoSearchForm