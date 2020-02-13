import jwt_decode from 'jwt-decode';
import { TokenInfo, GoogleTokenInfo } from './interfaces/UserInfo.interface'


export const decode = (token: string) => {
    const tokenDecoded: TokenInfo = jwt_decode(token);
    return tokenDecoded
}

export const decode_google = (token: string) => {
    const tokenDecoded: GoogleTokenInfo = jwt_decode(token);
    return tokenDecoded
}

export const login = (token: string) => {
    localStorage.setItem('token', token)
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const getToken = () => {
    return localStorage.getItem('token')
}