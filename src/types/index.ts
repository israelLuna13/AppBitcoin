import { CryptoCurrencyResponseShema, CurrencyShema, CyptoPriceShema, PairShema } from "../schema/schema-crypto";
import {z} from 'zod'
//tipado de los datos
export type Currency = z.infer<typeof CurrencyShema>
export type Cryptocurrency= z.infer<typeof CryptoCurrencyResponseShema>
export type Pair = z.infer<typeof PairShema>
export type CryptoPrice = z.infer<typeof CyptoPriceShema>


