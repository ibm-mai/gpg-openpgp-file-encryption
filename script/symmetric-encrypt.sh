#!/bin/bash

while [ True ]; do
if [ "$1" = "--copy-to-s3" -o "$1" = "-cp" ]; then
    ENABLE_COPY_TO_S3=$1
    PASSPHRASE=$3
    FOLDER_PATH=$4
    DESTINATION_SHARE_PATH=$5
    shift 1
elif [ "$1" = "--passphase" -o "$1" = "-ps" ]; then
    PASSPHRASE=$2
    FOLDER_PATH=$3
    DESTINATION_SHARE_PATH=$4
    shift 2
else
    break
fi
done

# ARG=( "${@}" )
# for i in ${ARG[@]}; do
#   echo $i
# done

GPG_TTY=$(tty)
export GPG_TTY

echo "Path to folder for encrypting file: $FOLDER_PATH"
echo "Path to folder to copy to SMB share: $DESTINATION_SHARE_PATH"

mkdir -p encrypted_files

encrypt() {
  find "$FOLDER_PATH" -type f -print0 | while IFS= read -r -d $'\0' FILE; 
  do echo "[Encrypting] $FILE";
    gpg --symmetric --cipher-algo AES256 --passphrase "$PASSPHRASE" --pinentry-mode loopback $FILE
  done
}

copy_gpg_to_destination () {
  find "$FOLDER_PATH"/ -name '*.gpg' -exec rsync -R {} encrypted_files \;
  if [ "$ENABLE_COPY_TO_S3" = "--copy-to-s3" -o "$ENABLE_COPY_TO_S3" = "-cp" ]; then
    echo "Copy file to [$DESTINATION_SHARE_PATH] = enabled"
    echo "Copy file to SMB share named: $DESTINATION_SHARE_PATH"
    cp -r encrypted_files/"$FOLDER_PATH" "$DESTINATION_SHARE_PATH"
  else
    echo "Copy file to [$DESTINATION_SHARE_PATH] = disabled"
  fi
}

# encrypt
copy_gpg_to_destination