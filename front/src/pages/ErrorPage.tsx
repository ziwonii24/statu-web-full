import React, { FunctionComponent } from 'react'
import ErrorForm from '../components/Error/ErrorForm'
import useWindowSize from '../hooks/useWindowSize'

const ErrorPage: FunctionComponent = () => {
    const { width } = useWindowSize()
    const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')
    return (
        <div className={bodyMargin}>
            <ErrorForm />
        </div>
    )
}

export default ErrorPage