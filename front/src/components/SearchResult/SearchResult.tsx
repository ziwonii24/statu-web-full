import React, { FunctionComponent, useMemo } from 'react'
import CalendarInfo from './CalendarInfo'
import useSchedule from '../../hooks/useSchedule'
import useWindowSize from '../../hooks/useWindowSize'
import NoResultForm from '../Error/NoResultForm'

interface Interface {
  query: string
}

const SearchResult: FunctionComponent<Interface> = (props: Interface) => {
  const { query } = props
  const { getMainSchedules } = useSchedule()
  const { width } = useWindowSize()

  const SearchMainScheduleResults = useMemo(() => {
    return getMainSchedules.filter(schedule =>
      schedule.pb && (schedule.title.includes(query)
        || schedule.tags.map(tag => tag.includes(query)).includes(true)
        || schedule.category1?.map(category => category.includes(query)).includes(true)
        || schedule.category2?.map(category => category.includes(query)).includes(true)
      ))
  }, [getMainSchedules])

  return (
    <div className={`SearchResult`}>
      {SearchMainScheduleResults.length !== 0 ?
        SearchMainScheduleResults.sort(function (a, b) {
          if (a.recommend > b.recommend) return -1
          else if (a.recommend === b.recommend && a.view >= b.view) return -1
          else return 1
        })
          .map((schedule, index) => {
            // onSetTargetUserInfo(schedule.id)
            return (
              <div
                key={schedule.id}
                // widthSize: 'XL' >= 1200 > 'LG' >= 992 > 'MD' >= 768 > 'SM' >= 576 > 'XS'
                className="card-single"
                style={{
                  width: `${width >= 800 ? 100 / 4 : (width >= 400 ? 100 / 2.2 : 100)}vw`,
                  border: 'black'
                }}
              >
                <CalendarInfo
                  mainSchedule={schedule}
                />
              </div>
            )
          })
        :
        <NoResultForm />
      }
    </div>
  )
}

export default SearchResult