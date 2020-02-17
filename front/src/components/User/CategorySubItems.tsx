import React, { FunctionComponent, useState } from 'react'

interface Props {
    mainName: string,
    subName: string,
    subListAdd: (name: string, mainName: string) => void,
    subListRemove: (name: string, mainName: string) => void,
    checkedCategory: string[]
}

const CategorySubItems: FunctionComponent<Props> = (props: Props) => {

    const { mainName, subName, subListAdd, subListRemove, checkedCategory } = props
    const initialCheck = checkedCategory.includes(subName)
    const [ check, setCheck ] = useState<boolean>(initialCheck)

    const checkChangeHandler = () => {
        setCheck(!check)
        !check ? subListAdd(subName, mainName) : subListRemove(subName, mainName)
    }
    
    return (
        <div>
            <label style={{'cursor': 'pointer'}}>
                <input type='checkbox' checked={check} onChange={checkChangeHandler}/>
                <a>{subName}</a>
            </label>
        </div>
    )
}

export default CategorySubItems