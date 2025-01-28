// import { decryptTheData } from "./decrypt.js"
export function registerUser(data){
    let parseddata=data
    let string = `CALL registerUser('${parseddata.firstName}','${parseddata.lastName}','${parseddata.occupation}','${parseddata.email}','${parseddata.password}')`
    return string
    
}

export function validateUser(data){
    let parseddata=data
    let string = `select validatePasswordAndEmail('${parseddata.email}','${parseddata.password}')`
    return string
    
}

export function setToFalse(data){
    let parseddata=data
    let str=''
    let aux=data.array.map((element)=>element)

console.log(aux, Array.isArray(aux)); // Output: [1, 2, 3, 4, 5] true
console.log(aux.length);              // Output: 5

    console.log(aux, typeof(aux))
    for(let i=0;i<aux.length;i++){
        str+= `'${aux[i]}',`
    }
    str+=`'${aux[aux.length-1]}'`
    console.log('str',str)
    let string = `select update_status_false(array[${str}])`
    return string
    
}


export function setToTrue(data){
    let parseddata=data
    let str=''
    let aux=data.array.map((element)=>element)

console.log(aux, Array.isArray(aux)); // Output: [1, 2, 3, 4, 5] true
console.log(aux.length);              // Output: 5

    console.log(aux, typeof(aux))
    for(let i=0;i<aux.length;i++){
        str+= `'${aux[i]}',`
    }
    str+=`'${aux[aux.length-1]}'`
    console.log('str',str)
    let string = `select update_status_true(array[${str}])`
    return string
    
}