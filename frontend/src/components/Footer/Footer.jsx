import React from 'react';
import {SoundCloudLogo,FacebookLogo,BeatstarsLogo,SpotifyLogo,InstagramLogo,YoutubeLogo,logo_min} from "../../Img-bundle";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
                    <div className="footer__container max-layout-width">
                        <div className="footer__logo lable"><a href="#">
                            <img src={logo_min} lt="logo"></img>
                            <span>Ankean beats</span></a>
                        </div>

                        <div className="footer__link">
                            <ul className="footer__menu">
                                <li><Link to=''>Home</Link></li>
                                <li><Link to='/beats'>Beats</Link></li>
                                <li><Link to='/about'>About</Link></li>
                            </ul>
                            <ul className="footer__menu">
                                <li><Link to="/license_info">License info</Link></li>
                                <li><Link to="faq">FAQ</Link></li>
                                <li><Link to="contact">Contact</Link></li>
                            </ul>
                            <ul className="footer__menu">
                                <li><a href="/faq/privacy">Privacy policy</a></li>
                            </ul>
                        </div>

                        <div className="footer__social-media">
                            <a href="https://soundcloud.com/" target="_blank"><img src={SoundCloudLogo}
                                                                                   alt="Soundcloud"/></a>
                            <a href="https://www.beatstars.com/" target="_blank"><img src={BeatstarsLogo}
                                                                                      alt="Beatstars"/></a>
                            <a href="https://www.facebook.com/" target="_blank"><img src={FacebookLogo} alt="Facebook"/></a>
                            <a href="https://www.spotify.com/" target="_blank"><img src={SpotifyLogo}
                                                                                    alt="Spotify"/></a>
                            <a href="https://www.instagram.com/" target="_blank"><img src={InstagramLogo}
                                                                                      alt="Instagram"/></a>
                            <a href="https://www.youtube.com/" target="_blank"><img src={YoutubeLogo}
                                                                                    alt="Youtube"/></a>
                        </div>
                    </div>
        </footer>
    );
}
export default Footer;