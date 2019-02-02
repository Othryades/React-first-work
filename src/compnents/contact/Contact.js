import React from 'react'
import axios from 'axios'
import './Contact.css'
import { withFormik } from 'formik';

export default class Contact extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            phone: '',
            mail: '',
            about: '',
            showAlertSuccess: false,
            errors: [false,false,false]
        }
    }

    sendDetailsHandler() {
        if(this.validate() === false ){
            return;
        }
        const data = JSON.stringify({
            name: this.state.name,
            telephone: this.state.phone,
            useremail: this.state.mail,
            message: this.state.about
        })
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post('https://affiliates.leadhim.co.il/api/contact', data).then(() => {
            document.querySelector('.contact-alert').style.display = 'block';
            this.setState({
                showAlertSuccess: true,
                name: '',
                phone: '',
                mail: '',
                about: ''
            });

        })
            .catch(function (error) {
                document.querySelector('.contact-alert-danger').style.display = 'block';

            });

    }

    checkPhone = (phoneNumber) => {
        let phone = phoneNumber.replace(/[^0-9-]+/gi, "");
        if (phone.length > 12) {
            phone = phone.substring(0, 12);
        }
        this.setState({
            phone
        })
    }

    checkEmail = (emailAddress) => {
        let mail = emailAddress.replace(/[^a-z0-9@.]+/gi, "");
        this.setState({
            mail
        })
    }

    checkFullName = (fullName) => {
        let name = fullName.replace(/[^\u0590-\u05fe a-zA-Z-]+/gi, "");
        this.setState({
            name
        })
    }

    checkMessage = (msg) => {
        let about = msg.replace(/[^\u0590-\u05fe a-zA-Z-0-9]+/gi, "");
        this.setState({
            about
        })
    }

    validate = () => {
        let errors = [false, false, false];

        if (this.state.name.length < 2){
            errors[0] = true
        }

        if(this.state.phone.length < 2){
            errors[1] = true
        }

        if(!this.state.mail.includes("@") || !this.state.mail.includes(".")){
            errors[2] = true
        }

        this.setState({
            errors
        })

        if(errors[0] || errors[1] || errors[2]){
            return false
        }
        return true
    }

    wrongUser = () => {
        if(this.state.errors[0]){
            return(
                <div className="alert alert-danger">
                    נא וודאו שהזנתם את שמכם נכון
                </div>
            )
        } else {
            return
        }
    }

    wrongPhone = () =>{
        if(this.state.errors[1]){
            return(
                <div className="alert alert-danger">
                    נא וודאו שמספר הטלפון שלכם הוזן נכון
                </div>
            )
        } else {
            return
        }
    }

    wrongEmail = () => {
        if(this.state.errors[2]){
            return(
                <div className="alert alert-danger">
                    נא הזינו כתובת מייל תקינה
                </div>
            )
        } else {
            return
        }
    }
    render() {
        let isdisabled = true
        if (this.state.name.length > 2 && this.state.phone.length > 2 && this.state.mail.includes("@") && this.state.mail.includes(".")) {
            isdisabled = false
        }
        return <div className="page-wrapper">
            <div className='contact-us'>
                <h2>השארת פרטים</h2>
                <h3>10 המומלצים - בעלי המקצוע הטובים בישראל</h3>

                <div className="row">
                    <div className="col-md-6 contact-form">
                        <input onChange={(e) => this.checkFullName(e.target.value)} value={this.state.name}
                               placeholder='שם מלא' maxLength="20" type="text"/>
                        {this.wrongUser()}
                        <input onChange={(e) => this.checkPhone(e.target.value)} value={this.state.phone}
                               placeholder='טלפון' maxLength="10" type="number"/>
                        {this.wrongPhone()}
                        <input onChange={(e) => this.checkEmail(e.target.value)} value={this.state.mail}
                               placeholder='אימייל' type="email"/>
                        {this.wrongEmail()}
                        <input onChange={(e) => this.checkMessage(e.target.value)} value={this.state.about}
                               placeholder='נושא הפניה' maxLength="50" type="text"/>
                        <button onClick={() => this.sendDetailsHandler()}>שלח פרטים</button>
                    </div>
                    <div className="col-md-6 contact-text hidden-md-down">
                        <p>
                            10 המומלצים הוקם בשנת 2015 במטרה להעניק לצרכנים הישראליים כלי חכם ופשוט להשוואה בין נתוני
                            שירות שונים ומקור לקבלת כל המידע הנדרש לביצוע קנייה צרכנית חכמה.
                        </p>
                        <p>
                            יש לכם משהו לספר לנו? רוצים להופיע באחד מאתרי ההשוואות שלנו?
                            צרו איתנו קשר עכשיו
                        </p>

                    </div>
                </div>

                <div className="alert alert-success alert-dismissible fade show contact-alert" role="alert">
                    <strong>ההודעה נשלחה!</strong> ניצור עמך קשר בקרוב.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="alert alert-danger alert-dismissible fade show contact-alert-danger" role="alert">
                    <strong>ארעה תקלה!</strong> אנא נסה שנית.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    }
}
