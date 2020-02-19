import React, { useMemo } from 'react'
import MyPage from '../components/MyPlan/MyPlan'
import { RouteComponentProps } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'

const PlanPage = (props: RouteComponentProps<{ userName: string }>) => {
  const userName  = props.match.params.userName
  const { width } = useWindowSize()
  const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')

  const myPage = useMemo(() => 
    <MyPage 
      userName={userName}
    />, [userName])

  return <div className={bodyMargin}>{myPage}</div>
}

export default PlanPage