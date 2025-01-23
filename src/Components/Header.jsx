import { Link } from 'react-router-dom';
import '../style.css';
function Header() {
    return (
        <div id="main">
            <div className="name">
                <h2>STEP UP YOUR</h2>
                <h1><span>FITNESS</span> WITH US</h1>
                <p className="details">Build Your Body And Fitness With Professional Touch</p>

                <div className="header-btns">
                    <Link to="/form" target="_blank" className="header-btn">START TODAY</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
