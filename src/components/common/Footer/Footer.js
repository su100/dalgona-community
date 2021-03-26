import React from 'react';
import { Link } from 'react-router-dom';
import instagram from 'images/instagram.svg';
import twitter from 'images/twitter.svg';
import facebook from 'images/facebook.svg';
import youtube from 'images/youtube.svg';
import './Footer.scss';

const Footer = ({ nofooter, isLogin }) =>
    !nofooter && (
        <div className={isLogin ? 'footer login' : 'footer'}>
            <div className="footer-icon">
                <img src={instagram}></img>
                <img src={twitter}></img>
                <img src={facebook}></img>
                <img src={youtube}></img>
            </div>
            <div className="footer-content">
                <span>
                    <a href="http://mapsosa.me" target="_blank" rel="noreferrer">
                        회사소개
                    </a>{' '}
                    | <Link to="/policy/service">이용약관</Link> | <Link to="/policy/privacy">개인정보취급정책</Link>
                </span>
            </div>
            <div className="footer-information">
                <span>
                    (주)맙소사대표:박동근|사업자등록번호:538-86-01639|주소:서울특별시성북구고려대로27길4석실빌딩3층|TEL:02-922-0094
                </span>
            </div>
        </div>
    );

export default Footer;
