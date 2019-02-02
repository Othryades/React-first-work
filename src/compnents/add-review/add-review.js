import React from 'react'
import './add-review.css'
import FormValidation from '../../service/formValidation'
import SendDataService from '../../service/sendDataService'

export default class AddReview extends React.Component {
    state = {
        rating: 0,
        stars: [false, false, false, false, false],
        doctor: this.props.props.itemData.affiliateUser,
        userData: {
            fullName: '',
            email: '',
            bodymsg: '',
        },
        errors: [false,false,false,false],
        sent: false
    }

    formValidation = new FormValidation()
    sendDataService = new SendDataService()

    onStarClick = (index) =>{
        let stars = [];
        for(let i = 0; i < this.state.stars.length; i++){
            if(i <= index){
                stars.push(true)
            } else {
                stars.push(false)
            }
        }
        this.setState({
            stars,
            rating: index+1
        })
    }

    changeValue = (e) => {
        const name =  e.target.name
        const value = e.target.value

        switch(name){
            case "fullname":
                this.setState({ userData: {...this.state.userData, fullName: this.formValidation.bodyMsg(value)}});
                break;
            case "email":
                this.setState({ userData: {...this.state.userData, email: this.formValidation.checkEmail(value)}})
                break;
            case "bodymsg":
                this.setState({ userData: {...this.state.userData, bodymsg: this.formValidation.bodyMsg(value)}})
                break
            default:
                return
        }
    }

    validateForm = () => {
        let errors = [false, false, false, false];

        if (this.state.userData.fullName.length < 2){
            errors[0] = true
        }

        if(this.state.userData.bodymsg.length < 2){
            errors[2] = true
        }

        if(!this.state.userData.email.includes("@") || !this.state.userData.email.includes(".")){
            errors[1] = true
        }

        if(this.state.rating === 0){
            errors[3] = true
        }
        this.setState({
            errors
        })

        if(errors[0] || errors[1] || errors[2] || errors[3]){
            return false
        } else {
            let resp = this.sendDataService.populateMailObj(this.state.userData, [this.state.rating, this.state.doctor])
            this.setState({
                sent: true
            })
        }

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
        if(this.state.errors[2]){
            return(
                <div className="alert alert-danger">
                    נא וודאו שגוף ההודעה אינו ריק
                </div>
            )
        } else {
            return
        }
    }

    wrongEmail = () => {
        if(this.state.errors[1]){
            return(
                <div className="alert alert-danger">
                    נא הזינו כתובת מייל תקינה
                </div>
            )
        } else {
            return
        }
    }

    noRating = () =>{
        if(this.state.errors[3]){
            return(
                <div className="alert alert-danger">
                    אנא דרגו את המומחה
                </div>
            )
        } else {
            return
        }
    }

    messageSent = () =>{
        if(this.state.sent){
            return(
                <div>
                    <h4>תודה רבה, הביקורת עלתה בהצלחה!</h4>
                </div>
            )
        } else {
            return(
            <div>
            <h4>דרגו את הביקור</h4>
            {this.state.stars.map( (ele, index) => {
                return (
                    <i className={"fa fa-star rating-stars "+(this.state.stars[index] ? 'star-active' : '')}
                       key={index}
                       onClick={() => this.onStarClick(index)}
                       onMouseOver={() => this.colorStars(index)}
                       // onMouseLeave={this.decolorStars}
                    ></i>
                )
            })}

            {this.noRating()}
            <button onClick={this.validateForm}>שלח פרטים <i className="fa fa-chevron-left"></i></button>
            </div>
            )
        }
    }

    colorStars = (index) => {
        let stars = [];
        for(let i = 0; i < this.state.stars.length; i++){
            if(i <= index){
                stars.push(true)
            } else {
                stars.push(false)
            }
        }

        this.setState({
            stars,
        })

    }

    decolorStars = () => {
        this.setState({
            stars: [false, false, false, false, false]
        })
    }
    render() {
        return(
            <div className="row inner-wrapper">
                <div className="col-xs-12 col-lg-7">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1><i className="fa fa-comments"></i> כתיבת ביקורת</h1>
                        </div>
                        <div className="col-lg-12">
                            <form>
                                <div className="row">
                                    <div className="col-lg">
                                            <div className="input-wrap"><input type="text"
                                                                               className="form-control"
                                                                               name="fullname"
                                                                               placeholder="שם מלא"
                                                                               onChange={this.changeValue}
                                                                               value={this.state.userData.fullName}
                                            />
                                                {this.wrongUser()}
                                                </div>
                                            <div className="input-wrap" style={{float: "left"}}><input type="email"
                                                                                                       className="form-control"
                                                                                                       name="email"
                                                                                                       placeholder="אימייל"
                                                                                                       onChange={this.changeValue}
                                                                                                       value={this.state.userData.email}
                                            />
                                                {this.wrongEmail()}
                                            </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <textarea className="form-control"
                                                  rows="6"
                                                  name="bodymsg"
                                                  placeholder="כתבו ביקורת"
                                                  onChange={this.changeValue}
                                                  value={this.state.userData.bodymsg}
                                        ></textarea>
                                        {this.wrongPhone()}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-lg-5">
                    <div className="rate-wrapper">
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6  text-center">
                                {this.messageSent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}