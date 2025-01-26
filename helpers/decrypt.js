import { readFileSync } from 'fs';
import { privateDecrypt } from "crypto";
import path from 'path';
import { __dirname } from '../dirname.js';
import '../config.js';

const privateKeyBase64 = process.env.PRIVATE_KEY
const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8').replace(/\\n/g, '\n');


export const decryptTheData = function(data)
{
    let decryptedData = privateDecrypt(privateKey, Buffer.from(data, 'base64'));
    console.log(decryptedData.toString()); // Print the decrypted data
    return decryptedData.toString()
}

decryptTheData('AzmtvlHt0H9kjCLrZkbRQ8der3mUr/5TyZbbHbvOGKE+MgQxb0BXNYxKW8ZL/vYCsImKrFQdTEs16FYgNICPl2kAqRZhgBSaZJ7nUO/C6KGERJ73y6GcCzGRt01r/mkWYOXUdq53qiAbxeSNgl94sjDCJgF0US3eXZ1o7j29TCuRxvMhb/34gzPz6c/3DbzRnyc1juJH20kOOSX2gpWTqIWgbWgxan9J/b95+21OY1/BOhlOpHxJpvW9FZb7ndH1I/ATRH6grKkhQCKNaY2WhCRSiasp/zBzNIEkR3Xy5fqSm0XUOncNboU1S9LFIW2Xn+MDqDz/nfTLMbzfS3O+t9AZG3zRw0HV6azyACfQ2wa581logORNQAxvdRSyOtrfH0hn1Ns9hZn8zREwuRNushfcIpG4aESeVjovSK1bWLClbnFJRSg1hTxrhomfel+zmNbCkJw42psAXM5CtqATaazo52RCKsB6xlTUWmVl8MrD9oI17H/BFI6nbgLgDT1mKIBQAQnu7g1vn0GX73UsKDShRt4TR5bSy/TW5di+MlC8QnGInoniwSFMySzEKrBrh26yDYIV0krPwK/ksN26oFEieGu44hyR/8nk+Wz3F4DJHFRwQjOaRXcUH4PyP02zqZ3QAx+edgnnneNLgxygmuAZnYmVjylHoCo2fUZkgeI=')
