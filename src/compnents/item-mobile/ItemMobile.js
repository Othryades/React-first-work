import React from 'react';
import MobileForm from '../mobile-form/mobile-from';
import './ItemMobile.css'
import CircularProgressbar from 'react-circular-progressbar';
import ReviewMobile from '../review-mobile/review-mobile';
import AboutMobile from '../about-mobile/about-mobile';
import AddReview from '../add-review/add-review';

export default class ItemMobile extends React.Component {
    constructor() {
        super();
        this.state = {
            showMore: false,
            showReviews: false,
            showAbouts: false,
            aboutStyle: {},
            reviewSyle: {},
            serviceCall: false,
            rateDoctor: false
        }
    }

    ShowReviewsHandler = () => {
        let reviewSyle = {}
        let showReview = this.state.showReviews
        if (!showReview) {
            reviewSyle = {color: "#3591F9"}
        }
        this.setState({
            showAbout: false,
            rateDoctor: false,
            aboutStyle: {},
            showReviews: !showReview,
            reviewSyle,
        })
    }

    AboutHandler = () => {
        let aboutStyle = {}
        let showAbout = this.state.showAbouts;
        if (!showAbout) {
            aboutStyle = {color: "#3591F9"}
        }
        this.setState({
            showReviews: false,
            rateDoctor: false,
            reviewSyle: {},
            showAbouts: !showAbout,
            aboutStyle,
        })
    }

    clickHandler = () => {
        this.props.contactUs
        this.setState({serviceCall: true})
        window.dataLayer.push({'event': 'GA - Event - button click', 'category': 'engagement', 'action': ' button click step 1', 'label': this.props.itemData.name});
    }

    clickPhone = () => {
        window.dataLayer.push({'event': 'GA - Event - outbound phone', 'category': 'engagement', 'action': 'outbound phone', 'label': this.props.itemData.name})
    }

    closeMobileForm = () =>{
        document.getElementsByTagName("html","body")[0].style.overflow = 'initial';
        this.setState({serviceCall: false})
    }

    rateDoctor = () => {
        let doc = this.state.rateDoctor
        this.setState({
            rateDoctor: !doc,
            showAbouts: false,
            showReviews: false,
        })
    }

    render() {
        let showReviews = this.state.showReviews;
        let showAbout = this.state.showAbouts;
        let review;
        let about;

        if (showReviews) {
            review = <ReviewMobile reviewList={this.props.itemData.recentReviews}/>
        }

        if (showAbout) {
            about = <AboutMobile about={this.props.itemData.about} contactUs={this.props.contactUs}
                                 doctor={this.props.itemData}/>
        }

        let mobileForm;
        if(this.state.serviceCall){
            mobileForm = <MobileForm doctor={this.props.itemData.affiliateUser} closeMobileForm={this.closeMobileForm} doctorNames={[this.props.itemData.name]}/>
        }

        let rateDoctor;
        let toggle = "none"
        if(this.state.rateDoctor){
            rateDoctor = <AddReview props={this.props}/>
            toggle = "block"
        }

        return (
            <div>
                <div className="mobile-item">
                    <div className="row">
                        <div className="col-sm-3 col-2 img-mobile-wrapper">
                            {/* <img src={telegram} className='img-mobile' alt="img logo"/> */}
                            <div className="imageWrapper-mobile" onClick={this.AboutHandler}
                                 style={{backgroundImage: `url(${this.props.itemData.profilePicName})`}}></div>
                        </div>
                        <div className="col-sm-6 col-7 mobile-data fa-colors">
                            <h5 className="mobile-blue-color" onClick={this.AboutHandler}>{this.props.itemData.name}</h5>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i>{this.props.itemData.address}</p>
                            <p><i className="fa fa-graduation-cap"
                                  aria-hidden="true"></i>{this.props.itemData.moreInfo[0]}</p>
                            <p><i className="fa fa-graduation-cap"
                                  aria-hidden="true"></i>{this.props.itemData.moreInfo[1]}</p>
                        </div>
                        <div className="col-3 mobile-user-rating">
                            <p className="text-center mobile-blue-color">דירוג משתמשים</p>
                            <CircularProgressbar percentage={this.props.itemData.rate}/>
                            <span onClick={this.rateDoctor} className="add-rating"> הוסף דירוג <i className="fa fa-star"></i></span>
                        </div>
                    </div>
                    <div className="row mobile-buttons-wrapper">
                        <div className="col-3">
                            <input type="checkbox" className="mobile-checkbox"
                                   onClick={(e) => this.props.addDoctorToList(e, this.props.itemData, this.props.itemData.number)}/>
                            <span className="checkmark"></span>
                            <span className="mobile-multiselect">בחירה מרובה</span>
                        </div>
                        <div className="col-5" onClick={this.clickPhone}>
                            <div className="mobile-phone text-center"><a style={{color: "white"}}
                                                                         href={"tel:" + this.props.itemData.phone}><i
                                className="fa fa-phone marg-six" aria-hidden="true"></i>חייגו</a></div>
                        </div>
                        <div className="col-4" onClick={this.clickHandler}>
                            <div className="mobile-message text-center"><i
                                className="fa fa-envelope-o marg-six" aria-hidden="true"></i>הודעה</div>
                        </div>
                    </div>
                    <div className="row mobile-reviews-wrapper">
                        <div className="col-6 text-center mobile-reviews" onClick={this.ShowReviewsHandler}>
                            <span><i className="fa fa-comments" aria-hidden="true"></i> <span
                                style={this.state.reviewSyle}>חוות דעת ({this.props.itemData.recentReviews.length})</span></span>
                        </div>
                        <div className="col-6 text-center mobile-about" onClick={this.AboutHandler}>
                            <span><i className="fa fa-question-circle" aria-hidden="true"></i> <span
                                style={this.state.aboutStyle}>אודות {this.props.itemData.name}</span></span>
                        </div>
                    </div>
                </div>
                {review}
                {about}
                {mobileForm}
                {rateDoctor}
            </div>
        )
    }
}
