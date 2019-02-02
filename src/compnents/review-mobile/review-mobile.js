import React from 'react';
import './review-mobile.css';
import StarRatingComponent from 'react-star-rating-component';
import profile from '../../assets/images/150x150_Profile.png'

export default class ReviewMobile extends React.Component {
    state = {
        reviews: this.props.reviewList, 
        currentReview: 0,
        readMore: {height: "62px"},
        showMore: {display: "block"},
        showLess: {display: "none"},
    }
    
    nextReview = () =>{
        let newNum = this.state.currentReview+1;
        if(newNum >= this.state.reviews.length){
            newNum = 0;
        }
        this.setState({
            currentReview: newNum
        })
    }

    prevReview = () =>{
        let newNum = this.state.currentReview-1;
        if(newNum < 0){
            newNum = this.state.reviews.length-1;
        }
        this.setState({
            currentReview: newNum
        })
    }

    readMore = () => {
        this.setState({
            readMore: {height: "auto",
                marginBottom: "15px"   
            },
            showMore: {display: "none"},
            showLess: {display: "block"}
        })
    }
    
    readLess = () =>{
        this.setState({
            readMore: {height: "62px"},
            showMore: {display: "block"},
            showLess: {display: "none"}

        })
    }
    render() {
        
        return(
            <div id="mobile-reviews" className="reviews-container">
                <i className="fa fa-angle-right" aria-hidden="true" onClick={this.nextReview}></i>
                <i className="fa fa-angle-left" aria-hidden="true" onClick={this.prevReview}></i>
                <div className="row main-reviews-wrapper">
                    <div className="col-3">
                        <img src={profile} alt="reviewer-img"/>
                    </div>
                    <div className="col-9 reviews-wrapper">
                        <div className="row">
                            <div className="col-9 text-right float-right reviewer-name">
                                <h4>{this.state.reviews[this.state.currentReview].name}</h4>
                            </div>
                            <div className="col-3">
                                <span className="reviews-container date text-left">
                                    <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                                    {this.state.reviews[this.state.currentReview].date}
                                </span>
                            </div>
                        </div>
                        <div className="row">
                        <StarRatingComponent 
                                    name="rate1" 
                                    starCount={5}
                                    editing={false}
                                    value={this.state.reviews[this.state.currentReview].rate}
                                />
                                <p className="mobile-rating">{this.state.reviews[this.state.currentReview].rate}<span>/10</span></p>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-12">
                    <div className="user-review">
                        <p style={this.state.readMore}>{this.state.reviews[this.state.currentReview].text}</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="text-cover"></div>
                    <div className="mobile-read-more">
                        <p onClick={this.readMore} style={this.state.showMore}>קראו עוד</p>
                        <p onClick={this.readLess} style={this.state.showLess}>קראו פחות</p>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}
