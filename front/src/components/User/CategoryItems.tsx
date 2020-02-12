import React, { FunctionComponent, useState } from 'react'
import CategorySubItems from './CategorySubItems'

interface Props {
    mainName: string,
    subCategory: [
        {
            id: number, 
            name: string,
        }
    ],
    subListAdd: (name: string, mainName: string) => void,
    subListRemove: (name: string, mainName: string) => void,
    checkedCategory: string[]
}

const CategoryItems: FunctionComponent<Props> = (props: Props) => {

    const { mainName, subCategory, subListAdd, subListRemove, checkedCategory } = props
    const [ show, setShow ] = useState<boolean>(false)

    const itemClickHandler = () => {
        setShow(!show)
    }

    return (
        <div>
            <div className='categoryItemBox' onClick={itemClickHandler}>{mainName}</div>
            { show && 
                <div className='subCategoryItemBox'>
                    {subCategory?.map((subItem) => (
                        <CategorySubItems 
                            key={subItem.id}
                            mainName={mainName}
                            subName={subItem.name} 
                            subListAdd={subListAdd}
                            subListRemove={subListRemove}
                            checkedCategory={checkedCategory}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default CategoryItems