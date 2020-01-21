import React, { FunctionComponent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './styles/Modal.scss'
import { RootState } from '../../../store'


const Modal: FunctionComponent<{}> = () => {
  let modalState = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch()
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(false)
  }
  return (
    <>
      {modalState ?
        <>
          <div className="Modal-overlay" />
          <div className="Modal">
            <p className="title">Modal title</p>
            <div className="content">
              <p>
                Modal content
          </p>
            </div>
            <div className="button-wrap">
              <div onClick={handleClick}>Confirm</div>
            </div>
          </div>
        </>
        :
        null
      }
    </>
  )
}

export default Modal