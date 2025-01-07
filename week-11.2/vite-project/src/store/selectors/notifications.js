import {selector} from "recoil"
import { countAtom } from "../atoms/countAtom";

export const notificationSelector = selector({
    key : "notificationCount" ,
    get : ({get})=>{
      const count = get(countAtom) ;
      return count.notificationCount ; 
    }
  })
