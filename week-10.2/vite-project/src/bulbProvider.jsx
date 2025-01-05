import { useState,createContext } from "react";
const BulbContext = createContext() ;

export function BulbProvider({children}){
    const [isBulbOn, setBulbState] = useState(true);
    return (<>
    <BulbContext.Provider value = {{
        isBulbOn : isBulbOn ,
        setBulbState: setBulbState
    }} >
        {children}
    </BulbContext.Provider>
    </>)
}   

export {BulbContext}