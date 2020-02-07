import React, { useMemo } from 'react'
import MyPage from '../components/MyPlan/MyPlan'
import { RouteComponentProps } from 'react-router-dom'


const PlanPage = (props: RouteComponentProps<{ userName: string }>) => {
  console.log('PlanPage')

  // 넘어온 유저네임에 따라 계획표 넘기기
  const userName  = props.match.params.userName

  const myPage = useMemo(() => 
    <MyPage 
      userName={userName}
    />, [userName])

  return myPage
}

export default PlanPage