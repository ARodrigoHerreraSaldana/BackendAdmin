import { decryptTheData } from "./decrypt.js"
export function registerUser(data){
    let parseddata=JSON.parse(decryptTheData(data))
    let string = `CALL registerUser('${parseddata.firstName}','${parseddata.lastName}','${parseddata.occupation}','${parseddata.email}','${parseddata.password}')`
    return string
    
}