import { readFileSync } from 'fs';
import { privateDecrypt } from "crypto";
import path from 'path';
import { __dirname } from './dirname.js';

const privateKeyPath = path.resolve(__dirname, '..', 'private.pem');
console.log(privateKeyPath)

const privateKey = readFileSync(privateKeyPath, 'utf-8');


export const decryptTheData = function(data)
{
    let decryptedData = privateDecrypt(privateKey, Buffer.from(data, 'base64'));
    console.log(decryptedData.toString()); // Print the decrypted data
    return decryptedData.toString()
}

decryptTheData('IS381bZeMUScq1Vec0VEQDm6h9NbQ/SFNzJ4MiqBGNWGF9iaJY774eBWLfBlMtU85RyC7a14cXl/IzPnvavSUqoRzL9ojdYVSXmSpbkwA8y62Wq1SmYsZmkaJIwks8tWs2FnSbfSf9Tk4HK+p/uKssZXFSmtoQsZEyiGDT3FJ17/n3RQH1iZF411VSvamIRAM6fRV3lk5gDUoAzWHrvatMxhIalRWiYzMg92cFF9rBAE1SjfTuccbo1y2mCjCYcnFg/fbIwxIAKSnG9kb4b5RnhfxyiAFQkwmRRqa4OPj18ObTPDt3E5OvZrN5uzqTE9zenyLSkr1ce9CqaMcd8Qm23Fb8jGLQztNQb6AJHdz5zwnnTv0Z/cRquKhcLBm8ncJIVeUQ9+4jNEvnXlExbwbkjfhp2ivgo/cssT/MwNoOUi7Sf24f5hrdMpTdkQ+gjZoSFzJLi7ERsCg2+o5QVSUUVKmoH0eFipP7UKs56dE3/Qktl4y/MX0zaE6XKE6RmEBobTQVWM2Ol5Prz3j4MDuF8Wl/6ysiyHIXAsS2qJDQehcXuTJQpvmYrtFsUkKsthZIiLFLY2Tz3dTC+tJs8LGnZsbowd52maoL0/dbFSSJ3JF5X0IKaSjiR/Q2twj9UOA79GAmsJOxlbgwjoJljg2ddDh6bCqaxJDtIGbCFbzbA=')
