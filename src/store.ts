import {create} from 'zustand'
import { CryptoPrice, Cryptocurrency, Pair } from './types';
import { devtools } from 'zustand/middleware';
import { getCryptos ,fetchCurrencyCryptoPrice} from './services/CryptoService';

//tipado de mi state y mis funciones o acciones 
type CryptoStore = {
    result:CryptoPrice
    loading:boolean
    cryptocurrencies:Cryptocurrency[]
    fetchCryptos : () => Promise<void>
    fetchData : (pair:Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
 
    //state con los valores iniciales
    cryptocurrencies:[],
    result:{
        IMAGEURL:'',
        PRICE:'',
        HIGHDAY:'',
        LOWDAY:'',
        CHANGEPCT24HOUR:'',
        LASTUPDATE:''
    },
    loading:false,
    
    //acciones
    //obtenemos el nombre de la crypto moneda
    fetchCryptos: async()=>{
        //esperamos a la respuesta
        const cryptocurrencies = await getCryptos()
        set(() =>({
            cryptocurrencies
        }))
    },

    //obtenemos la informacion mas detallada de la conversion
    fetchData:async(pair)=>{
       const result =  await fetchCurrencyCryptoPrice(pair)
       //activamos spinner de carga
       set(()=>({
        loading:true
      }))
      //ponemos los datos de la consulta en el state y desactivamos el spinner
       set(()=>({
        result,
        loading:false
      }))

     
    }

})))