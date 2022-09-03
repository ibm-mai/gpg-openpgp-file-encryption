const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const decrypt = async (filepath) => {
    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    const publicKeyArmored = process.env.PUBLIC_KEY
  
    const privateKeyArmored = process.env.PRIVATE_KEY; // encrypted private key
    const passphrase = `yourPassphrase`; // what the private key is encrypted with

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    console.log(publicKey)

    const encryptedData = fs.readFileSync(path.join(__dirname, '../', filepath));
    console.log(typeof encryptedData)
    console.log(encryptedData)

    const message = await openpgp.readMessage({ binaryMessage: encryptedData})

    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored})

    console.log(message)
    const decryptedData = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey
    });

    fs.writeFileSync(path.join(__dirname, '../../', 'outputs/decrypted-openpgp-sample.pdf'), decryptedData.data)


    // const encrypted = await openpgp.encrypt({
    //     message: await openpgp.createMessage({ text: 'Hello, World!' }), // input as Message object
    //     encryptionKeys: publicKey,
    //     signingKeys: privateKey // optional
    // });
    // console.log(encrypted); // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

    // const message = await openpgp.readMessage({
    //     armoredMessage: encrypted // parse armored message
    // });
  
    // console.log(decrypted); // 'Hello, World!'
    // // check signature validity (signed messages only)
    // try {
    //     await signatures[0].verified; // throws on invalid signature
    //     console.log('Signature is valid');
    // } catch (e) {
    //     throw new Error('Signature could not be verified: ' + e.message);
    // }
};

module.exports = decrypt