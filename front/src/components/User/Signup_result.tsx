import React, { FunctionComponent} from 'react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const signup_result : FunctionComponent = () => {
    return (
        <div>
            <h1>환영합니다!</h1>
            이메일인증을 성공적으로 마쳤습니다!
        </div>
    )
}

export default signup_result