#!/bin/bash

while [ True ]; do
if [ "$1" = "--passphase" -o "$1" = "-ps" ]; then
    PASSPHRASE=$2
    FOLDER_PATH=$3
    DESTINATION_SHARE_PATH=$4
    shift 2
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

encrypt() {
  find "$FOLDER_PATH" -type f -print0 | while IFS= read -r -d $'\0' FILE; 
  do echo "[Encrypting] $FILE";
    gpg --symmetric --cipher-algo AES256 --passphrase "$PASSPHRASE" --pinentry-mode loopback $FILE
  done
}

copy_gpg_to_destination () {
  find "$FOLDER_PATH"/ -name '*.gpg' -exec rsync -R {} "$DESTINATION_SHARE_PATH" \;
}

encrypt
copy_gpg_to_destination