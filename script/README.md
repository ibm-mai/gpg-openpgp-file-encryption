# How to use script
1. symmetric-encrypt.sh -> use AES256 algorithm with passphrase

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