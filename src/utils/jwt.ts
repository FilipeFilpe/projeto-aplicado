import jwt from 'jsonwebtoken'

const secret = '123456'

export const verify = (token: string) => jwt.verify(token, secret)
export const sign = (payload: string) => jwt.sign(payload, secret)