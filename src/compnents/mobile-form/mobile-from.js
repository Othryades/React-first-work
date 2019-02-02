import React from 'react'
import './mobile-form.css'
import FormValidation from '../../service/formValidation'
import SendDataService from '../../service/sendDataService'

 class MobileForm extends React.Component {
    state = {
        userData: {
            userName: '',
            firstName: '',
            telephone: '',
            email: '',
            lastName: '',
        },
        doctor: this.props.doctor,
        form: {display: "block"},
        loader: {display: "none"},
        success: {display: "none"},
        doctorNames: this.props.doctorNames,
        orderedName: [],
        errors: [false,false,false]
    }

    FormValidation = new FormValidation()
    SendDataService = new SendDataService()
    componentWillMount = () => {
        document.getElementsByTagName("html","body")[0].style.overflow = 'hidden';
        let orderedName = []
        this.state.doctorNames.forEach( ele => {
            if(ele){
                orderedName.push(ele)
            }
        })

        this.setState({
            orderedName
        })
    }

    changeHandler = (e) => {
        const userData = this.state.userData;
        
        switch(e.target.name){
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

    sendFormHandler = (e) =>{
        window.dataLayer.push({'event': 'GA - Event - button send', 'category': 'engagement', 'action': 'button send', 'label': this.props.doctorNames});
        if(this.validate() === false ){
            return;
        }

        // this.props.setOrder();
        this.setState({
            form: {display: "none"},
            loader: {display: "block"},
        })

        let resp = this.SendDataService.populateSingleRequest(this.state)
        if(resp){
            this.setState({
                loader: {display: "none"},
                success: {display: "block"},
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

     validate = () => {
         let errors = [false, false, false];

         if (this.state.userData.userName.length < 2){
             errors[0] = true
         }

         if(this.state.userData.telephone.length < 2){
             errors[1] = true
         }

         // if(!this.state.userData.email.includes("@") || !this.state.userData.email.includes(".")){
         //     errors[2] = true
         // }

         this.setState({
             errors
         })

         if(errors[0] || errors[1] || errors[2]){
             return false
         }
         return true
     }

    render(){
        let isdisabled = true
        if(this.state.userData.userName.length > 3 && this.state.userData.telephone.length > 8 && this.state.userData.email.includes("@") && this.state.userData.email.includes(".")){
            isdisabled = false
        }
        let pos = {
            position: "fixed",
            top: "7vh",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 15,
            display: "block",
        }
        return(
            <div style={pos}>
            <div className="mobile-form">
                <i className="fa fa-times" aria-hidden="true" onClick={this.props.closeMobileForm}></i>
                <h3>השאירו פרטים ונחזור אליכם תוך מספר דקות!</h3>
                <h4>בחרתם לקבל הצעת מחיר מ</h4>
                <p className="mobile-doctors-names-list">{this.state.orderedName.toString()}</p>
                <form style={this.state.form}>
                    <input type="text" placeholder="מה שמך?" name="fullName" maxLength="20" value={this.state.userData.userName} onChange={this.changeHandler}/>
                    {this.wrongUser()}
                    <input type="text" placeholder="טלפון" name="phone" value={this.state.userData.telephone} onChange={this.changeHandler}/>
                    {this.wrongPhone()}
                    <textarea placeholder='נושא הפנייה' name="message" value={this.state.userData.email} onChange={this.changeHandler}></textarea>
                    {this.wrongEmail()}
                    <input type="button" onClick={this.sendFormHandler} value="שלח פרטים" />
                </form>
                <div className="loader text-center" style={this.state.loader}>
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                </div>
                <div className="success text-center" style={this.state.success}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>ההודעה נשלחה בהצלחה!
                        <br/>

                        נחזור אלייך תור מספר דקות בודדות :)



                    </p>
                </div>
            </div>
            </div>
        )
    }
}

export default MobileForm;