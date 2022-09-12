const fs = require('fs')
const path = require('path')
const openpgp = require('openpgp')

const symmetric_encrypt = async (inputFilePath, outputFilePath) => {
  console.log(`[Encrypt] ${path.resolve(inputFilePath)}`)

  try {
    // read file from inputFilePath
    const data = fs.readFileSync(path.resolve(inputFilePath))

    // create message from file binary data
    const message = await openpgp.createMessage({ binary: data })

    // encrypt the file (binary data)
    const encryptedData = await openpgp.encrypt({
      message: message, // input as Message object
      passwords: process.env.PASSWORD,
      format: 'binary'
    });

    console.log(`Writing to: ` + path.join(outputFilePath, inputFilePath.split('/')[1] + '.gpg'))
    fs.writeFileSync(path.join(outputFilePath, path.basename(inputFilePath) + '.gpg'), encryptedData)
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = symmetric_encrypt