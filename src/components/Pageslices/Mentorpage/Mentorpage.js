import React, { useEffect, useState } from 'react';
import { faChalkboardTeacher, faUsers, faBook, faBriefcase, faHandshake, faAward, faLaptopCode, faProjectDiagram, faMoneyBillWave, faUsersCog, faCertificate } from '@fortawesome/free-solid-svg-icons';
import styles from './Mentorpage.module.css';
import image1 from '../../../assets/AssetsOfDetailsPage/masterclass/5.png';
import image2 from '../../../assets/AssetsOfDetailsPage/masterclass/6.png';
import image3 from '../../../assets/AssetsOfDetailsPage/masterclass/7.png';
import instagramImage from '../../../assets/AssetsOfDetailsPage/masterclass/Instagram_logo_2016.svg.png';
import linkedIn from '../../../assets/AssetsOfDetailsPage/masterclass/official-linkedin-logo.png';
import featuredIn from '../../../assets/AssetsOfDetailsPage/masterclass/Featured.webp';
import whatsApp from '../../../assets/AssetsOfDetailsPage/masterclass/whatsapp-logo.png';
import EnrollButton from './../Enrollbutton/Enrollbutton';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Mentorpage = () => {
    const images = [image1, image2, image3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const autoSlideInterval = 4000;

    // Change to next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Change to previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Auto slide feature
    useEffect(() => {
        const timer = setInterval(nextImage, autoSlideInterval);
        return () => clearInterval(timer); // Cleanup timer
    }, [currentImageIndex]);

    return (
        <div className={styles.Mentorpage}>
            {/* Section for unlocking bonuses */}
            <div className={`${styles.background} p-4 rounded shadow`}>
                <h2 className="text-center mb-4 fs-1 fs-5">
                    Unlock Bonuses worth <span className="text-primary">₹ 17000 /-</span>
                </h2>

                <div className={styles.cards}>
                    <div className="row justify-content-center">
                        {[image1, image2, image3].map((image, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                                <div className="text-center p-2 mb-0" style={bonusCardHeaderStyle}>
                                    <strong style={{ fontSize: '16px', color: 'white' }}>Bonus {index + 1}</strong>
                                </div>
                                <div className="card" style={bonusCardStyle}>
                                    <img loading="lazy" src={image} className="card-img-top" alt={`Bonus ${index + 1}`} />
                                    <div className="card-body text-center" style={{ backgroundColor: '#e5e0ff' }}>
                                        <p className="card-text">
                                            <span style={{ textDecoration: 'line-through', fontSize: '24px', color: 'black' }}>
                                                ₹{(4999 + index * 1000)}
                                            </span>
                                            <span style={{ color: '#553cdf ', paddingLeft: '25px', fontSize: '24px', fontWeight: '600' }}>
                                                Free
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enroll Button */}
                <div className="d-flex justify-content-center mt-2">
                    <EnrollButton label="Unlock Bonuses" />
                </div>
            </div>

            {/* Section with 3 boxes */}
            <div>
                <p className="text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold', position: 'relative', top: '25px' }}>
                    What Makes <span style={{ color: '#ff5003' }}>SocialPrachar</span> Stand Out?
                </p>
                <div className="container my-5">
                    <div className="row">
                {[
                    { text: 'Job-Ready Curriculum Designed by Industry Experts from IIT & IIM Alumni', icon: faChalkboardTeacher },
                    { text: 'Internship + Placement-Driven Learning Model', icon: faBriefcase },
                    { text: 'Unlimited Placement Support Till You Get Placed', icon: faHandshake },
                    { text: 'Award-Winning Institute with 16,000+ Alumni', icon: faAward },
                    { text: 'Flexible Learning Modes with Mentorship & Tools', icon: faLaptopCode },
                    { text: 'Real-Time Projects That Build Your Portfolio', icon: faProjectDiagram },
                    { text: 'Stipend Opportunities Up to ₹45,000 During Internship', icon: faMoneyBillWave },
                    { text: 'Dedicated HR & Corporate Relations Team for Job Support', icon: faUsersCog },
                    { text: 'Access to Certifications from IBM, Microsoft & AWS', icon: faCertificate },
                ].map(({ text, icon }, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-12 mb-4 d-flex justify-content-center">
                        <div
                            className="box p-4 d-flex flex-column align-items-center"
                            style={{
                                border: '2px solid #4a5759',
                                borderRadius: '15px',
                                textAlign: 'center',
                                maxWidth: '280px',
                                width: '100%',
                                padding: '25px 20px',
                                boxShadow: '#caf0f8',
                               
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                lineHeight: '1.4',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 12px 20px rgba(255, 80, 3, 0.5)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 15px rgba(255, 79, 3, 0)';
                            }}
                        >
                            {/* Box icon */}
                            <FontAwesomeIcon
                                icon={icon}
                                style={{ fontSize: '40px', color: '#ff5003' }}
                                className="mb-3"
                            />
                            {/* Box content */}
                            <h4
                                className="mb-0"
                                style={{ color: '#333', fontSize: '15px', fontWeight: '600', whiteSpace: 'normal' }}
                            >
                                {text}
                            </h4>
                        </div>
                    </div>
                ))}
                    </div>
                </div>

            </div>
            {/* Section with 3 boxes end  */}



            {/* Mentor Profile Section */}
            <div className={styles.mentorInfo}>
                <div className={styles.mentorProfile}>

                    {/* Carousel for mentor images */}
                    <img
                        loading="lazy" 
                        src={images[currentImageIndex]}
                        alt={`Mentor ${currentImageIndex + 1}`}
                        className={styles.profileImage}
                    />

                    {/* Carousel navigation */}
                    <button onClick={prevImage} className={styles.prevButton}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={nextImage} className={styles.nextButton}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                {/* Mentor Bio Section */}
                <div className={styles.mentorBio}>
                    <div className={styles.bioContent}>
                        <h3 className={styles.bioTitle}>Meet your Mentor</h3>
                        <p className={styles.bioText}>
                            Our certified trainers with 7+ years of industry experience ensure hands-on learning with top faculty and excellent lab infrastructure. Our HR team supports job placements, and you’ll have 24/7 access to an online portal for learning at your convenience.
                        </p>
                        <p className={styles.bioText}>
                            We help prepare your CV/Resume for interviews and enhance your chances of securing a job. Having trained over 15,000 professionals in fields like Digital Marketing, Data Science, Full Stack Development, AWS + DevOps, and AI, we focus on results.
                        </p>
                        <p className={styles.bioText}>
                            Our curriculum balances 30% theory and 70% practical sessions, with mentors available throughout the day for doubt-solving support.
                        </p>
                    </div>

                    {/* Social Media Statistics */}
                    <div className={styles.mentorStats}>
                        {[
                            { image: instagramImage, followers: '13.7K+', label: 'Followers' },
                            { image: linkedIn, followers: '6k+', label: 'Followers' },
                            { image: whatsApp, followers: '5K+', label: 'Subscribers' },
                        ].map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <img loading="lazy" src={stat.image} alt="" className={styles.statIcon} />
                                <p>{stat.followers}</p>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Featured In Section */}
                    <p className={styles.featuredHeading}><span style={{ color:'#ff5003'}}>Social Prachar</span> Got Featured in</p>
                    <div className={styles.featured}>
                        <div className={styles.logos}>
                            <img loading="lazy" src={featuredIn} alt="Featured Logo" className={styles.featuredImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styling for bonus card header
const bonusCardHeaderStyle = {
    backgroundColor: '#553cdf',
    border: '2px dashed #553cdf',
    borderBottom: 'none',
    width: '90%',
    margin: '0 auto',
    borderRadius: '10px 10px 0 0',
};

// Styling for bonus card
const bonusCardStyle = {
    border: '2px dashed #553cdf',
    borderTop: 'none',
    width: '90%',
    margin: '0 auto',
    borderRadius: '0 0 10px 10px',
};

export default Mentorpage;