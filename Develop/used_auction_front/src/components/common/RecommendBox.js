import React, { Component, useEffect, useState } from 'react';
import * as auth from '../../api/auth';
import * as stuff from '../../api/stuff';


const RecommendBox = () => {
    const [stuffList, setStuffList] = useState([], {})
    const [recommendList, setRecommendList] = useState([], [])

    const callApi = async () => {
        // proxy에 설정한 주소에 fetch 인자의 주소를 덧붙여서 정보를 받아옵니다.
        // 전체 목록
        const res1 = await stuff.getStuff()
        setStuffList(res1.data)
        // 추천 목록
        const username = JSON.parse(localStorage.getItem("user")).username
        const res2 = await auth.getSaveList({username : username})
        setRecommendList(res2.data)
    };

    useEffect(() => callApi(), [])

    return (
        <div>
            <div>
            !!!!! 추천 목록 !!!!
                <div>
                    {stuffList.filter(v => recommendList.includes(v.product_number))
                                .map(v => <div>{v.product_name}</div>)}
                </div>
            </div>
        </div>
    )
}

export default RecommendBox;