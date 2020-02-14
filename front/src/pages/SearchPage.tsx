import React from 'react'
import SearchResult from '../components/SearchResult'
import { RouteComponentProps } from 'react-router-dom'

const SearchPage = (props:RouteComponentProps<{ query: string }>) => {

  const query = props.match.params.query

  return <SearchResult query={query} />
}
export default SearchPage