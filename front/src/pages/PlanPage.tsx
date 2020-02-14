import React, { useMemo } from 'react'
import MyPage from '../components/MyPlan/MyPlan'
import { RouteComponentProps } from 'react-router-dom'

const PlanPage = (props: RouteComponentProps<{ userName: string }>) => {
  
  const userName  = props.match.params.userName

  const myPage = useMemo(() => 
    <MyPage 
      userName={userName}
    />, [userName])

  return myPage
}

export default PlanPage