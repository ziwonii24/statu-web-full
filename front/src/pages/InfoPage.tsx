import React, { FunctionComponent } from 'react'
import StatuInfoForm from '../components/Info/StatuInfoForm'
import StatuDetailInfoForm from '../components/Info/StatuDetailInfoForm'
import TeamInfo from '../components/Info/TeamInfoForm'

const InfoPage: FunctionComponent = () => {
    return (
        <>
            <StatuInfoForm />
            <StatuDetailInfoForm />
            <TeamInfo />
        </>
    )
}

export default InfoPage