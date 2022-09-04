# gpg-openpgp-file-encryption
Example of using gpg and openpgp to encrypt files

## Installation method
Mac Installation
```
brew install gnupg
```

## Getting Started
Step to test locally
```
# STEP 1: create your own key pair, then provide the userid.
gpg --gen-key

# STEP 2: list your public key
gpg --list-keys

# STEP 3: export public key
gpg --armor --output my-public-key.gpg --export <USER_ID>
// or
gpg  --armor --export <USER_ID>  > my-public-key.gpg

# STEP 4: try encrypting a file
- Encrypting to filenamed sample.pdf.gpg with public key of the application
- The file will be only decrypted with the application private key.
gpg --output outputs/encrypted-gpg-sample.pdf.gpg --encrypt --recipient <USER_ID> samples/sample.pdf

# STEP 5: try decrypting the file
- Using the private key to decrypt the file
gpg --output outputs/decrypted-gpg-sample.pdf --decrypt outputs/encrypted-gpg-sample.pdf.gpg
```

### Tips:
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