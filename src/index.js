const encrypt = require('./functions/encrypt')
const decrypt = require('./functions/decrypt')
const path = require('path')
require('dotenv').config()

async function main() {
  // LAB01: use public key to encrypt sample.pdf and decrypt it using private key
  // ======
  await encrypt('samples/sample.pdf', path.resolve('outputs'))
  await decrypt('outputs/sample.pdf.gpg', path.resolve('outputs'))

  // LAB02: use gpg to encrypt the sample.jpg and decrypt it using node openpgp
  // =====
  // STEP 1: run `gpg --output outputs/gpg-sample.jpg.gpg --encrypt --recipient serenade samples/sample.jpg`
  // await decrypt('outputs/gpg-sample.jpg.gpg', path.resolve('outputs'))
}

main()