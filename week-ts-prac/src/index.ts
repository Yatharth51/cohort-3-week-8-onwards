function getFirstElement<T>(arr: T[]) {
    return arr[0];
}

const el = getFirstElement<any>(["harkiratSingh", 2]);
console.log(el.toLowerCase())