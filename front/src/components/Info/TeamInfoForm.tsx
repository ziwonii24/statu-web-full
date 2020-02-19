import React, { FunctionComponent } from 'react'

import teamLogo from '../../img/민수팀로고.png'

const TeamInfo: FunctionComponent = () => {
    return (
        <div className='teamInfo-template'>
            <img className='team-logo' src={teamLogo} alt="temaLogo"/>
            <div className='team'>
                <div>KIM MIN SU</div>
                <div>KIM YEONG YEON</div>
                <div>KIM JEONG</div>
                <div>CHO SUNG WON</div>
                <div>CHOI JI WON</div>
            </div>
        </div>
    )
}

export default TeamInfo