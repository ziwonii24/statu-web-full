import React, { FunctionComponent, MouseEvent } from 'react'
import Interface from './interfaces/Modal.interface'
import './styles/Modal.scss'

interface Props {
  isOpen: boolean
  close: void
}

const Modal: FunctionComponent<Interface> = (props: Props) => {
  const {
    isOpen,
    close
  } = props

  return (
    <>
      {isOpen ?
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
              <div onClick={close}>Confirm</div>
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