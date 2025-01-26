import { readFileSync } from 'fs';
import { publicEncrypt ,privateDecrypt } from "crypto";
import {fileURLToPath} from 'url';
import path from 'path';
import { __dirname } from './dirname.js';

const publickKeyPath = path.resolve(__dirname, '..', 'public.pem');
console.log(publickKeyPath)


const publicKey = readFileSync(publickKeyPath, 'utf-8');

const obj = {
    firstName: "John",
    lastName: "Doe",
    occupation: "Developer",
    password: "supersecurepassword123",
    email: "john.differentemail@example.com"
};

console.log(obj)

export const encryptTheData = function(data)
{
    let encryptedData = publicEncrypt(publicKey, Buffer.from(data))
    console.log('encrypted data is', encryptedData.toString('base64')); // Print the encrypted data in base64 format
    return encryptTheData
}

encryptTheData(JSON.stringify(obj))