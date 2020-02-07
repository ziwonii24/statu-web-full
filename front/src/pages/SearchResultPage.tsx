import React, { useMemo } from 'react'
import SearchResult from '../components/SearchResult'
import { RouteComponentProps } from 'react-router-dom'

const SearchResultPage = (props:RouteComponentProps<{ query: string }>) => {
  console.log('SearchResultPage')
  const query = props.match.params.query

  return <SearchResult query={query} />
}
export default SearchResultPage