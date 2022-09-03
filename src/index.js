const decrypt = require('./functions/decrypt')

async function main() {
  await decrypt('../outputs/sample.pdf.gpg')
  
}

main()