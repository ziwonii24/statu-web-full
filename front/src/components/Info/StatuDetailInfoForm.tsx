import React, { FunctionComponent } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

import './styles/StatuInfo.scss'

const StatuDetailInfoForm: FunctionComponent = () => {

    const SERVER_IMG_IP = process.env.REACT_APP_TEST_SERVER_IMG
    const { width } = useWindowSize()

    return (
        <div className={'detailInfo-template ' + (width < 768 && 'detailInfo-template-mobile')}>
            <div className={'detailInfo-itemBox ' + (width < 768 && 'detailInfo-itemBox-mobile')}>
                <img className={width >= 768 ? 'detailInfo-img' : 'detailInfo-img-mobile'} src={`${SERVER_IMG_IP}/info1`} alt='info1' />
                <div className={width >= 768 ? 'detailInfo-desc' : 'detailInfo-desc-mobile'}>
                    <h1>공부 계획 세우기</h1>                    
                    <p>
                        월별로 공부 계획을 세워보세요.<br/>
                        드래그로 스케줄을 설정하고 스케줄에 맞춰서 할 일을 지정할 수 있어요.<br/>
                    </p>
                    <p>
                        한눈에 보기 쉬운 심플한 디자인!<br/>
                        반응형 웹 디자인으로 모바일에서도 쉽고 간편하게!<br/>
                    </p>
                </div>
            </div>
            <div className={'detailInfo-itemBox ' + (width < 768 && 'detailInfo-itemBox-mobile')}>
                { width < 768 && <img className={width >= 768 ? 'detailInfo-img' : 'detailInfo-img-mobile'} src={`${SERVER_IMG_IP}/info2`} alt='info2' /> }
                <div className={width >= 768 ? 'detailInfo-desc' : 'detailInfo-desc-mobile'}>
                    <h1>계획표 공유하고,<br/>다른 계획표 참고하기</h1>
                    <p>
                        내가 세운 공부 계획표에 태그를 달아서 공유해보세요.<br/>
                        다른 사람들은 어떻게 공부하는지 궁금하다면, 검색을 통해 다른 사람의 공부 계획표를 찾아보세요.<br/>
                        관심있는 카테고리를 설정하고 공부 계획표를 추천받으세요.<br/>
                        다른 사람의 공부 계획표를 가져와서 내 계획표에 적용해 볼 수 있어요.<br/>
                    </p>
                </div>
                { width >= 768 && <img className={width >= 768 ? 'detailInfo-img' : 'detailInfo-img-mobile'} src={`${SERVER_IMG_IP}/info2`} alt='info2' /> }
            </div>
            <div className={'detailInfo-itemBox ' + (width < 768 && 'detailInfo-itemBox-mobile')}>
                <img className={width >= 768 ? 'detailInfo-img' : 'detailInfo-img-mobile'} src={`${SERVER_IMG_IP}/info3`} alt='info3' />
                <div className={width >= 768 ? 'detailInfo-desc' : 'detailInfo-desc-mobile'}>
                    <h1>목표 달성 하기</h1>
                    <p>
                        타이머를 맞춰놓고 공부하고 목표한 만큼 공부했는지 바로바로 확인할 수 있어요.<br/>
                        어제 얼마나 공부했는지, 오늘의 목표는 무엇인지 확인하고,<br/>
                        그럼 이제 우리 공부하러 갈까요?<br/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StatuDetailInfoForm