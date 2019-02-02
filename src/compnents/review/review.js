import React from 'react';
import './review.css';
import profile from '../../assets/images/150x150_Profile.png'
import StarRatingComponent from 'react-star-rating-component';

export default class review extends React.Component {
    state = {
        reviews: this.props.reviewList, 
        currentReview: 0,
    }

    displayReview (){
         if ( !this.state.reviews[0].name ) {
            return '0';
        } else  {
            return this.state.reviews.length;
        }
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

    profilePic(){
        if ( !this.state.reviews[this.state.currentReview].picture){
            return profile
        } else{
            return this.state.reviews[this.state.currentReview].picture
        }
    }

    render() {
        return(
            <div className="reviews-container">
                <i className="fa fa-angle-right" aria-hidden="true" onClick={this.nextReview}></i>
                <i className="fa fa-angle-left" aria-hidden="true" onClick={this.prevReview}></i>
                <p>חוות דעת ({this.displayReview()})</p>
                <div className="row main-reviews-wrapper">
                    <div className="col-md-3">
                        <img src={this.profilePic()} alt="reviewer-img"/>
                        <StarRatingComponent 
                            name="rate2" 
                            editing={false}
                            starCount={5}
                            value={this.state.reviews[this.state.currentReview].rate}
                        />
                    </div>
                    <div className="col-md-9 reviews-wrapper">
                        <div className="row">
                            <div className="col-md-9 text-right float-right reviewer-name">
                                <h4>{this.state.reviews[this.state.currentReview].name}</h4>
                            </div>
                            <div className="col-md-3">
                                <span className="reviews-container date text-left">
                                    {this.state.reviews[this.state.currentReview].date}
                                </span>
                            </div>
                            <div className="user-review">
                                <p>{this.state.reviews[this.state.currentReview].text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
