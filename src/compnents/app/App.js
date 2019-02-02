import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch, NavLink,} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import BackgroundImage from '../../assets/images/BG.jpg';

import Contact from "../contact/Contact";
import Guide from "../guide/Guide";

import logo from '../../assets/images/10Logo.svg';
import imgForLogo from '../../assets/images/Front.png';
import Top from "../top/Top";
import Footer from "../Footer/Footer";
import Map from "../map/Map";
import TopMobile from "../Top-mobile/TopMobile";
import Stats from '../stats/stats';
import Todo from '../Todo/Todo';
import ContactBox from '../Contact-box/ContactBox';
import RecommendationBox from '../Recommendation-box/RecommendationBox';

// import AboutUs from '../about-mobile/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataIsReady : false,
      title: "",
      subtitle: "",
      mobileSubtitle: "",
      mobileDate: '',
      mobileUnderTitle: '',
      itemsdata: [],
      recommendationData: null,
      faq: [],
      guideFaq: [],
      isMobile: false,
      titleColor:"",
      titleWeight:"",
      subtitleColor:"",
      locationCoordinatesDefault: null
    }
  }

  componentWillMount() {

    // External api data
    // leave commented
    // axios.get(`https://cdn.contentful.com/spaces/3g76d80kv66t/entries?access_token=1c0015004f8d5014121326be137e5c09ebba7d36c6819b4922fa7a19f52633c8&content_type=brand`).then(res =>{
    //
    //   // Set vars
    //   var resItems = res.data.items;
    //   var resItemsNew = [];
    //
    //   // Loop - format data to new array
    //   for (var i = 0; i < resItems.length; i++) {
    //     resItemsNew[i] = resItems[i].fields;
    //   }
    //
    //   // Loop to set profile picture
    //   for (var i = 0; i < resItemsNew.length; i++) {
    //
    //   }
    //
    //   // Set new state
    //   //this.setState({itemsdata: resItemsNew });
    // })

      axios.get(`./data.json`).then(res =>{
      this.setState(res.data);
      this.checkIfMobile();
    }, err => {
      console.log(err)
    })

  }

  checkIfMobile = () => {
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  if (width <= 767) {
    this.setState({
      isMobile: true
    })
  }
  }

  mobileNavDispayer() {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (width <= 767) {

    }
    return <ul className="mobile-list">
      <li><NavLink to='/top' activeClassName='active'>המובילים ביותר</NavLink></li>
      <li><NavLink to='/guide' activeClassName='active'>מדריך לבחירה נכונה</NavLink></li>
      <li><NavLink to='/contact' activeClassName='active'>אודות</NavLink></li>
    </ul>

  }

    testcolor() {
        console.log(this.state.titleColor);
    }


  topbarDisplayer() {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (width >= 767) {

    }
    return <div className = "topbar-wrapper">
      <div className = "container">
        <div className = "row">
          <div className = "col-md-12">
            <div className="topbar">
            <div className="top-right">
              <NavLink to='/top' className="active">
                <img className="header-logo" src={logo} alt=""/>
                המומלצים
                <span className = "highlight"> - בעלי המקצוע הטובים בישראל</span>
              </NavLink>
            </div>
            <div className="top-left">
              <ul className="topbar-list">
                <li><NavLink to='/top' activeClassName='active'>המובילים ביותר</NavLink></li>
                <li><NavLink to='/guide' activeClassName='active'>מדריך לבחירה נכונה</NavLink></li>
                <li><NavLink to='/contact' activeClassName='active'>אודות</NavLink></li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  }

  topComponentChooser() {
    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    return (width > 767) ? <Route exact path='/top' render={() => <Top contactDescription={this.state.contactDescription} topData={this.state.itemsdata}/>}/> :
      <Route exact path='/top' render={() => <TopMobile topData={this.state.itemsdata} faq={this.state.faq}

      />}/>
  }

  redirectToTop = () =>{
    this.setState({
      redirect: true
    })
  }
///////////////////////Check if Mobile/////////////////// Hacked by Max, since refactoring will take too long
isMobileTitle = () =>{
        // const titleFromUrl = window.location.search.split('=');
        // let parsedTitle = this.state.title;
        // if(titleFromUrl && titleFromUrl.length > 1){
        //   parsedTitle = titleFromUrl[1].replace(/%20/g, ' ');
        //   parsedTitle = decodeURI(parsedTitle);
        // }

    var url_string = window.location.href;
    let parsedTitle = this.state.title;
    var url = new URL(url_string);
    var temp = url.searchParams.get("words");
    if(temp && temp.length > 1){
        parsedTitle = temp;
        // parsedTitle = decodeURI(parsedTitle);
    }

        // const final = parsedTitle.html(decodeURI(titleFromUrl[1]));

    if(this.state.isMobile){
    return(
      <div className="bottombar">
        <h1 className='main-title-mobile text-center mobile-title-global' style={{color: this.state.titleColor, fontWeight: this.state.titleWeight}}><span id="key">{parsedTitle}</span> - <span className="mobile-green-color" style={{color: this.state.subtitleColor}}>{this.state.mobileDate}</span></h1>
      <h2 className='main-subtitle-mobile mobile-title-global'>{this.state.mobileSubtitle}</h2>
      <h2 className='subtitle-mobile mobile-golden-color'><span>*</span> {this.state.mobileUnderTitle}</h2>
      {this.mobileNavDispayer()}
    </div>
    )
  } else {
    return(
      <div className="bottombar" style={{backgroundImage: `url(${BackgroundImage})`}}>
      <NavLink to='/top' id="disable-deco">
        {/*<img src={imgForLogo} alt="alt img for logo" className="imgForLogo"/>*/}
        <h1 className='main-title' style={{color: this.state.titleColor, fontWeight: this.state.titleWeight}} ><span id="key">{parsedTitle}</span></h1>
<div className='teate'>
        <div className='before-after-line' style={{ backgroundColor: this.state.subtitleColor }}></div><div><h2 className='subtitle' style={{color: this.state.subtitleColor}}>{this.state.subtitle}</h2></div><div className='before-after-line' style={{ backgroundColor: this.state.subtitleColor }}></div>
</div>
      </NavLink>
        {this.mobileNavDispayer()}
      </div>
    )
  }
}
  render() {

      if(!this.state.dataIsReady){
      return<div></div>;
    }

    return <div className="app-div">
      <BrowserRouter>
        <div>
          <header>
            {this.topbarDisplayer()}
            {this.isMobileTitle()}
          </header>
          <div className="container">
            <div className="row">
                {/*<div className="col-lg-12 contactBox-pad">*/}
                {/*</div>*/}
              <div className=" col-lg-12">
                <div className="row">
                  <div className="col-xl-9">

                    <main>
                        <ContactBox itemsdata={this.state.itemsdata} />

                      <Switch>
                        {/*Redirect to deafult view:*/}
                        <Route exact path='/' component={() => <Redirect to='/top'/>}/>
                        {this.topComponentChooser()}
                        {/*<Route exact path='/top' render={() => <Top topData={this.state.itemsdata}/>}/>*/}
                        <Route exact path='/guide' render={() => <Guide data={this.state.guideFaq}/>}/>
                        <Route exact path='/contact' render={() => <Contact/>}/>
                        <Route exact path='/about' render={() => <Todo/>}/>
                      </Switch>
                    </main>
                  </div>

                  <div className="col-xl-3">
                      <RecommendationBox recommendationList={this.state.recommendationData} />

                      <aside className = "site-side-bar">
                      <Map data={this.state.itemsdata} dataLoad={this.state.locationCoordinatesDefault}/>
                    </aside>
                    <Stats itemsdata={this.state.itemsdata} typeOfWorker={this.state.typeOfWorker}/>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Footer/>

        </div>
      </BrowserRouter>

    </div>
  }
}
export default App;
