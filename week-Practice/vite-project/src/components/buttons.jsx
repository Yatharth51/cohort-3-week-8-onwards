import { useSetRecoilState } from "recoil"
import { notificationCountSelector, msgCountSelector, countAtom } from "./counts"

export function Buttons(){
    const setMsgCount = useSetRecoilState(msgCountSelector) ;
    const setNotifCount = useSetRecoilState(notificationCountSelector) ;

    function increaseMsgCount(){
        setMsgCount(c=>c+1) ;
    }

    function increaseNotificationCount(){
        setNotifCount(c=>c+1) ;
    }

    return (
        <div>
            <button onClick = {increaseMsgCount}> increment msg count</button>
            <button onClick = {increaseNotificationCount}> increment notification count</button>
        </div>
    )
}

