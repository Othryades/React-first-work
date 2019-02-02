import React from 'react'
import profile from '../../assets/images/150x150_Profile.png'
import './RecommendationBox.css'

export default class RecommendationBox extends React.Component {
    state = {
        recommendations: this.props.recommendationList[0],
    }

    profilePic(picture){
                if ( picture.length < 1){
                    return profile
                } else{
                    return picture
                }
    }

    render() {
        return (
            <div className="text-center contact-box-wrapper">
                <div className="row">
                    <div className="col-12">
                        <h2 className="title-recommended-box">המלצות על השירות</h2>
                    </div>
                </div>
                {this.state.recommendations.recentRecommendations.map((item, index) =>
                <div className="row">
                    <div className="col-2">
                        <img src={this.profilePic(item.picture)} />
                    </div>
                    <div className="col-9">
                             <p key={index} >
                                {item.text}
                                <span className="name-recommended-box"><br/>{item.name}</span>
                                <span className="date-recommended-box"><i className="fas fa-calendar-alt"></i>{item.date}</span>
                            </p>
                    </div>
                </div>
                )}
            </div>
        )
    }
}
