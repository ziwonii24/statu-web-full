import React, { FunctionComponent, useState, ChangeEvent, MouseEvent, useEffect, useMemo } from 'react'

import path from 'path'
import dotenv from 'dotenv'

import useUser from '../../hooks/useUser'
import useCategoryData from '../../hooks/useCategoryData'

import { getToken, logout, login, decode } from './authentication'

import { history } from '../../configureStore'
import CategoryItems from './CategoryItems'
import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const CategoryForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const { onGetCategoryList } = useCategoryData()
    const { onGetUserInfo, onSetUserInfo } = useUser()

    const [ errormsg, setErrorMsg ] = useState<string>('')
    const [ mainCategoryList, setMainCategoryList ] = useState<string[]>([])
    const [ subCategoryList, setSubCategoryList ] = useState<string[]>([])
 
    const categorys = onGetCategoryList
    const user = onGetUserInfo
    const updatedUser = {
        ...user,
        category1: mainCategoryList,
        category2: subCategoryList,
    }
    let mainMap = new Map()
    
    const mainListAdd = (name: string) => {
        if(!mainMap.get(name)) {
            mainMap.set(name, 1)
        } else {
            mainMap.set(name, mainMap.get(name)+1)
        }
    }
    
    const mainListRemove = (name: string) => {
        if(!mainMap.get(name) || mainMap.get(name) == 0) {
            mainMap.set(name, 1)
        } else {
            mainMap.set(name, mainMap.get(name)-1)
        }
    }

    const subListAddHandler = (name: string, mainName: string) => {
        if(subCategoryList.indexOf(name) == -1) {
            let result: string[] = subCategoryList
            result.push(name)
            setSubCategoryList(result)
            mainListAdd(mainName)
        }
    }

    const subListRemoveHandler = (name: string, mainName: string) => {
        if(subCategoryList.indexOf(name) != -1) {
            let result: string[] = subCategoryList
            result.splice(result.indexOf(name), 1)
            setSubCategoryList(result)
            mainListRemove(mainName)
        }
    }

    const makeMainListResult = () => {
        let result: string[] = mainCategoryList
        mainMap.forEach((val, key) => {
            if(val != 0) {
                result.push(key)        
            }
        })
        setMainCategoryList(result)
    }

    const categorySubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        makeMainListResult()

        const resultUser = {
            id: user?.id,
            category1: updatedUser.category1,
            category2: updatedUser.category2,
            name: user?.name
        }

        const token = getToken()
        if(!token) {
            history.push('/login')
            return  
        }
        
        alert('내 정보가 수정되었습니다.')
        fetch(`${SERVER_IP}/user/modify`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'token': token },    // www-form-urlencoded
            body: JSON.stringify(resultUser)
        }).then(res => {          
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
            }
        })
    }

    console.log('*category form rendering...')
    console.log('redux user info : ', user)

    return (
        <div>
            <h4 className='formTitle'>카테고리설정</h4>
            <form>
                <div className='categoryBox'>
                    {categorys?.map((item) => (
                        <CategoryItems 
                            key={item.id} 
                            mainName={item.name} 
                            subCategory={item.category2s}
                            subListAdd={subListAddHandler}
                            subListRemove={subListRemoveHandler}
                            checkedCategory={subCategoryList}
                        />
                    ))}
                </div>

                { errormsg && <div className='errorMsg'>{errormsg}</div>}

                <div>
                    <button className='btnSubmit' type='submit' onClick={categorySubmitHandler}>등록</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm