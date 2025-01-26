import { readFileSync } from 'fs';
import { publicEncrypt ,privateDecrypt } from "crypto";
import {fileURLToPath} from 'url';
import path from 'path';
import { __dirname } from '../dirname.js';
// otherFile.js
import '../config.js';

const publicKeyBase64 = process.env.PUBLIC_KEY;

const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');

const obj = {
    firstName: "John",
    lastName: "Doe",
    occupation: "Developer",
    password: "supersecurepassword123",
    email: "john.differentemail@example.com"
};

// // console.log(obj)
// // console.log(process.env.)


export const encryptTheData = function(data)
{
    let encryptedData = publicEncrypt(publicKey, Buffer.from(data))
    console.log('encrypted data is', encryptedData.toString('base64')); // Print the encrypted data in base64 format
    return encryptTheData
}

encryptTheData(JSON.stringify(obj))