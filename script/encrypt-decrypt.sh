# STEP 1: create your own key pair, then provide the userid.
gpg --gen-key

# STEP 2: try encrypting a file
- Encrypting sample.pdf and save as encrypted-gpg-sample.pdf.gpg with public key
- The file will be only decrypted with the application private key.
gpg --output outputs/encrypted-gpg-sample.pdf.gpg --encrypt --recipient <USER_ID> samples/sample.pdf

# STEP 3: try decrypting the file
- Using the private key to decrypt the file
gpg --output outputs/decrypted-gpg-sample.pdf --decrypt outputs/encrypted-gpg-sample.pdf.gpg