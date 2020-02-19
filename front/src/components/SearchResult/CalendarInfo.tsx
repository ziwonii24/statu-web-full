import React, { FunctionComponent } from 'react'
import { MainSchedule } from '../../store/schedule'
import useSchedule from '../../hooks/useSchedule'
import useUser from '../../hooks/useUser'
import { history } from '../../configureStore'


import '../SearchResult/style/SearchResult.scss'
import eye from '../../img/eye.png'
import chef from '../../img/chef.png'
interface Interface {
  mainSchedule: MainSchedule
}
const CalendarInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { mainSchedule, } = props
  const { onPutMainSchedule } = useSchedule()
  const { onGetTargetUserInfo } = useUser()

  const userInfo = onGetTargetUserInfo && onGetTargetUserInfo.filter(userInfo => userInfo.id === mainSchedule.userId)[0]

  var progress_circle = "0"
  if(mainSchedule.progress != null)
  progress_circle = mainSchedule.progress > 50 ? "progress-circle over50 p"+mainSchedule.progress : "progress-circle p"+mainSchedule.progress


  const handleDetailPage = async (schedule: MainSchedule) => {
    const editedSchedule = {...schedule, view: schedule.view + 1}
    // console.log('edit', editedSchedule)
    // 검색결과에서 클릭 할 때마다 view + 1
    onPutMainSchedule(editedSchedule)
    history.push(`/detail/${mainSchedule.id}`)
  }

  return (
    <div
      onClick={() => handleDetailPage(mainSchedule)}
    >
      <div>
       
       <div className="card-single-title">{mainSchedule.title}</div>
       <div className="icons">
       <img src={eye} className="why-text-icon"/>{mainSchedule.view}&nbsp;&nbsp;
       <img src={chef} className="why-text-icon"/>{mainSchedule.recommend}
       </div>
       <div className="card-single-date">{mainSchedule.startDate} - {mainSchedule.endDate}</div>
       
       <div className="card-single-category-body">
         <div className="card-single-category">
           대분류
           <div className="tag">
         {mainSchedule.category1.map((category1, idx) => (
           <span key={idx} className="cardCategory1Item">{category1}</span>
         ))}
         </div> 
         </div>
 
         <div className="card-single-category">
           소분류
           <div className="tag">
         {mainSchedule.category2.map((category2, idx) => (
           <span key={idx} className="cardCategory2Item">{category2}</span>
         ))}
         </div>
         </div>
       </div >
       <div className="tag">
         {mainSchedule.tags.map((tag, idx) => (
           <span key={idx} className="cardTagItem">{tag}</span>
         ))}
         </div>
         <div className="why-text">
           <div className="progressText">진행도</div>
           <div className="progressDiv">
           <div className={progress_circle}>
             <span>{mainSchedule.progress}%</span>
             <div className="left-half-clipper">
               <div className="first50-bar"></div>
               <div className="value-bar"></div>
             </div>
           </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default CalendarInfo