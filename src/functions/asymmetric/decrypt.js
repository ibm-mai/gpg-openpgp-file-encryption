const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
const fs = require('fs')
const path = require('path')

const decrypt = async (inputFilePath, outputFilePath) => {
  console.log(`[Decrypt] ${path.resolve(inputFilePath)}`)
  // get private key in armored format
  const privateKeyArmored = process.env.PRIVATE_KEY; // get encrypted private key

  try {
    // read the encrypted data
    const encryptedData = fs.readFileSync(path.resolve(inputFilePath))

    // read message from encrypted data
    const message = await openpgp.readMessage({ binaryMessage: encryptedData})

    // read private key
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored})

    // decrypt the message with private key
    const decryptedData = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey,
      format: 'binary'
    });

    const newFileName = path.basename(inputFilePath).replace('.gpg', '')
    console.log(`Writing to: ` + path.join(outputFilePath, newFileName))
    fs.writeFileSync(path.join(outputFilePath, newFileName), decryptedData.data)
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = decrypt