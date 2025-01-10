import {atom, selector, useRecoilValue} from "recoil" ;

export const countAtom = atom({
    key : "counts",
    default  : {
        msgCount : 24, 
        notificationCount : 88,
    }
}) ;

export const msgCountSelector = selector({
    key : "msgCount" ,
    get : ({get})=>{
        const atom = get(countAtom) ;
        return atom.msgCount ;
    } ,
    set : ({get,set},newValue) =>{
        const atom = get(countAtom) ;
        set(countAtom,{...atom,msgCount : newValue})
    }
});

export const notificationCountSelector = selector({
    key : "notifCount" ,
    get : ({get})=>{
        const atom = get(countAtom) ;
        return atom.notificationCount ;
    } ,
    set : ({get,set},newValue) =>{
        const atom = get(countAtom) ;
        set(countAtom,{...atom,notificationCount : newValue})
    }
});


export function MsgCount (){
    const msgCount = useRecoilValue(msgCountSelector) ;
    return (<div>
        <p>msgCount : {msgCount} </p>
    </div>)
}

export function NotifCount (){;
    const notifCount = useRecoilValue(notificationCountSelector) ;
    return (<div>
        <p>notifCount : {notifCount} </p>
    </div>)
}

export function Count(){
    return (<div>
        <MsgCount/>
        <NotifCount/>
    </div>)
}
