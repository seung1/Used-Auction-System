import React, { Component } from "react";
import Select from "react-select";

class CategoryDetail extends Component {
    
    render () {
        const onChange = (e) => {
            //눌렀을 때 실행되는 함수
        }

        const options = [
            {value: "의류", label: "의류"},
            {value: "디지털/가전", label: "디지털/가전"},
            {value: "잡화", label: "잡화"},
            {value: "뷰티/미용", label: "뷰티/미용"}
        ];
    
    
        return (
            <div className="App">
              <label>
                <Select 
                    options={options}
                    value={options.find(op=> {
                        return op.value === this.props.category
                    })}
                    placeholder="카테고리를 선택하세요"
                    onChange={(value) => {
                        onChange(value.value);
                    }}>
                </Select>
            </label>
            </div>
        );
    }
}

export default CategoryDetail;