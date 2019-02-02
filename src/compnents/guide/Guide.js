import React from 'react';
import './Guide.css';

export default class Guide extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                q: '',
                a: ''
            },
            index: null,
            show: [],
            init: true,
            showArr: [],
            activeStyle: {color: "#3591f9", fontWeight: "bold", border: "2px solid"},
            isActive:{},
        };
    }

    componentWillMount() {
        let arr = [];
        this.props.data.forEach(ele => {
            arr.push(false)
        })
        arr[0] = true;
        this.setState({
            selectedItem: this.props.data[0],
            index: 0,
            showArr: arr
        });
    }

    selectItem(item, e, i) {
        // let activeStyle = {};
        let arr = this.state.showArr;
        let newArr = [];
        console.log(i);
        arr.forEach(ele => {
            newArr.push(false)
        })

        newArr[i] = !arr[i];
        this.setState({
            selectedItem: item,
            index: i,
            showArr: newArr,
            isActive: true,
        });
    }

    isInit = () => {
        if (!this.state.init) {
            return (
                <div className="col-md-8">
                    <h4>wawa</h4>
                    <div>wiwi</div>
                </div>
            )
        } else {
            return (
                <div className="col-md-8">
                    <h4>{this.state.selectedItem.q}</h4>
                    <div dangerouslySetInnerHTML={{__html: this.state.selectedItem.a}}/>
                </div>
            )
        }
    }

    renderAnswer = (item, i) => {
        if (this.state.index === i && this.state.showArr[i]) {
            return (
                <div key={i}>
                    <h6>
                        <button onClick={(e) => this.selectItem(item, e, i)}>{item.q}</button>
                    </h6>
                    <div style={{color: "#6d89bb"}} className="text-right mobile-a"
                         dangerouslySetInnerHTML={{__html: item.a}}/>
                </div>
            )
        } else {
            return (
                <div key={i}>
                    <h6>
                        <button onClick={(e) => this.selectItem(item, e, i)}>{item.q}</button>
                    </h6>
                </div>
            )
        }
    }

    render() {
        console.log(this.state.index);
        return <div className="page-wrapper">
            <h3>מדריך לבחירה נכונה</h3>
            <div className="np-faq-component hidden-sm-down">
                <div className="row">
                    {this.isInit()}
                    <div className="col-md-4">
                        <div className="page-wrapper-item-select">
                            {this.props.data.map((item, i) => {
                                return <h6 key={i}>
                                    <button onClick={(e) => this.selectItem(item, e, i)} style={ this.state.index === i ? this.state.activeStyle : null }>
                                        {item.q}
                                    </button>
                                </h6>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row hidden-md-up text-center mobile-guide">
                <div className="col-12">
                    {this.props.data.map((item, i) => {
                        return this.renderAnswer(item, i)
                    })
                    }
                </div>
            </div>
        </div>
    }
}
