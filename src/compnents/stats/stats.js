import React from 'react'
import DoctorImage from '../../assets/images/doctor.png'
import LikeImage from '../../assets/images/like.png'
import './stats.css'

export default class Stats extends React.Component {
    state = {
        DoctorImage,
        LikeImage,
        NumberOfDoctors: this.props.itemsdata.length,
        reviewsNumber: 0
    }

    componentDidMount =()=>{
        let reviewsNumber = 0;
        this.props.itemsdata.forEach( ele => {
            reviewsNumber = (parseInt(reviewsNumber, 10)+parseInt(ele.reviews, 10))
        })
        this.setState({
            reviewsNumber
        })
    }

    render(){
        return(
            <div className="text-center stats-wrapper">
                <h1>כרגע באתר</h1>
                <div className="row">
                    <div className="col">
                        <img src={LikeImage} alt="likeImage" className="likeImage"/>
                        <h3>{this.state.reviewsNumber}</h3>
                        <p>ביקורות</p>
                        <div className="stats-border"></div>
                    </div>
                    <div className="col">
                        <img src={DoctorImage} alt="doctorImage" className="doctorImage"/>
                        <h3>{this.state.NumberOfDoctors}</h3>
                       <p>{this.props.typeOfWorker}</p>
                    </div>
                </div>
            </div>
        )
    }
}