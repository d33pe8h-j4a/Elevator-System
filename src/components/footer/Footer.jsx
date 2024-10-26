import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import FlagImg from "../../assets/flag.jpg";

function Footer() {
    return (
        <>
            <hr></hr>
            <section className="footer-section">
                <div className="footer-container">
                    <div className="left-side-contents">
                        <span>Copyright &copy; 2024 Deepesh Jha</span>
                        <nav className="navbar">
                            <ul className="nav-items">
                                <li>
                                    <Link to="#">Help Center</Link>
                                </li>
                                |
                                <li>
                                    <Link to="#">Terms</Link>
                                </li>
                                |
                                <li>
                                    <Link to="#">Privacy Policy</Link>
                                </li>
                                |
                                <li>
                                    <Link to="#">Bug Bounty</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <a href="#" className="region">
                        <img src={FlagImg} alt="Region" className="flag-img" />
                        <span>INDIA</span>
                    </a>
                </div>
            </section>
        </>
    );
}

export default Footer;
