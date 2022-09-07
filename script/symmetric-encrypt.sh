#!/bin/bash

FOLDER_PATH=$2
DESTINATION_SHARE_PATH=$3

while [ True ]; do
if [ "$1" = "--copy-to-s3" -o "$1" = "-cp" ]; then
    echo "Copy file to SMB share named: $DESTINATION_SHARE_PATH"
    cp -r encrypted_files/"$FOLDER_PATH" "$DESTINATION_SHARE_PATH"
    shift 1
else
    break
fi
done

ARG=( "${@}" )
for i in ${ARG[@]}; do
  echo $i
done

GPG_TTY=$(tty)
export GPG_TTY

echo "Path to folder for encrypting file: $FOLDER_PATH"
echo "Path to folder to copy to SMB share: $DESTINATION_SHARE_PATH"

mkdir -p encrypted_files

encrypt() {
  find "$FOLDER_PATH" -type f -print0 | while IFS= read -r -d $'\0' FILE; 
  do echo "[Encrypting] $FILE";
    gpg --symmetric --cipher-algo AES256 --passphrase serenadefamily --pinentry-mode loopback $FILE
  done
}

copy_gpg_to_destination () {
  find "$FOLDER_PATH"/ -name '*.gpg' -exec rsync -R {} encrypted_files \;
}

encrypt
copy_gpg_to_destination