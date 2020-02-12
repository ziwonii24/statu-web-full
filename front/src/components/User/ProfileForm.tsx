import React, { FunctionComponent, MouseEvent, useState, ChangeEvent } from 'react'

import path from 'path'
import dotenv from 'dotenv'

import useUser from '../../hooks/useUser'

import { login, logout, decode } from './authentication'

import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const ProfileForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const { onGetUserInfo, onSetUserInfo } = useUser()

    const [file, setInputfile] = useState<any>()
    const [showWrap, setShowWrap] = useState<boolean>(true)
    const [imgSrc, setImgSrc] = useState<any>('')
    const [ errormsg, setErrorMsg ] = useState<string>('')

    const user = onGetUserInfo

    const fileFindHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const files = e.target.files
        const filesArr = Array.prototype.slice.call(files)
        const file = filesArr[0]

        if(!file) return
        
        var reader = new FileReader();
        reader.onload = function(event) {
            setInputfile(file)
            setShowWrap(false)

            if (event.target != null) {
                setImgSrc(event.target.result)
            }
        };

        reader.readAsDataURL(file);        
    }

    const fileRemoveHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        setShowWrap(true)
        setInputfile(null)
    }

    const fileSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        
        var formData = new FormData();
        formData.append('file',file)
        
        alert('내 정보가 수정되었습니다.')
        fetch(`${SERVER_IP}/user/upload?email=`+user?.email,  {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }).then(res => {
            console.log('[profile] res: ', res)
            if(res.status !== 200 && res.status !== 202) {
                setErrorMsg('예기치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요!')
            } else {
                res.json().then(response => {
                    const newToken = response.data.token
                    logout()
                    login(newToken)
                    
                    const newtokenDecoded = decode(newToken)
                    const newUser = newtokenDecoded.user
                    
                    onSetUserInfo(newUser)
                })
                .catch(e => {
                    console.log('[profile] error: ', e)
                })
            }
        })
    }
  
    console.log('*profile form rendering...')

    return (
        <div>
            <h4 className='formTitle'>프로필설정</h4>
            <form>            
                <div className='file-upload'>
                    {showWrap ?
                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type='file' onChange={fileFindHandler} accept="image/*" />
                            <div className="drag-text">
                                끌어다 놓거나 이미지를 선택하세요.
                            </div>
                        </div>
                        :
                        <div className="file-upload-content">
                            <img className="file-upload-image" src={imgSrc} />
                            <div className="image-title-wrap">
                                <button type="button" className="remove-image" onClick={fileRemoveHandler} >다시 선택하기</button>
                            </div>
                        </div>
                    }
                </div>

                { errormsg && <div className='errorMsg'>{errormsg}</div> }

                <div>
                    <button className='btnSubmit' type='submit' onClick={fileSubmitHandler}>등록</button>
                </div>
            </form>           
        </div>
    )
}

export default ProfileForm