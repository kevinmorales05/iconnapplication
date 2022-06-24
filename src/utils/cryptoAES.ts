import CryptoJS from 'crypto-js';
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const cryptoAES = (msg: string, secret: string): string => {
  console.log('msg =======================> ', msg);
  console.log('secret =============================> ', secret);

  const hashedSecret = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(secret));
  const key = CryptoJS.enc.Hex.parse(
    hashedSecret.toString(CryptoJS.enc.Hex).substr(0, 32)
  );

  const encryptor = CryptoJS.AES.encrypt(msg, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  const ciphermsg = encryptor.ciphertext.toString(CryptoJS.enc.Base64);
  console.log('msgHashed ===============================================> ', ciphermsg);
  return ciphermsg;
};

const getSecretKey = () => {
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 20; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("SECRETKEY GENERATED: "+result);
  return result;
}

export { getSecretKey };
export default cryptoAES;
