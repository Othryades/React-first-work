import React from 'react';
import Item from "../item/Item";
import './Top.css'

import FormValidation from '../../service/formValidation'
import SendDataService from '../../service/sendDataService'

export default class Top extends React.Component {

  /*
  * constructor
  */
  constructor() {

    // Call parent props
    super();

    // Set this state
    this.state = {
      itemsChecked: [],
      itemSelected: [{}],
      userData: {
        userName: '',
        firstName: '',
        telephone: '',
        email: '',
        lastName: '',
      },
      fullName: '',
      form: {display: "block"},
      loader: {display: "none"},
      success: {display: "none"},
      doctor: null,
      affiliatesArray: [],
      show: false,
        errors: [false,false,false]
    }

    // Bind this to add Mult Item
    this.contactUsFormMultAddItem = this.contactUsFormMultAddItem.bind(this);

    // Bind this to add Single Item
    this.contactUsFormSingleAddItem = this.contactUsFormSingleAddItem.bind(this);
    this.FormValidation = new FormValidation()
    this.SendDataService = new SendDataService()
  }

  /*
  * @method
  * @Info Component to capture multiple items and send it with contact form
  */
  closeForm = () => {
    this.setState({
      show: false
    })
  }

  contactUsFormMultDisplay = () => {
    // this.setState({
    //   show: true
    // })
    let array   = this.state.itemsChecked;
    let boxClass = ["contact-us-div"];
    let listItems = array.map((item) =>
      <li key={item.toString()}>{item}</li>
    );

    // Add show to contact form
    if(array.length !== 0){
      boxClass.push('show');
    }

    let isdisabled = true
    if(this.state.userData.userName.length > 3 && this.state.userData.telephone.length > 8 && this.state.userData.email.includes("@") && this.state.userData.email.includes(".")){
        isdisabled = false
    }
    // Return
    return <div className={boxClass.join(' ')}>
    <i className="fa fa-times times-for-desk" aria-hidden="true" onClick={this.closeForm}></i>
      <div className ="inside">
        <h3>השאירו פרטים ונחזור אליכם עם הצעת מחיר מסודרת</h3>
        <h4>בחרתם לקבל הצעת מחיר מ</h4>
        <ul>
        {listItems}
        </ul>
        <form style={this.state.form}>
        <input placeholder='שם מלא' type="text" name="fullName" maxLength="20" value={this.state.userData.userName} onChange={this.changeHandler}/>
            {this.wrongUser()}
        <input placeholder='טלפון' type="text" name="phone" value={this.state.userData.telephone} onChange={this.changeHandler}/>
            {this.wrongPhone()}
        <input placeholder='אימייל' type="text" name="email" value={this.state.userData.email} onChange={this.changeHandler}/>
            {this.wrongEmail()}
        <button onClick={this.sendFormHandler}>שלחי פרטים</button>
        </form>
        <div className="loader text-center" style={this.state.loader}>
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                </div>
                <div className="success text-center" style={this.state.success}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>פרטייך נשמרו בהצלחה</p>
                    <p>ניצור עמך קשר בהמשך</p>
                </div>
      </div>
    </div>
  }

  /*
  * @Info: method to add item to current state
  * @Param: int itemNUmber
  * @Return void
  */
  contactUsFormMultAddItem(e, affiliateUser, number, item){
    this.setState({
      show: true
    })
    //by Max
    let affArray = this.state.affiliatesArray;
    if(!Array.isArray(affArray)){
      this.setState({
        affiliatesArray: [],
        doctor: []
      })
    }
    if(e.target.checked){
      affArray[number] = affiliateUser
    } else {
      affArray[number] = null
    }

    // Set vars
    var array = this.state.itemsChecked;
    var index = array.indexOf(item.name);
// 
    // Add the item to array else remove the item
    if( index < 0 ){
      array.push(item.name);
    }else{
      array.splice(index,1);
    }

    // Set new state
    this.setState({
      affiliatesArray: affArray,
      itemsChecked: array,
      doctor: affArray
    })
  }

  /*
  * @Info: method to remove item from current state
  * @Param: none
  * @Return void
  */
  contactUsFormSingleRemoveItem(e){
    e.preventDefault();
    this.setState({
      itemSelected:[{}],
      form: {display: "block"},
      loader: {display: "none"},
      success: {display: "none"},
    });
  }

  /*
  * @method
  * @Info Component to capture multiple items and send it with contact form
  */
  contactUsFormSingleDisplay() {
    var item = this.state.itemSelected;
    var boxClass = ["top10-contact-us-single"];
    var name = false;

    // Add show to contact form
    if(item.name){
      boxClass.push('show');
      name = item.name;
    }

    let isdisabled = true
    if(this.state.userData.userName.length > 3 && this.state.userData.telephone.length > 8){
        isdisabled = false
    }
    // Return
    return <div className={boxClass.join(' ')}>
      <div className ="header">
        <a className="btn-hide" onClick={(e) => this.contactUsFormSingleRemoveItem(e)}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
        <h2>השאירו פרטים ונחזור אליכם תוך מספר דקות!</h2>
        <div className = "details">
          <span> בחרתם ליצור קשר עם </span>
          <strong> {name} </strong>
          <span>השאירו את הפרטים שלכם ונחזור אליכם בהקדם! תודה!</span>
        </div>
      </div>
      <div className = "body">
        <div className = "left">
            {this.props.contactDescription}
        </div>
        <div className="right">
          <form style={this.state.form}>
            <input placeholder='מה שמך?' type="text" name="fullName" maxLength="20" value={this.state.userData.userName} onChange={this.changeHandler}/>
              {this.wrongUser()}
            <input placeholder='טלפון' type="text" name="phone" value={this.state.userData.telephone} onChange={this.changeHandler}/>
              {this.wrongPhone()}
              <textarea placeholder='נושא הפנייה' name="message" value={this.state.userData.email} onChange={this.changeHandler}></textarea>
              {this.wrongEmail()}
            <button onClick={this.sendFormHandler}>שלחי פרטים</button>
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
    </div>

  }

  /*
  * @Info: method to add item to current state
  */
  contactUsFormSingleAddItem(item){
    this.setState({
      itemSelected:item,
      doctor: item.affiliateUser
    });
    // console.log(item)
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
    window.dataLayer.push({'event': 'GA - Event - button send', 'category': 'engagement', 'action': 'button send', 'label': this.state.itemSelected.name});
    // console.log(this.state.itemSelected.name);
    // console.log(window.dataLayer);
    e.preventDefault();
    e.stopPropagation();
    if(this.validate() === false ){
        return;
    }
  this.orderArray()
}

orderArray = () => {
  let arr = [];
  if(Array.isArray(this.state.doctor)){
    this.state.affiliatesArray.forEach( ele => {
      if(ele !== null && ele.length > 1){
        arr.push(ele)
      }
    })
  } else {
    arr = this.state.doctor
  }

  this.setState({
    doctor: arr,
    affiliatesArray: arr,
    form: {display: "none"},
    loader: {display: "block"},
  }, () => {
    let resp = this.SendDataService.populateSingleRequest(this.state)
    if(resp){
      this.setState({
        userData: {
          userName: '',
          firstName: '',
          telephone: '',
          email: '',
          lastName: '',
        },
        fullName: '',
        form: {display: "none"},
        doctor: null,
        affiliatesArray: [],
        loader: {display: "none"},
        success: {display: "block"},
    })
    setTimeout( () =>{
      this.setState({
        itemsChecked: [],
        itemSelected: [{}],
        form: {display: "block"},
        loader: {display: "none"},
        success: {display: "none"},
      })
    }, 6000)
    }
  }) 
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
                    אנא וודאו שכתובת המייל שלכם הוזנה בצורה נכונה
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
  /*
  * @render
  */
  render() {
    let multiform;
    if(this.state.show){
      multiform = this.contactUsFormMultDisplay()
    }
    return <div className = "np-top10desktop">
        {multiform}
        {this.contactUsFormSingleDisplay()}
        {this.props.topData.map((item) => {
          return <Item key={item.number} itemData={item} contactUsFormMultAddItem={this.contactUsFormMultAddItem} contactUsFormSingleAddItem={this.contactUsFormSingleAddItem}/>
        })}
      </div>
  }
}
