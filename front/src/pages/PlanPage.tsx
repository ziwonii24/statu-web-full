import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

const PlanPage = (props: RouteComponentProps<{userName: string}>) => {

    // 넘어온 유저네임에 따라 계획표 넘기기

    return (
        // <MyPage />
        <div>
            {props.match.params.userName}
        </div>
    )
}

export default PlanPage