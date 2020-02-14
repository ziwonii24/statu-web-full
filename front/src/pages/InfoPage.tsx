import React, { FunctionComponent } from 'react'
import StatuInfoForm from '../components/Info/StatuInfoForm'
import TeamInfo from '../components/Info/TeamInfoForm'

const InfoPage: FunctionComponent = () => {
    return (
        <>
            <StatuInfoForm />
            <TeamInfo />
        </>
    )
}

export default InfoPage