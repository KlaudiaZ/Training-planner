export const createNewId = () => {
    let id = "";
    const arr = getCharacterArray();
    arr.forEach((char) => {
        id += char;
    });
    return id;
}

const getCharCode = (type) => { // type: number/letter
    let random;
    if (type === 'number') {
        for (let i = 0; i < 1; i++) {
            random = Math.round(Math.random() * 100);
            if (random < 48 || random > 57) {
                i--;
            } else {
                return random;
            }
        }
    } else {
        for (let i = 0; i < 1; i++) {
            random = Math.round(Math.random() * 100);
            if (random < 65 || random > 90) {
                i--;
            } else {
                return random;
            }
        }
    }
}

const getCharacterArray = () => {
    let arr = new Array(6)
    for (let i = 0; i < arr.length; i++) {
        i < 3 ?
            arr[i] = String.fromCharCode(getCharCode('letter')) :
            arr[i] = String.fromCharCode(getCharCode('number'));
    }
    return arr;
}