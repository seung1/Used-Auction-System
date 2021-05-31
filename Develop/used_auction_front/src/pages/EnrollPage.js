import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import * as stuff from '../api/stuff';


const BigContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 3rem;
`

const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    width: 50%;
    padding: 1rem;
    margin: 1rem;
    border: 0.5rem solid black;
`

const Button = styled.button`
    width : 5%;
    font-weight: bold;
    border: none;
    color: #fff !important;
    background: black !important;
    :hover {
        color: #fff !important;
        background: #444 !important;
    }
`

function EnrollPage ({history}) {
    const firstState = {
        product_name : '',
        product_price : 0,
        local_area : '',
        category : '',
        user_name : JSON.parse(localStorage.getItem("user")).username,
    }
    const [formData, setFormData] = useState(firstState, {})
    
    const onChangeName = e => {
        setFormData({...formData, product_name : e.target.value})
    }
    const onChangePrice = e => {
        setFormData({...formData, product_price : e.target.value})
    }
    const onChangeArea = e => {
        setFormData({...formData, local_area : e.target.value})
    }
    const onChangeCategory = e => {
        setFormData({...formData, category : e.target.value})
    }
    const clearInput = () => {
        let el = document.getElementsByClassName('input-text');
        
        for (let i = 0; i < el.length; i++)
            el[i].value = '';
    }


    const onClickEnrollment = () => {
        if (Object.values(formData).includes('')) {
            alert('빠짐없이 입력해주세요')
            return ;
        }
        // DB 로 쏘기
        stuff.enrollStuff(formData)
        // 초기상태로
        setFormData(firstState)
        clearInput()
        
        alert('등록 완료')
        // 뒤로가기
        history.go(-1)
    }
    return (
        <BigContainer>
            <Form>
                <label>물건 이름</label>
                    <input className = 'input-text' onChange = {onChangeName}>
                    </input>
                <label>가격</label>
                    <input className = 'input-text' onChange = {onChangePrice} type = 'number'>
                    </input>
                <label>판매 지역</label>
                    <input className = 'input-text' onChange = {onChangeArea}>
                    </input>
                <label>카테고리</label>
                    <input className = 'input-text' onChange = {onChangeCategory}>
                    </input>
            </Form>
            <Button onClick = {onClickEnrollment}>
                등록
            </Button>
        </BigContainer>
    )
}

export default EnrollPage