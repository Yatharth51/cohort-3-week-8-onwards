import {selector} from "recoil"
import { countAtom } from "../atoms/countAtom";

export const newtorkSelector = selector({
    key : "newtorkCount" ,
    get : ({get})=>{
      const count = get(countAtom) ;
      return count.networkCount ; 
    }
  })