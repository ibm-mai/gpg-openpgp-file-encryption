# GPG and OpenPGP File Encryption
Example of using gpg and openpgp to encrypting/decrypting files.

- [GPG and OpenPGP File Encryption](#gpg-and-openpgp-file-encryption)
  - [Installation method](#installation-method)
  - [Getting Started with GPG](#getting-started-with-gpg)
  - [Getting Started with Node OpenPGP](#getting-started-with-node-openpgp)
## Installation method
Mac Installation
```
brew install gnupg
```

## Getting Started with GPG
Step to gpg command locally
1. Create your own key pair, and provide the userid.
```
gpg --gen-key
```
2. Try encrypting a file
- Encrypting sample.pdf and save as encrypted-gpg-sample.pdf.gpg with public key
- The file will be only decrypted with the application private key.
```
gpg --output outputs/encrypted-gpg-sample.pdf.gpg --encrypt --recipient <USER_ID> samples/sample.pdf
```

3. Try decrypting the file
- Using the private key to decrypt the file
```
gpg --output outputs/decrypted-gpg-sample.pdf --decrypt outputs/encrypted-gpg-sample.pdf.gpg
```

Tips:
Exporting public key and private key
note: --armor refers to output in ascii format
```
# Public Key
gpg --list-keys
gpg --armor --output my-public-key.gpg --export <USER_ID>
// or
gpg --armor --export <USER_ID> > my-private-key.gpg 
```

```
# Private Key
gpg --list-secret-keys
gpg --armor --output my-private-key.gpg --export-secret-key <USER_ID>
// or
gpg --armor --export-secret-key <USER_ID> > my-private-key.gpg 
```

## Getting Started with Node OpenPGP
1. Install dependencies
```
npm install
```

2. The example of encryption/decryption will be provided in `src/index.js`
```
npm start
```