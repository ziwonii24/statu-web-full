import React, { FunctionComponent, useMemo } from 'react'
import CalendarInfo from './CalendarInfo'
import useSchedule from '../../hooks/useSchedule'
import useWindowSize from '../../hooks/useWindowSize'

interface Interface {
  query: string
}

const SearchResult: FunctionComponent<Interface> = (props: Interface) => {
  console.log('SearchResult')
  const { query } = props
  const { mainSchedule } = useSchedule()

  const { width } = useWindowSize()

  const SearchMainScheduleResults = useMemo(() => {
    console.log('filter', mainSchedule)
    return mainSchedule.filter(schedule => 
      schedule.title.includes(query) 
      || schedule.tags.includes(query) 
      || schedule.category1?.includes(query) 
      || schedule.category2?.includes(query)
    )
  }, [mainSchedule])
  
  return (
    <div className={`SearchResult`}>
    { SearchMainScheduleResults && SearchMainScheduleResults.map(schedule => {
      return (
        <div
          key={schedule.id}
          // widthSize: 'XL' >= 1200 > 'LG' >= 992 > 'MD' >= 768 > 'SM' >= 576 > 'XS'
          className={`SearchResult`}
          style={{width: `${width >= 992 ? 100/3 : (width >= 768 ? 100/2 : 100)}vw`}}
        >
           <CalendarInfo
            mainSchedule={schedule}
          />
        </div>
      )
    })}
    </div>
  )
}

export default SearchResult