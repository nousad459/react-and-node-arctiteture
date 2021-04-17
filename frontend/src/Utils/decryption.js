import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY;

 /***
   * This function will use for Decryption, If str will empty, It will be Redirect on Login page
   * ** */
export function decryption(str) {
  let res = str ? str.split("=") : (window.location.href = "/");
  if (str !== "") {
    return res[1];
  } else {
    return null;
  }
}


 /***
   * This function will use for Encryption
   * ** */
export function encryption(str) {
  if (str !== "") {
    let passEncrypt = CryptoJS.AES.encrypt(str, secretKey).toString();
    return passEncrypt;
  } else {
    return null;
  }
}
