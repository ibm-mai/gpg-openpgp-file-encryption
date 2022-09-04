const fs = require('fs')
const path = require('path')
const openpgp = require('openpgp')

const encrypt = async (inputFilePath, outputFilePath) => {
  console.log(`[Encrypt] ${path.resolve(inputFilePath)}`)
  // get public key in armored format
	const publicKeyArmored = process.env.PUBLIC_KEY;

  try {
    // read file from inputFilePath
    const data = fs.readFileSync(path.resolve(inputFilePath))

    // read public key
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })

    // create message from file binary data
    const message = await openpgp.createMessage({ binary: data })

    // encrypt the file (binary data)
    const encryptedData = await openpgp.encrypt({
      message: message, // input as Message object
      encryptionKeys: publicKey,
      format: 'binary'
    });

    console.log(`Writing to: ` + path.join(outputFilePath, inputFilePath.split('/')[1] + '.gpg'))
    fs.writeFileSync(path.resolve(outputFilePath, inputFilePath.split('/')[1] + ".gpg"), encryptedData)
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = encrypt