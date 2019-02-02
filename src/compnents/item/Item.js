import React from 'react';

import './Item.css';
import gold from '../../assets/images/gold.png';
import silver from '../../assets/images/silver.png';
import copper from '../../assets/images/copper.png';
import CircularProgressbar from 'react-circular-progressbar';
import ScrollUpButton from "react-scroll-up-button";
import Review from '../review/review';
import AddReview from '../add-review/add-review';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            initialAnimation: true,
            displayPhoneNumber: false,
            displayMoreInfo: false,
            rateDoctor: false
        }
    }

    itemMedal() {

        var position = this.props.itemData.number;

        if (position === 1) {
            return <div className="medal-holder"><img className='medal' src={gold}
                                                      alt=""/><span>{this.props.itemData.number}</span></div>;
        }

        if (position === 2) {
            return <div className="medal-holder"><img className='medal' src={silver}
                                                      alt=""/><span>{this.props.itemData.number}</span></div>;
        }

        if (position === 3) {
            return <div className="medal-holder"><img className='medal' src={copper}
                                                      alt=""/><span>{this.props.itemData.number}</span></div>;
        }

        return <div className="item-medal"><span>{this.props.itemData.number}</span></div>

    }

    // checkBoxHandler(){
    //   this.setState({isChecked: !this.state.isChecked});
    //   this.props.contactUsFormMultAddItem(this.props.itemData);
    // }


    contactButtonHandler(item, e) {
        e.preventDefault();
        this.props.contactUsFormSingleAddItem(item.props.itemData);
        window.dataLayer.push({'event': 'GA - Event - button click', 'category': 'engagement', 'action': 'button click step 1', 'label': this.props.itemData.name});

    }


    displayPhoneNumber(e) {
        e.preventDefault();
        this.setState({displayPhoneNumber: !this.state.displayPhoneNumber})
        window.dataLayer.push({'event': 'GA - Event - outbound phone', 'category': 'engagement', 'action': 'outbound phone', 'label': this.props.itemData.name});

    }


    displayMoreInfo(e) {
        e.preventDefault();
        this.setState({
            displayMoreInfo: !this.state.displayMoreInfo,
            rateDoctor: false
        })
    }

    rateDoctor = () => {
        let doc = this.state.rateDoctor
        this.setState({
            rateDoctor: !doc,
            displayMoreInfo: false
        })
    }

    percentToText = (percent) => {

    }

    render() {

        // Box Classes
        let boxClass = ["item"];

        // Display Phone Number
        let displayPhoneNumber = this.state.displayPhoneNumber;
        if (!displayPhoneNumber) {
            displayPhoneNumber = <div className="link-cta-more link-a" brandoutbound="outbound" brandname={this.props.itemData.phone}  onClick={this.displayPhoneNumber.bind(this)}>
                <i className="fa fa-phone" aria-hidden="true"></i>הצג טלפון
            </div>
        } else {
            displayPhoneNumber = <div className="link-cta-more link-a" brandoutbound="outbound" brandname={this.props.itemData.phone} onClick={this.displayPhoneNumber.bind(this)}>
                <i className="fa fa-phone-square" aria-hidden="true"></i>
                <span>{this.props.itemData.phone}</span>
            </div>
        }

        // Display More Info
        let displayMoreInfo = this.state.displayMoreInfo;
        if (displayMoreInfo) {
            boxClass.push('display-more-info');
        }

        // Change SHOW MORE INFO arrow
        let arrow;
        if (this.state.displayMoreInfo) {
            arrow = <i className="fa fa-angle-down" aria-hidden="true"></i>;
        } else {
            arrow = <i className="fa fa-angle-left" aria-hidden="true"></i>;
        }

        let called;
        if (this.props.itemData.called > 1) {
            called = <span className="calls"><i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                {this.props.itemData.called} התקשרו בשעה האחרונה </span>
        } else {
            // called = <br/>
        }

        let rateDoctor;
        let toggle = "none"
        if(this.state.rateDoctor){
            rateDoctor = <AddReview props={this.props}/>
            toggle = "block"
        }
        return <div className={boxClass.join(' ')}>
            <div className="body">
                {this.itemMedal()}
                <div className="img">
                    <div className='image' onClick={this.displayMoreInfo.bind(this)}>
                        <div className="imageWrapper"
                             style={{backgroundImage: `url(${this.props.itemData.profilePicName})`}}></div>
                    </div>
                </div>

                <div className="info">
                    <div className="item-top-right float-right">
                        <span className='item-name' onClick={this.displayMoreInfo.bind(this)}> {this.props.itemData.name} </span>
                        <span className='item-address'> <i className="fa fa-map-marker called-map-icon"
                                                           aria-hidden="true"></i>
                            {this.props.itemData.address}</span>
                        {/*<span className="graduation">*/}
                        {/*<i className="fa fa-graduation-cap" aria-hidden="true"></i>*/}
                        {/*{this.props.itemData.moreInfo[0]}*/}
                        {/*</span>*/}
                        {/* <span className="calls"><i className="fa fa-bell bell-icon" aria-hidden="true"></i>
              {this.props.itemData.called} התקשרו בשעה האחרונה </span> */}
                        {called}
                    </div>
                    <div className="item-top-left float-left">
                        <div className="rate">
                            <span className="rate-text">דירוג</span>
                            <CircularProgressbar percentage={this.props.itemData.rate}/>
                        </div>
                        <div className="reviews">
                            <span className='review-number'>{this.props.itemData.reviews}</span>
                            <span className="review-text">ביקורות</span>
                            <span onClick={this.rateDoctor} className="add-rating">הוסף ביקורת <i className="fa fa-star"></i></span>
                        </div>
                    </div>
                    <div className="info-bottom ">
                        {this.props.itemData.moreInfo.map((text, index) =>
                            <div key={index} className="more-text"><i className="fa fa-check text-check"
                                                                      aria-hidden="true"></i>
                                {text}
                            </div>
                        )}
                    </div>
                </div>

                <div className="contact">
                    <a className='link-cta-main' href="" onClick={(e) => this.contactButtonHandler(this, e)}
                       id={this.props.itemData}>
                        <ScrollUpButton AnimationDuration={1500}>
              <span>
                <i className="fa fa-envelope-o" aria-hidden="true"></i>קבל הצעת מחיר עכשיו
              </span>
                        </ScrollUpButton>
                    </a>
                    {displayPhoneNumber}

                    <div className='link-cta-more link-b' data-tooltip={this.props.itemData.about}
                         data-placement="bottom">
                        <input type="checkbox"
                               onClick={(e) => this.props.contactUsFormMultAddItem(e, this.props.itemData.affiliateUser, this.props.itemData.number, this.props.itemData)}/>
                        <label htmlFor={this.props.itemData.number} className="multiselect">בחירה מרובה</label>
                        <span className="checkmark"></span>
                    </div>
                    <div className='link-cta-more link-c' onClick={this.displayMoreInfo.bind(this)}>
                        מידע נוסף וביקורות{arrow}
                    </div>
                </div>
            </div>
            <div className="item-info-more">
                <div className="row">
                    <div className="col-md-5">
                        <Review reviewList={this.props.itemData.recentReviews}/>
                    </div>
                    <div className="col-md-1 item-border">
                    </div>
                    <div className="col-md-6">
            <span className="about-doctor">
              <i className="fa fa-question-circle" aria-hidden="true"></i>
              אודות {this.props.itemData.name}
            </span>
                        <p className="text-about">{this.props.itemData.about}</p>
                    </div>
                </div>
            </div>
            <div className="add-review-wrapper" style={{display: toggle}}>
                <div className="row">
                    <div className="col-12">
                        {rateDoctor}
                    </div>
                </div>
            </div>

        </div>
    }
}
