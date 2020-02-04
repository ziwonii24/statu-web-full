export const login = (token: string) => {
    console.log('token: ', token)
    localStorage.setItem('token', token)
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const getToken = () => {
    try {
        // 여기서 만료되었는지 체크를 해야하나?
        return localStorage.getItem('token')
    } catch(e) {
        // 토큰 없을 경우 처리
        return null
    }
}