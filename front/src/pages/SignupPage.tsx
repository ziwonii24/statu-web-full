import React, { FunctionComponent } from 'react'
import SignupForm from '../components/User/SignupForm'
import useWindowSize from '../hooks/useWindowSize'

const SignupPage: FunctionComponent = () => {
    const { width } = useWindowSize()
    const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')
    return (
        <div className={bodyMargin}>
            <SignupForm />
        </div>
    )
}

export default SignupPage