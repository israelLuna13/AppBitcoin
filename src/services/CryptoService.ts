
//ESTE ARCHIVO CONTIENE LAS PETICIONES A LA API
import { CryptoCurrenciesResponseShema, CyptoPriceShema } from '../schema/schema-crypto';
import axios from 'axios'
import { Pair } from '../types';

//obtenemos el top 20 de crypto monedas
export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    //accedemos a Data de la respuesta que obtenemos
    const {data : {Data}} = await axios(url);

    //verificamos si la respuesta obtenida es igual a nuestro esquema
    const result =  CryptoCurrenciesResponseShema.safeParse(Data)
    if(result.success){
        return result.data
    }
}

//obtenemos mas detalles de la conversion que se desea hacer
export async function fetchCurrencyCryptoPrice(pair:Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`
    const {data:{DISPLAY}} = await axios(url)
    const result = CyptoPriceShema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if(result.success)
        {
            return result.data
        }
    
}

