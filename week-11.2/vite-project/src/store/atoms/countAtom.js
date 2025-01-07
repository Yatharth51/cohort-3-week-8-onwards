import { atom } from "recoil"

export const countAtom = atom({
    key : "count" ,
    default : {
      networkCount : 100 ,
      jobsCount : 2,
      notificationCount : 99,
    }
  })