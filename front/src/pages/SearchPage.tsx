import React from 'react'
import SearchResult from '../components/SearchResult'
import { RouteComponentProps } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'

const SearchPage = (props:RouteComponentProps<{ query: string }>) => {
  const query = props.match.params.query
  const { width } = useWindowSize()
  const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')

  return <div className={bodyMargin}><SearchResult query={query} /></div> 
}
export default SearchPage