import React, { useEffect, useMemo } from 'react'
import MyPage from '../components/MyPlan/MyPlan'
import { RouteComponentProps } from 'react-router-dom'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

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