import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__block">
                        <h4 className="footer__title">Location</h4>
                        <address className="footer__address">
                            <div>Melrose Place</div>
                            <div>Beverly Hills, CA 90210</div>
                        </address>
                    </div>

                    <div className="footer__block">
                        <h4 className="footer__title">Share with Love</h4>
                        <div className="social social--footer">
                            <a className="social__item" target="_blank">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a className="social__item" target="_blank">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a className="social__item" target="_blank">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>

                    </div>

                    <div className="footer__block">
                        <h4 className="footer__title">About Us</h4>
                        <div className="footer__text">
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <div className="copyright__text">
                        <div>Copyright © 2015 PizzaWorld. All Rights Reserved</div>
                        <div> Made <span>by  Denis Lavrov</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
