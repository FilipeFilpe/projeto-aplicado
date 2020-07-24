import crypto from 'crypto'

enum DADOS_CRIPTOGRAFAR {
  Algoritimo = "aes256",
  Codificacao = "utf8",
  Segredo = "chaves",
  Tipo = "hex"
}

const createHas = ( value: string ) => crypto.createHash('md5').update(value).digest('hex')

export class PasswordCrypto {
  constructor(password: string) {
    this.password = password
  }

  private password: string 
    
  criptografar(): string {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.Algoritimo, DADOS_CRIPTOGRAFAR.Segredo)
    cipher.update(this.password)
    return cipher.final('hex')
  }
 
  descriptografar(): Buffer {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.Algoritimo, DADOS_CRIPTOGRAFAR.Segredo)
    decipher.update(this.password, 'hex')
    return decipher.final()
  }
}