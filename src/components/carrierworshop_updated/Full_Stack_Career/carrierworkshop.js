import React, { useState } from 'react';
import { useDateContext } from '../../Forms/DateContext';
import styles from './carrier.module.css';
import ceoimg from "../../../assets/careerworkshop/ceoImage-removebg-preview.png";
import herosection from "../../../assets/homeReplaceImage.png";
import Award1 from "../../../assets/CareerAward_Awards/SPAward1.jpg";
import Award2 from "../../../assets/CareerAward_Awards/SPAward2.jpg";
import Award3 from "../../../assets/CareerAward_Awards/SPAward3.jpg";
import Award4 from "../../../assets/CareerAward_Awards/SPAward4.jpg";
import Award5 from "../../../assets/CareerAward_Awards/SpAward5.jpg";
import Award6 from "../../../assets/CareerAward_Awards/SPAward6.jpg";
// import Award7 from "../../../assets/CareerAward_Awards/SPAward4.jpg";
import testimonial1 from "../../../assets/digital_marketing_profiles/60.png";
import testimonial2 from "../../../assets/digital_marketing_profiles/61.png";
import testimonial3 from "../../../assets/digital_marketing_profiles/62.png";
import testimonial4 from "../../../assets/digital_marketing_profiles/63.png";
import testimonial5 from "../../../assets/digital_marketing_profiles/64.png";
import testimonial6 from "../../../assets/digital_marketing_profiles/65.png";
import testimonial7 from "../../../assets/digital_marketing_profiles/66.png";
import testimonial8 from "../../../assets/digital_marketing_profiles/67.png";
import testimonial9 from "../../../assets/digital_marketing_profiles/68.png";
import testimonial10 from "../../../assets/digital_marketing_profiles/69.png";
import testimonial11 from "../../../assets/digital_marketing_profiles/70.png";
import testimonial12 from "../../../assets/digital_marketing_profiles/71.png";
import testimonial13 from "../../../assets/digital_marketing_profiles/72.png";
import testimonial14 from "../../../assets/digital_marketing_profiles/73.png";
import Button from "../../Career_workshop/ButtonDemoBooking/Button"
import Button2 from "./BookDemo"
import Footer from "../../footer/footer"
import Testimonials from './testmonails';
import SuccessStories from "../../../components/newsArticles/newsOnUs"

const CareerWorkshop = () => {
  const { selectedDate } = useDateContext();
  const [registrationModal, setRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    course: '',
    name: '',
    email: '',
    phone: ''
  });
  const [openFaq, setOpenFaq] = useState('faq1');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setRegistrationModal(false);
  };

  const testimonials = [
    testimonial1,
    testimonial2,
    testimonial3,
    testimonial4,
    testimonial5,
    testimonial6,
    testimonial7,
    testimonial8,
    testimonial9,
    testimonial10,
    testimonial11,
    testimonial12,
    testimonial13,
    testimonial14
  ];

  const awardImages = [
    Award1,
    Award2,
    Award3,
    Award4,
    Award5,
    Award6
  ];

  return (
    <div className={styles.careerWorkshop}>
      {/* Hero Section */}
      <section className={styles.heroImageSection}>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroOverlay}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 text-center">
                  <h1 className={styles.heroOverlayTitle}>
                    Build a High-Growth Career in Full Stack Development <span className={styles.mentorName}>   MERN + Java/Python</span> 
                  </h1>
                  <p className={styles.heroOverlaySubtitle}>
                    Discover how you can launch a powerful tech career in Full Stack Development using MERN, Java, or Python — with practical skills, real-world projects, and job-ready confidence.

                  </p>
                  <p className={styles.heroOverlaySubtitle}>
                    Join our exclusive session led by  <span className={styles.mentorName}> Mahesh Babu Channa </span>, an IIM alumnus and industry mentor with 12+ years of experience in tech training and career transformation.

                    – an industry expert with 8+ years of experience!
                  </p>
                  <p className={styles.heroOverlayNote}>
                    Discover how you can build a rewarding  <span  className={styles.mentorName} > Full Stack career </span>  — starting from zero, with clear steps, job-ready skills, and proven mentorship.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={herosection}
            alt="Insurance Career Hero"
            className={styles.heroBackgroundImage}
          />
        </div>
      </section>

      {/* Webinar Scheduling Section */}
      <section className={styles.webinarScheduleSection}>
        <div className="container">
          <div className="row align-items-center">
            <div >
              <div className={styles.webinarInfo}>
                <p className={styles.webinarText}>Free 90-Minute Webinar is scheduled on</p>
                {/* <p className={styles.date}>{selectedDate || '29th June 2025 @ 10 AM'}</p> */}
                {/* <button
                  className={`btn ${styles.registerBtn}`}
                  onClick={() => setRegistrationModal(true)}
                >
                  REGISTER NOW
                </button> */}
                <Button2 />


                <p className={styles.limitedSeats}>Limited Seats Available!</p>
              </div>
            </div>
            {/* <div className="col-12 col-lg-6 order-lg-2 order-1">
              <div className={styles.webinarImageContainer}>
                <img
                  src={ceoimg}
                  alt="Insurance Professional"
                  className={styles.webinarImage}
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className={styles.targetAudience}>
        <div className="container">
          <h2 className={styles.sectionTitleWithUnderline}>This Masterclass is for You, If You Are...</h2>
          <div className="row">
            {[
              " A student or fresher confused about which development stack to choose in 2025?",
              " A working professional in a non-tech or stagnant role, planning a career switch into software?",
              "A coding enthusiast who knows HTML, Python, or Java but unsure how to build full-stack projects  ",
              "Already learning some tech but lacking direction or confidence to attend interviews"
            ].map((text, index) => (
              <div key={index} className="col-12 col-md-6 d-flex align-items-start mb-4">
                <div className={styles.numberArrow}>{index + 1}</div>
                <p className={styles.numberArrowText}>{text}</p>
              </div>
            ))}
          </div>
          <p className={styles.webinarForYouText}><em>If yes, this Masterclass is for you!</em></p>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className={styles.discoverSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>In This 90-Minute FREE Webinar, You Will Discover:</h2>
          <div className={styles.discoverList}>
            {[
              "How to start a career in Full Stack Development using Java/Python or MERN stack ",
              "The difference between Java-based, Python-based, and MERN stack career tracks",
              " How to build real-time projects that impress hiring managers",
              "Job interview techniques and resume tips for freshers & working professionals",
              "The 6-month roadmap to become a Full Stack Developer",
              " How Mahesh Babu Channa’s mentorship has helped 1000s land jobs",
              " Real student success stories who started from scratch and got placed"
            ].map((item, index) => (
              <div key={index} className={styles.discoverItem}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className={styles.testimonialsSection}>
        <div className="container-fluid">
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          <div className={styles.testimonialWrapper}>
            <div className={styles.testimonialTrack}>
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className={styles.testimonialItem}>
                  <img
                    src={testimonial}
                    alt={`Testimonial ${index + 1}`}
                    className={styles.testimonialImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <SuccessStories/>



      <Testimonials/>

      {/* Meet Your Host Section */}
      <section className={styles.hostSection}>
        <div className="container">
          <h2 className={styles.sectionTitleWithUnderline}>Meet Your Host</h2>
          <div className="row align-items-center">
            
            <div className="col-12 col-lg-4 order-lg-1 order-1">
              <div className={styles.hostImageContainer}>
                <img
                  src={ceoimg}
                  alt="Mahesh Babu Channa"
                  className={styles.hostImage}
                />
              </div>
            </div>
            <div className="col-12 col-lg-8 order-lg-2 order-2">
              <div className={styles.hostInfo}>
                <h3 className={styles.mentor}> Mahesh Babu Channa</h3>
                <p className={styles.mentordescription1}>Career Mentor | IIM Alumnus | Founder – Vajra.ai, Finversity, SocialPracha</p>
                <p>
                  Hi, I’m Mahesh Babu Channa, an IIM alumnus and Founder of Vajra,ai, Finversity, SocialPrachar, one of India’s top EdTech platforms. With 12+ years of experience and over 8,000 students trained, I’ve helped freshers, job seekers, and working professionals build rewarding careers in Data Science, AI, Full Stack Development, Digital Marketing, and more.
                  These free career orientation masterclasses are designed to give you clarity and direction in a fast-changing job market. Whether you’re confused after graduation, restarting after a break, or stuck in the wrong role — I’ll show you the exact steps to start a high-growth career with or without a tech background.
                </p>
                <p>
                  From guiding students who had no clue to helping them land dream jobs — I’ve seen transformations happen. Now it's your turn.
                  Join the session and let’s figure out your best-fit career path together.
                  Your career deserves the right start

                </p>
                <p>
                  — Mahesh Babu Channa <br></br>
                  Career Mentor | EdTech Leader | Digital Trainer
                </p>
                <div className={styles.hostStats}>
                  <div className={styles.statItem}>
                    <strong>12+</strong>
                    <span className={styles.sucesstext}>Years of Experience</span>
                  </div>
                  <div className={styles.statItem}>
                    <strong>8000+</strong>
                    <span className={styles.sucesstext}>Professionals Mentored</span>
                  </div>
                  <div className={styles.statItem}>
                    <strong>100%</strong>
                    <span className={styles.sucesstext}>Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className={styles.bonusSection}>
        <div className="container">
          <h2 className={styles.sectionTitleWithUnderline}>Bonus: Free Career Consultation for Attendees!</h2>
          <p className={styles.bonusText}>
            All webinar attendees will get a free 1-3 Hour Career Consultation Call with Mahesh Babu Channa to chart their
            career path in the insurance industry. Session Limit: 100 people.
          </p>
          {/* <button
            className={`btn ${styles.registerBtn}`}
            onClick={() => setRegistrationModal(true)}
          >
            REGISTER NOW
          </button> */}
          <Button2 />

        </div>
      </section>

      {/* Awards & Recognitions Carousel */}
      <section className={styles.awardsSection}>
        <div className="container-fluid">
          <h2 className={styles.sectionTitle}>Awards & Recognitions</h2>
          <div id="awardsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {awardImages.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img
                    src={image}
                    className={`d-block w-100 ${styles.awardImage}`}
                    alt={`Award ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Previous Button */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#awardsCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
                style={{ filter: 'invert(1)' }}
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>

            {/* Next Button */}
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#awardsCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
                style={{ filter: 'invert(1)' }}
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>FAQ</h2>
          <div className={styles.faqContainer}>
            {[
              {
                id: 'faq1',
                question: 'Who can attend this masterclass?',
                answer:
                  'Anyone — freshers, graduates, job seekers, coders, and career switchers are all welcome.'
              },
              {
                id: 'faq2',
                question: 'Do I need prior coding knowledge?',
                answer:
                  'Basic knowledge helps, but not mandatory. We’ll show you how to start from scratch and build full-stack projects confidently.'
              },
              {
                id: 'faq3',
                question: 'Is the session free?',
                answer:
                  'Yes, it’s 100% FREE. No hidden charges. Just value-packed guidance to kickstart your career.'
              },
              {
                id: 'faq4',
                question: 'Will I get a certificate?',
                answer:
                  'Yes, a Certificate of Participation will be given after the session.'
              },
              {
                id: 'faq5',
                question: 'Will the session be recorded?',
                answer:
                  'No, it’s a live-only experience. No replays. Block your time to attend live.'
              },
              {
                id: 'faq6',
                question: 'Are there any bonuses?',
                answer: `Yes! You’ll get:

- Developer Career Kickstart Kit
- Resume + GitHub Project Templates
- Full Stack Career Roadmap (PDF)
- Interview Prep Material + Resource Links
- 50+ ChatGPT Prompts for Full Stack Projects & Job Search`
              },
              {
                id: 'faq7',
                question: 'How do I register?',
                answer:
                  'Click the ‘Reserve My Free Seat’ button and fill in your details. Session access will be sent via email and WhatsApp.'
              },
              {
                id: 'faq8',
                question: 'What will I gain from attending this?',
                answer: [
                  '- Clarity on Full Stack career paths',
                  '- Complete clarity on Java/Python/MERN full stack career options',
                  '- Confidence to build real projects',
                  '- Mentorship and peer support',
                  '- A step-by-step game plan for landing your first or next tech job'
                ]
              }
            ].map(({ id, question, answer }) => {
              const isOpen = openFaq === id;
              return (
                <div className={styles.faqItem} key={id}>
                  <button
                    className={`${styles.faqQuestion} ${isOpen ? styles.faqQuestionActive : ''}`}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : id)}
                    aria-expanded={isOpen}
                  >
                    {question}
                    <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconRotated : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}>
                    <div className={styles.faqAnswerContent}>
                      {Array.isArray(answer) ? (
                        <ul>
                          {answer.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ whiteSpace: 'pre-line' }}>{answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Registration Modal */}
      {/* {registrationModal && (
        <div className={`modal fade show ${styles.registrationModal}`} style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">REGISTER NOW</h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setRegistrationModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Course</option>
                      <option value="Full Stack Career">Full Stack Career</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className={`btn ${styles.bookNowBtn} w-100`}>
                    BOOK NOW
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {registrationModal && <div className="modal-backdrop fade show"></div>} */}
      <Footer />
    </div>

  );
};

export default CareerWorkshop;