import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'
import footerLogo from '../../assets/images/10Logo.svg'

export default class Footer extends React.Component {


  render() {
    return <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className='footer'>
              <div className="right-footer">
                <img className='footer-logo' src={footerLogo} alt=""/>
                <h4>הממולצים ביותר</h4>
              </div>
              <div className="mid-footer">
                <ul>
                  <li>
                  <NavLink to='/top' style={{color: "white", fontWeight: "normal", textDecoration: "none"}}><span></span>המומלצים</NavLink>
                  </li>
                  <li>
                  <NavLink to='/about' style={{color: "white", fontWeight: "normal", textDecoration: "none"}}><span></span>תנאי שירות ומדיניות</NavLink>
                  </li>
                  <li>
                    <NavLink to='/guide' style={{color: "white", fontWeight: "normal", textDecoration: "none"}}><span></span>שאלות נפוצות</NavLink>
                  </li>
                </ul>

              </div>
              <div className="left-footer">
                <ul>
                  <li>
                    <NavLink to='/contact' style={{color: "white", fontWeight: "normal", textDecoration: "none"}}><span></span>צור קשר</NavLink>
                  </li>
                  <li>
                    <NavLink to='/contact' style={{color: "white", fontWeight: "normal", textDecoration: "none"}}><span></span>אודות</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className='footer-bottom text-center'>כל הזכויות שמורות לאתר <img src={footerLogo} alt="top 10 logo" className="footer-logo-image"/> המומלצים ביותר &copy;2018</div>
          </div>
        </div>
      </div>
    </footer>
  }
}