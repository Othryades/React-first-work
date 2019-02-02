import React from 'react'
import DoctorImage from '../../assets/images/doctor.png'
import LikeImage from '../../assets/images/like.png'
import './ContactBox.css'
import SendDataService from "../../service/sendDataService";
import FormValidation from "../../service/formValidation";
import axios from "axios/index";

export default class ContactBox extends React.Component {
    state = {
        doctor: [],
        send: false,
        userData: {
            userName: '',
            firstName: '',
            telephone: '',
            email: '',
            lastName: '',
        },
        errors: [false, false, false],
        display: "block",
        contactBoxTitle: "",
        contactBoxSubTitle: "",
        contactBoxPhoneTitle: "",
        contactBoxPhoneNumber: ""
    }

    FormValidation = new FormValidation();
    SendDataService = new SendDataService();

    componentDidMount = () => {
        let doctor = [];
        this.props.itemsdata.forEach(ele => {
            doctor.push(ele.affiliateUser);
        })
        this.setState({
            doctor
        })
    }

    componentWillMount() {

        // External api data
        // leave commented
        // axios.get(`https://cdn.contentful.com/spaces/3g76d80kv66t/entries?access_token=1c0015004f8d5014121326be137e5c09ebba7d36c6819b4922fa7a19f52633c8&content_type=brand`).then(res =>{

        axios.get(`./data.json`).then(res => {

            this.setState(res.data);
        }, err => {
            console.log(err)
        })

    }

    changeHandler = (e) => {
        const userData = this.state.userData;

        switch (e.target.name) {
            case "fullName":
                userData.userName = this.FormValidation.checkFullName(e.target.value)[0]
                userData.firstName = this.FormValidation.checkFullName(e.target.value)[1]
                userData.lastName = this.FormValidation.checkFullName(e.target.value)[2]
                break;
            case "phone":
                userData.telephone = this.FormValidation.checkPhone(e.target.value)

                break;
            case "email":
                userData.email = this.FormValidation.checkEmail(e.target.value)
                break;
            case "message":
                userData.email = e.target.value
                break;
            default:
        }

        this.setState({
            userData
        })
    }

    sendFormHandler = (e) => {
        window.dataLayer.push({
            'event': 'GA - Event - button send to all',
            'category': 'engagement',
            'action': 'button send to all'
        });
        if (this.validate() === false) {
            return;
        }

        let resp = this.SendDataService.populateSingleRequest(this.state)
        if (resp) {
            this.setState({
                send: true,
            })
        }
        // if(resp){
        //     this.setState({
        //         loader: {display: "none"},
        //         success: {display: "block"},
        //     })
        // }
    }
    showForm = () => {
        return (
            <div className="text-center contact-box-wrapper">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                        <div className="row">
                            <div className="col-12">
                                <h1>{this.state.contactBoxTitle}</h1>
                                <h1>{this.state.contactBoxSubTitle}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-3 col-sm-12">
                                <input className="input-contact-box icb1" type="text" placeholder={"שם"} name="fullName"
                                       onChange={this.changeHandler}/>
                                {this.wrongUser()}
                            </div>
                            <div className=" col-lg-4 col-md-3 col-sm-12">
                                <input className="input-contact-box" type="text" placeholder={"טלפון"} name="phone"
                                       onChange={this.changeHandler}/>
                                {this.wrongPhone()}
                            </div>
                            <div className=" col-lg-4 col-md-3 col-sm-12 icblast">
                                <input className="btn-contact-box" type="submit" value={"קבל הצעת מחיר עכשיו!"}
                                       onClick={this.sendFormHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-sm-12">
                        <div className="row">
                            <div className="col-12">
                                <h1>{this.state.contactBoxPhoneTitle}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h1><a href={"tel:" + this.state.contactBoxPhoneNumber}>{this.state.contactBoxPhoneNumber}</a></h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }


    wrongUser = () => {
        if (this.state.errors[0]) {
            return (
                <div className="alert alert-danger">
                    נא וודאו שהזנתם את שמכם נכון
                </div>
            )
        } else {
            return
        }
    }

    wrongPhone = () => {
        if (this.state.errors[1]) {
            return (
                <div className="alert alert-danger">
                    נא וודאו שמספר הטלפון שלכם הוזן נכון
                </div>
            )
        } else {
            return
        }
    }

    validate = () => {
        let errors = [false, false, false];

        if (this.state.userData.userName.length < 2) {
            errors[0] = true
        }

        if (this.state.userData.telephone.length < 2) {
            errors[1] = true
        }

        this.setState({
            errors
        })

        if (errors[0] || errors[1] || errors[2]) {
            return false
        }
        return true
    }

    showMsg = () => {
        return (
            <div className="text-center contact-box-wrapper" style={{display: this.state.display}}>
                <a className="btn-hide" onClick={this.hideDiv}><i className="fa fa-times" aria-hidden="true"></i></a>
                <h4>ההודעה נשלחה בהצלחה!
                    <br/>

                    נחזור אלייך תור מספר דקות בודדות :)



                </h4>
            </div>
        )
    }

    hideDiv = () => {
        this.setState({display: 'none'});
    }

    render() {
        if (this.state.send === false) {
            return this.showForm();
        } else {
            return this.showMsg();
        }
    }
}
