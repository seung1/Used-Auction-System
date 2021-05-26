import React from "react";

// 목표 : 여기에 post / get을 이용해서 값을 띄어야 한다. 
// 그런데 post/get은 백엔드 아닌가?..
const LandingPage = () => {
  return (
    <>
      <div className = "App">현재 참여중인 경매 :</div>
      <div>물건 이름 :    </div>
      <div>시작 가격 :    </div>
      <div>현재 날짜 :    </div>
      <div>종료 날짜 :    </div>
      <div></div>
      
     
       <div className = "App">
      <button onClick>입찰하기</button>
    </div>
  
    </>
  );
};

export default LandingPage;
