import React from 'react';

import './Top-mobile.css'
import ItemMobile from "../item-mobile/ItemMobile";
import Faq from "../faq/Faq";

import MobileForm from '../mobile-form/mobile-from'

export default class TopMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      showContactUs: false,
      affiliatesArray: [],
      showTooltip: false,
      doctorNames: []
    }
  }

  faqGenerator() {

    return this.props.faq.map((qAndA,index)=> <Faq key={index} index={index} qAndA={qAndA} faqLength={this.props.faq.length}/>
    );

  }

  addDoctorToList = (e, affiliateUser, number) => {
    let showForm = false;
    let doctorNames = this.state.doctorNames
    let affArray = this.state.affiliatesArray
    if(e.target.checked){
      affArray[number] = affiliateUser.affiliateUser
      doctorNames[number] = affiliateUser.name
    } else {
      affArray[number] = null
      doctorNames[number] = null
    }

    affArray.forEach( ele => {
      if(ele && ele.length > 3){
        showForm = true
      }
    })
    this.setState(prevstate => ({
      affiliatesArray: affArray,
      showTooltip: showForm,
      doctorNames
    }))
  }

  closeMobileForm = () => {
    this.setState({
      showContactUs: false,
      showTooltip: false
    })
  }

  showContactToolTip = () => {
    // let arr = this.orderArray()

    this.setState({
      // affiliatesArray: arr,
      showContactUs: true,
      showTooltip: false
    })
  }

  orderArray = () => {
    let arr = [];
    this.state.affiliatesArray.forEach( ele => {
      if(ele !== null && ele.length > 1){
        arr.push(ele)
      }
    })
    this.setState({
      affiliatesArray: arr
    })
  }

  showToolTipFunc = () => {
    if(this.state.showTooltip){
      return(
        <div className="contact-tooltip text-center" onClick={this.showContactToolTip}>
          <p>השאירו פרטים ונחזור אליכם במהירות</p>
        </div>
      )
    } else {
      return ""
    }
  }
  render() {
    let mobileForm;
    if(this.state.showContactUs){
      mobileForm = <MobileForm closeMobileForm={this.closeMobileForm} doctor={this.state.affiliatesArray} setOrder={this.orderArray} doctorNames={this.state.doctorNames}/>
    }
    return <div>
      <div className="top-mobile">
        <div className='contact-us-form-and-btn'>
        {mobileForm}
        </div>
        {this.props.topData.map((item, index) => {
          return <ItemMobile key={item.number}
                             itemData={item}
                             contactUs={this.contactUsFormDisplayer}
                            addDoctorToList={this.addDoctorToList}
          />
        })}
        {this.showToolTipFunc()}
        {mobileForm}
      </div>

      {this.faqGenerator()}
    </div>
  }
}