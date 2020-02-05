export interface UserInfo {    
    userId?: number
    email: string
    name?: string
    password?: string
    img?: string
    category1?: number[]
    category2?: number[]
}

export interface TokenInfo {
    sub: string,
    exp: number,
    user: UserInfo,
    second: string,
}