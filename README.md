# Asymmetric Encryption
## GPG and OpenPGP File Encryption
Example of using gpg and openpgp to encrypting/decrypting files.

- [Asymmetric Encryption](#asymmetric-encryption)
  - [GPG and OpenPGP File Encryption](#gpg-and-openpgp-file-encryption)
    - [Installation method for GPG](#installation-method-for-gpg)
    - [Getting Started with GPG](#getting-started-with-gpg)
    - [Exporting Public Key and Private Key](#exporting-public-key-and-private-key)
      - [Exporting public key](#exporting-public-key)
      - [Exporting private key](#exporting-private-key)
    - [Getting Started with Node OpenPGP](#getting-started-with-node-openpgp)
- [Symmetric Encryption](#symmetric-encryption)
  - [Use GPG to encrypt files](#use-gpg-to-encrypt-files)
    - [Example Script](#example-script)
### Installation method for GPG
Mac Installation
```
brew install gnupg
```

### Getting Started with GPG
Step to gpg command locally
1. Create your own key pair, and provide the userid.
```
gpg --gen-key
```
2. Try encrypting a file
- Encrypting sample.pdf and save as encrypted-gpg-sample.pdf.gpg with public key
- The can only be decrypted with the application private key.
```
gpg --output outputs/encrypted-gpg-sample.pdf.gpg --encrypt --recipient <USER_ID> samples/sample.pdf
```

3. Try decrypting the file
- Using the private key to decrypt the file
```
gpg --output outputs/decrypted-gpg-sample.pdf --decrypt outputs/encrypted-gpg-sample.pdf.gpg
```

### Exporting Public Key and Private Key
note: --armor refers to output in ascii format
#### Exporting public key
```
gpg --list-keys
gpg --armor --output key/my-public-key.gpg --export <USER_ID>
// or
gpg --armor --export <USER_ID> > key/my-private-key.gpg 
```
#### Exporting private key
```
gpg --list-secret-keys
gpg --armor --output key/my-private-key.gpg --export-secret-key <USER_ID>
// or
gpg --armor --export-secret-key <USER_ID> > key/my-private-key.gpg 
```

### Getting Started with Node OpenPGP
1. Install dependencies
```
npm install
```

2. The example of encryption/decryption will be provided in `src/index.js`
```
npm start
```
# Symmetric Encryption
## Use GPG to encrypt files
### Example Script
1. [symmetric-encrypt.sh](https://github.com/ibm-mai/gpg-openpgp-file-encryption/blob/main/script/symmetric-encrypt.sh) -> use AES256 algorithm with passphrase

**General Usage**
```
$ script/symmetric-encrypt.sh --passphrase <YOUR_PASSPHRASE> <SOURCE_FOLDER>
```
Note:
1. Provide your passphrase(like password)
2. The result of encryption will be at ./encrypted_files/<SOURCE_FOLDER>

**Example**
```
$ script/symmetric-encrypt.sh -ps serenadefamily aws_path new
```

**Automatically copy to new folder**
```
$ script/symmetric-encrypt.sh --passphrase <YOUR_PASSPHRASE> <SOURCE_FOLDER> <DESTINATION_FOLDER>
```

**Example**
```
$ script/symmetric-encrypt.sh --passphrase <YOUR_PASSPHRASE> aws_path /s3share
```