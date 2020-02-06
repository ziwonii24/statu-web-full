import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/Nav/NavBar'
import MainPage from '../pages/MainPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import UpdateUserInfoPage from '../pages/UpdateUserInfoPage'
import PlanPage from '../pages/PlanPage'
import ImportedPlanPage from '../pages/ImportedPlanPage'
import SearchResultPage from '../pages/SearchResultPage'
import CommunityPage from '../pages/CommunityPage'
import DetailPage from '../pages/DetailPage'

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/userinfo" component={UpdateUserInfoPage} />
      <Route path="/plan/:userName" component={PlanPage} />
      <Route path="/importedplan" component={ImportedPlanPage} />
      <Route path="/search/:query" component={SearchResultPage} />
      <Route path="/community" component={CommunityPage} />
      <Route path="/detail/:planId" component={DetailPage} />
    </Switch>
  </div>
)

export default routes