
const users = [
    {firstName : "Yatharth", secondName : "Kapoor", age : 22},
    {firstName : "Sanjay", secondName : "Mishra", age : 50},
    {firstName : "Anju", secondName : "Jhaplu", age : 50},
]




const setTimeOutPromisified = (ms) => {
    return new Promise((resolve)=>setTimeout(resolve,ms)) ;
}

async function fn (ms){
    await setTimeOutPromisified(ms) ;
    console.log("after waiting 2 seconds") ;
}

fn(2000);