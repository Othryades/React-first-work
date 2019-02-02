import React from 'react';
import './about-mobile.css';
import MobileForm from '../mobile-form/mobile-from';

export default class AboutMobile extends React.Component {
    state = {
        serviceCall: false
    }

    clickHandler = () => {
        this.props.contactUs
        this.setState({serviceCall: true})
    }

    closeMobileForm = () => {
        this.setState({serviceCall: false})
    }

    render() {
        let mobileForm;
        if (this.state.serviceCall) {
            mobileForm = <MobileForm doctor={this.props.doctor.affiliateUser} closeMobileForm={this.closeMobileForm}
                                     doctorNames={[this.props.doctor.name]}/>
        }
        return (
            <div className="about-mobile">
                <div className="col-12">
                    {this.props.about}
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <span className="text-center" onClick={this.clickHandler}>
                            הצעת מחיר
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
                {mobileForm}
            </div>
        )
    }
}
