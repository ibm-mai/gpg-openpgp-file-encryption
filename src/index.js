const encrypt = require('./functions/asymmetric/encrypt')
const decrypt = require('./functions/asymmetric/decrypt')
const symmetric_decrypt = require('./functions/symmetric/decrypt')
const symmetric_encrypt = require('./functions/symmetric/encrypt')
const path = require('path')
require('dotenv').config()

async function main() {
  // LAB01: use public key to encrypt sample.pdf and decrypt it using private key
  // ======
  // await encrypt('samples/sample.pdf', 'outputs')
  // await decrypt('outputs/sample.pdf.gpg', 'outputs')

  // LAB02: use gpg to encrypt the sample.jpg and decrypt it using node openpgp
  // =====
  // STEP 1: run `gpg --output outputs/gpg-sample.jpg.gpg --encrypt --recipient serenade samples/sample.jpg`
  // await decrypt('outputs/gpg-sample.jpg.gpg', path.resolve('outputs'))

  // SYMMETRIC DECRYPTION
  // await symmetric_encrypt('samples/sample.jpg', path.resolve('outputs'))
  // await symmetric_decrypt('outputs/sample.jpg.gpg', path.resolve('outputs'))
}

main()