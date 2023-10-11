import React from "react";
import "./Footer.scss";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <>
      <footer className="footer-sec">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <h4>BIGBASKET</h4>
              <ul>
                <li>About Us</li>
                <li>In News</li>
                <li>Green bigbasket</li>
                <li>Privacy Policy</li>
                <li>Affiliate</li>
                <li>Terms and Conditions</li>
                <li>Careers At bigbasket</li>
                <li>bb Instant</li>
                <li>bb Daily</li>
                <li>bb Blog</li>
                <li>bbnow</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>HELP</h4>
              <ul>
                <li>FAQs</li>
                <li>Contact Us</li>
                <li>bb Wallet FAQs</li>
                <li>bb Wallet T&Cs</li>
                <li>Vendor Connect</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>DOWNLOAD OUR APP</h4>
              <div className="footer-img">
                <img
                  src="https://www.bbassets.com/monsters-inc/static/images/play_store.f6f3c9c0.png"
                  alt=""
                ></img>
                <img
                  src="https://www.bbassets.com/monsters-inc/static/images/app_store.86a85d57.png"
                  alt=""
                ></img>
              </div>
            </div>
            <div className="footer-col">
              <h4>DOWNLOAD OUR APP</h4>
              <div className="social-icon">
                <div className="fb-icon">
                  <FacebookIcon className="icons"/>
                </div>

                <div className="pint-icon">
                  <PinterestIcon className="icons"/>
                </div>

                <div className="Twitter-icon">
                  <TwitterIcon className="icons"/>
                </div>

                <div className="insta-icon">
                  <InstagramIcon className="icons"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
