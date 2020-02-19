import React, { FunctionComponent } from 'react'
import StatuInfoForm from '../components/Info/StatuInfoForm'
import StatuDetailInfoForm from '../components/Info/StatuDetailInfoForm'
import TeamInfo from '../components/Info/TeamInfoForm'
import useWindowSize from '../hooks/useWindowSize'

const InfoPage: FunctionComponent = () => {
    const { width } = useWindowSize()
    const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')
    return (
        <div className={bodyMargin}>
            <StatuInfoForm />
            <StatuDetailInfoForm />
            <TeamInfo />
        </div>
    )
}

export default InfoPage