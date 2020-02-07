export interface UserInfo {    
    id: number
    email: string
    name: string
    img?: string
    category1: string[]
    category2: string[],
    statusCode: string,
}

export interface UserInput {    
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