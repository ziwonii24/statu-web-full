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
    category1?: string[]
    category2?: string[]
}

export interface TokenInfo {
    sub: string,
    exp: number,
    user: UserInfo,
    second: string,
}

export interface CategoryData {
    id: number,
    name: string,
    category2s: [
        {
            id: number,
            name: string,
        }
    ]
}