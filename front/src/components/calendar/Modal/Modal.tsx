import React, { FunctionComponent } from 'react'
import { Interface } from './interfaces/Modal.interfaces'
import './styles/Modal.scss'

interface Props {
  handleModalState: (modalState: boolean) => void
}

const Modal: FunctionComponent<Interface> = (props: Props) => {
  const {
    handleModalState,
  } = props
  return (
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
          <div onClick={() => handleModalState(false)}>Confirm</div>
        </div>
      </div>
    </>
  )
}

export default Modal