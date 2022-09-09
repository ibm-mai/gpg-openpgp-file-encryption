#!/bin/bash

while [ True ]; do
if [ "$1" = "--passphrase" -o "$1" = "-ps" ]; then
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

echo "Path to folder for encrypting file: $FOLDER_PATH"
echo "Path to folder to copy to SMB share: $DESTINATION_SHARE_PATH"

encrypt() {
  find "$FOLDER_PATH" -type f -print0 | while IFS= read -r -d $'\0' FILE; 
  do echo "[Encrypting] $FILE";
    gpg --symmetric --cipher-algo AES256 --passphrase "$PASSPHRASE" --batch $FILE
  done
}

copy_gpg_to_destination () {
  echo "Copy to destination path $DESTINATION_SHARE_PATH"
  find "$FOLDER_PATH"/ -name '*.gpg' -exec rsync -R -a {} "$DESTINATION_SHARE_PATH" \;
}

## on-prem Red Hat 
## on-prem GNUPG 2.0.22
encrypt
copy_gpg_to_destination