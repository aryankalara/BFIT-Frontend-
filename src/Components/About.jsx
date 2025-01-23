import aboutimage from '../images/about.png'
import '../style.css';

const About = () => {
    return (
        <div id='about'>
            <div className='about-image'>
                <img src={aboutimage} alt=''/>
            </div>
            <div className='about-text'>
                <h1>LEARN MORE ABOUT US</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. France repellat necessitatibus dolor ut nesciut his ipsum laborsam</p>
                <button>READ MORE</button>
            </div>
        </div>
    );
}

export default About;
