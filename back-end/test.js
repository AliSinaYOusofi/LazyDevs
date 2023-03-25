const returnTest = async () => {
    let x = await returnURL();
    return  x;
}

async function returnURL () {
    return 'xxxx';
}

console.log(returnTest())