const openpgp = require('openpgp'); // use as CommonJS, AMD, ES6 module or via window.openpgp
const fs = require('fs')
const path = require('path')

const symmetric_decrypt = async (inputFilePath, outputFilePath) => {
  console.log(`[Decrypt] ${path.resolve(inputFilePath)}`)

  try {
    // read the encrypted data
    const encryptedData = fs.readFileSync(path.resolve(inputFilePath))

    // read message from encrypted data
    const message = await openpgp.readMessage({ binaryMessage: encryptedData })

    // decrypt the message with private key
    const decryptedData = await openpgp.decrypt({
      message: message,
      passwords: process.env.PASSWORD,
      format: 'binary'
    });

    const newFileName = path.basename(inputFilePath).replace('.gpg', '')
    console.log(`Writing to: ` + path.join(outputFilePath, newFileName))
    fs.writeFileSync(path.join(outputFilePath, newFileName), decryptedData.data)
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = symmetric_decrypt