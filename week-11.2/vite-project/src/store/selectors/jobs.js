import {selector} from "recoil"
import { countAtom } from "../atoms/countAtom";

export const jobSelector = selector({
    key : "jobCount" ,
    get : ({get})=>{
      const count = get(countAtom) ;
      return count.jobsCount ; 
    }
  })