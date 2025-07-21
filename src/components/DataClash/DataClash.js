import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './dataclash.module.css';

const DataClash = () => {
  useEffect(() => {
    document.title = "DataClash 2.0: A Multi-Day Data Science Hackathon | Social Prachar";
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    passoutYear: '',
    graduationType: '',
    collegeName: '',
    languages: []
  });

  const prizes = [
    {
      position: "1st",
      amount: "₹15,000",
      description: "Cash Prize + Lifetime Social Prachar Subscription + Certificate",
      icon: "🏆",
      bgColor: styles.prizeGold,
      borderColor: styles.borderGold
    },
    {
      position: "2nd",
      amount: "₹10,000",
      description: "Cash Prize + Lifetime Social Prachar Subscription + Certificate",
      icon: "🥈",
      bgColor: styles.prizeSilver,
      borderColor: styles.borderSilver
    },
    {
      position: "3rd",
      amount: "₹8,000",
      description: "Cash Prize + Lifetime Social Prachar Subscription + Certificate",
      icon: "🥉",
      bgColor: styles.prizeBronze,
      borderColor: styles.borderBronze
    }
  ];

  const participationSteps = [
    {
      step: "Step 1:",
      title: "Register For DataClash 2.0",
      description: "Fill the registration form below",
      icon: "👤",
      bgColor: styles.stepPurple
    },
    {
      step: "Step 2:",
      title: "Provide Required Details",
      description: "Complete all necessary fields for registration",
      icon: "✅",
      bgColor: styles.stepBlue
    },
    {
      step: "Step 3:",
      title: "Join WhatsApp Community",
      description: "Receive our WhatsApp community link",
      icon: "💬",
      bgColor: styles.stepGreen
    },
    {
      step: "Step 4:",
      title: "Stay Updated",
      description: "Join our community for all updates",
      icon: "👥",
      bgColor: styles.stepOrange
    },
    {
      step: "Step 5:",
      title: "Participate in DataClash",
      description: "Compete in data science challenges",
      icon: "▶️",
      bgColor: styles.stepRed
    },
    {
      step: "Step 6:",
      title: "Win Exciting Prizes",
      description: "Earn rewards and recognition",
      icon: "✨",
      bgColor: styles.stepPink
    }
  ];

  const languages = ["Python", "Machine Learning", "Stacks", "NLP", "Deep Learning", "Computer Vision"];

  const faqs = [
    {
      question: "Who can participate in DataClash 2.0?",
      answer: "Any student graduating in 2024, 2025, or 2026 with knowledge in Python, ML, Stacks, NLP, DL, or Computer Vision is eligible."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, participation is completely free."
    },
    {
      question: "What is the format of the hackathon?",
      answer: "It's a 3-day format: Days 1-2 (August 18-19, 2025) consist of online data science challenges, and Day 3 (August 23, 2025) is an offline finale at SocialPrachar HQ, KPHB, Hyderabad."
    },
    {
      question: "Do I need to attend all days?",
      answer: "Yes, participation in all days is mandatory to qualify for the finale."
    },
    {
      question: "Where is the offline finale?",
      answer: "At SocialPrachar HQ, KPHB, Hyderabad (address shared via WhatsApp/email)."
    },
    {
      question: "What are the prizes?",
      answer: "1st: ₹15,000 + Lifetime SP Subscription; 2nd: ₹10,000 + Lifetime SP Subscription; 3rd: ₹8,000 + Lifetime SP Subscription."
    },
    {
      question: "Will certificates be provided?",
      answer: "Yes, all participants completing all days receive a Participation Certificate. Winners get a Winner Certificate."
    },
    {
      question: "How to register?",
      answer: "Complete the registration form. Shortlisted participants will be contacted via WhatsApp/email."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSelectAllLanguages = (checked) => {
    setFormData(prev => ({ ...prev, languages: checked ? [...languages] : [] }));
  };

  const showToast = (message, type = 'success') => {
    const existingToasts = document.querySelectorAll(`.${styles.toast}`);
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `${styles.toast} ${styles[`toast-${type}`]}`;
    toast.innerHTML = `
      <div class="${styles.toastContent}">
        <span>${message}</span>
        <button class="${styles.toastClose}" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 5000);
  };

  const saveToGoogleSheet = async (data) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxa13At4amCy-x3MiZs_U23BeteTd0c0sgOLJsXA43ZwmJX7OaLTMsOZlDgDzSUGKk/exec';
    try {
      if (!data.name || !data.email || !data.whatsapp) {
        throw new Error('Missing required fields: name, email, or whatsapp');
      }
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'cors',
        body: formData
      });
      const responseText = await response.text();
      try {
        const result = JSON.parse(responseText);
        if (result.status === 'error') {
          throw new Error(result.message || 'Unknown server error');
        }
        return result;
      } catch (err) {
        if (response.ok) {
          return { status: 'success', message: 'Registration submitted successfully', rawResponse: responseText };
        }
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Error submitting to Google Sheet:', error);
      throw error.name === 'TypeError' ? new Error('Network error: Please check your connection or script URL.') : error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validationErrors = [];
      if (!formData.name.trim()) validationErrors.push('Please enter your full name');
      if (!formData.email.trim()) validationErrors.push('Please enter your email address');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) validationErrors.push('Please enter a valid email address');
      if (!formData.whatsapp.trim()) validationErrors.push('Please enter your WhatsApp number');
      else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.whatsapp)) validationErrors.push('Please enter a valid WhatsApp number');
      if (!formData.passoutYear) validationErrors.push('Please select your passout year');
      if (!formData.graduationType) validationErrors.push('Please select your graduation type');
      if (!formData.collegeName.trim()) validationErrors.push('Please enter your college name');
      if (formData.languages.length === 0) validationErrors.push('Please select at least one skill');
      if (validationErrors.length > 0) throw new Error(validationErrors[0]);
      const result = await saveToGoogleSheet(formData);
      showToast("🎉 Registration Successful! Redirecting to WhatsApp community...", 'success');
      setIsFormOpen(false);
      setFormData({
        name: '', email: '', whatsapp: '', passoutYear: '', languages: [], graduationType: '', collegeName: ''
      });
      window.open('https://chat.whatsapp.com/CsiBkweBLZO3d2kuNv18GI?mode=ac_t', '_blank');
    } catch (error) {
      showToast(`❌ ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer} style={{ background: "linear-gradient(to top, rgb(107, 86, 229) 5%, rgb(244, 240, 240) 100%)", }}>
      <div className="container mx-auto px-4 py-8">
        <div className={`text-center mb-12 ${styles.fadeIn}`}>
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <span className={`${styles.headerIcon} ${styles.bounce}`}>💻</span>
            <h1 className={styles.mainTitle}>
              DataClash 2.0
            </h1>
            <span className={`${styles.headerIcon} ${styles.bounce} ${styles.bounceDelay}`}>🏆</span>
          </div>
          <p className={styles.subtitle}>by Social Prachar</p>
          <p className={styles.tagline}>Join the battle of minds ✨, solve real-world problems 🔮 and win big rewards 🏆!</p>
          <div className="d-flex flex-wrap justify-content-center gap-4 mb-8">
            <span className={`${styles.badge} ${styles.badgePurple}`}>
              📅 Registration Open
            </span>
            <span className={`${styles.badge} ${styles.badgeGreen}`}>
              👥 10000+ Data Scientists
            </span>
            <span className={`${styles.badge} ${styles.badgeOrange}`}>
              🎁 ₹33,000+ Cash Prize Pool
            </span>
          </div>
          <motion.button
            onClick={() => setIsFormOpen(true)}
            className={`${styles.primaryButton} ${styles.pulseAnimation}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🏆</span>
            Register for DataClash
            <span>⚡</span>
          </motion.button>
        </div>

        <div className={styles.whySection}>
            <h2 className={styles.whyTitle}>
            Why DataClash 2.0?
            </h2>
            <p className={styles.whyDescription}>
            India's premier data science hackathon powered by <span className={styles.whyHighlight}>Vajra AI</span>. Join thousands of data enthusiasts in solving real-world industry problems through our unique <span className={styles.whyHighlight}>hybrid format</span>. This isn't just a competition – it's your gateway to the data science world, build revolutionary solutions, and compete with the nation's top talent.
            </p>
            <p className={styles.whyConductedBy}>
            Conducted by SocialPrachar | Powered by Vajra AI
            </p>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <h2 className={styles.infoTitle}>DataClash 2.0 by Social Prachar</h2>
            <div className={styles.infoSubtitle}>
              2 Days Online • 1 Day Offline Finale
            </div>
            <p className={styles.infoDescription}>
              Win cash prizes and subscriptions worth <span className={styles.cahprizee}>₹1,50,000 INR</span>
            </p>
          </div>
          <div className={styles.infoContent}>
            <div className="row">
              <div className="col-md-4">
                <div className={styles.infoItem}>
                  <div className={styles.infoItemHeader}>
                    <span className={styles.infoIcon}>🎓</span>
                    <h3>Eligibility</h3>
                  </div>
                  <p>
                    Students graduating in 2024, 2025, or 2026 with skills in Python, ML, or related fields.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.infoItem}>
                  <div className={styles.infoItemHeader}>
                    <span className={styles.infoIcon}>💡</span>
                    <h3>Skills Required</h3>
                  </div>
                  <p>
                    Python, Machine Learning, Stacks, NLP, Deep Learning, Computer Vision.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className={styles.infoItem}>
                  <div className={styles.infoItemHeader}>
                    <span className={styles.infoIcon}>🎯</span>
                    <h3>Process</h3>
                  </div>
                  <p>
                    2-day online challenges (August 18-19, 2025) and a grand offline finale on August 23, 2025 at KPHB.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.infoFooter}>
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3">
                    <span className={styles.infoIcon}>⏰</span>
                    <div>
                      <h4>Online Challenges</h4>
                      <p>August 18-19, 2025</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="d-flex align-items-center gap-3">
                    <span className={styles.infoIcon}>📍</span>
                    <div>
                      <h4>Grand Finale (Offline)</h4>
                      <p>August 23, 2025 - KPHB Office</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.participationSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How to Participate</h2>
            <p className={styles.sectionDescription}>
              Follow these simple steps to join DataClash 2.0
            </p>
          </div>
          <div className={styles.stepsContainer}>
            {participationSteps.map((item, index) => (
              <motion.div
                key={index}
                className={`${styles.stepCard} ${item.bgColor} ${styles.hoverScale}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="d-flex align-items-start gap-4">
                  <div className={styles.stepIcon}>
                    <span>{item.icon}</span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h3 className={styles.stepNumber}>{item.step}</h3>
                      <h4 className={styles.stepTitle}>{item.title}</h4>
                    </div>
                    <p className={styles.stepDescription}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="row mb-12 gy-3">
          <div className="col-md-4">
            <motion.div
              className={`${styles.eventCard} ${styles.hoverScale}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.eventCardHeader}>
                <span className={styles.eventIcon}>⭐</span>
                <h3>Event Overview</h3>
              </div>
              <div className={styles.eventCardContent}>
                <p>
                  Join the ultimate coding challenge designed for passionate developers. Test your skills, learn new technologies, and win amazing prizes!
                </p>
              </div>
            </motion.div>
          </div>
          <div className="col-md-4">
            <motion.div
              className={`${styles.eventCard} ${styles.hoverScale}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={styles.eventCardHeader}>
                <span className={styles.eventIcon}>⚡</span>
                <h3>Competition Format</h3>
              </div>
              <div className={styles.eventCardContent}>
                <p>
                  Multi-round coding challenges including algorithm problems, web development tasks, and innovative project showcases.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="col-md-4">
            <motion.div
              className={`${styles.eventCard} ${styles.hoverScale}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className={styles.eventCardHeader}>
                <span className={styles.eventIcon}>🏅</span>
                <h3>Skills Required</h3>
              </div>
              <div className={styles.eventCardContent}>
                <p>
                  JavaScript and ReactJS. Perfect for students and beginners to showcase their talent!
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className={styles.prizeSection}>
          <div className={styles.prizeSectionHeader}>
            <span className={styles.prizeIcon}>🏆</span>
            <h2 className={styles.prizeSectionTitle}>🏆 Prize Pool 🏆</h2>
            <p className={styles.prizeSectionDescription}>
              Win exciting cash prizes and subscriptions worth ₹1,50,000 INR
            </p>
          </div>
          <div className={styles.prizeSectionContent}>
            <div className="row mb-8 gy-3">
              {prizes.map((prize, index) => (
                <div key={index} className="col-md-4">
                  <motion.div
                    className={`${styles.prizeCard} ${prize.bgColor} ${prize.borderColor}`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={styles.prizeCardContent}>
                      <div className={styles.prizeCardIcon}>
                        <span>{prize.icon}</span>
                      </div>
                      <div className={styles.prizePosition}>
                        {prize.position}
                      </div>
                      <div className={styles.prizeAmount}>
                        {prize.amount}
                        <span className={styles.cashPrizeText}>Cash prize</span>
                      </div>
                      <p className={styles.prizeDescription}>
                        {prize.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className={styles.prizeSummary}>
              <p className={styles.prizeSummaryText}>
                🎯 Total Prize Pool: ₹33,000+ Cash + Lifetime Subscriptions
              </p>
              <div className={styles.prizeSummarySubtext}>
                <span>🎁</span>
                <span>Plus exclusive recognition!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Register Button Below Prize Pool */}
        <button className={styles.registerButtonBelowPrize} onClick={() => setIsFormOpen(true)}>
          <span role="img" aria-label="register">📝</span> Register Now for DataClash 2.0
        </button>

        <div className={styles.faqSection}>
          <div className={styles.faqHeader}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqDescription}>
              Find answers to common questions about DataClash 2.0
            </p>
          </div>
          <div className={styles.faqContent}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={styles.faqItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={styles.faqQuestion}
                >
                  <span>{faq.question}</span>
                  <span className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Register Button Below FAQ */}
        <button className={styles.registerButtonBelowFaq} onClick={() => setIsFormOpen(true)}>
          <span role="img" aria-label="register">🚀</span> Join the DataClash 2.0 Challenge
        </button>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.modalHeader}>
                  <div className="d-flex align-items-center gap-4">
                    <div className={styles.modalIcon}>
                      <span>💻</span>
                    </div>
                    <div>
                      <h2 className={styles.modalTitle}>DataClash 2.0 Registration</h2>
                      <p className={styles.modalDescription}>
                        Fill in your details to join the ultimate data science challenge
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className={styles.modalClose}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.registrationForm}>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>👥</span>
                      Personal Information
                    </h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Full Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>WhatsApp Number *</label>
                          <input
                            type="text"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            className={styles.formInput}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Year of Passout *</label>
                          <div className={styles.radioGroup}>
                            {['2024', '2025', '2026'].map(year => (
                              <div key={year} className={styles.radioItem}>
                                <input
                                  type="radio"
                                  id={year}
                                  name="passoutYear"
                                  value={year}
                                  checked={formData.passoutYear === year}
                                  onChange={(e) => handleInputChange('passoutYear', e.target.value)}
                                />
                                <label htmlFor={year}>{year}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>🏅</span>
                      Academic Details
                    </h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Graduation Type *</label>
                          <select
                            value={formData.graduationType}
                            onChange={(e) => handleInputChange('graduationType', e.target.value)}
                            className={styles.formSelect}
                            required
                          >
                            <option value="">Choose graduation type</option>
                            <option value="btech">B.Tech</option>
                            <option value="degree">Degree</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>College Name *</label>
                          <input
                            type="text"
                            value={formData.collegeName}
                            onChange={(e) => handleInputChange('collegeName', e.target.value)}
                            className={styles.formInput}
                            placeholder="Enter your college name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formSection}>
                    <h3 className={styles.formSectionTitle}>
                      <span className={styles.formSectionIcon}>💻</span>
                      Technical Skills
                    </h3>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Skills you know *</label>
                      <div className={styles.selectAllCheckboxContainer}>
                        <input
                          type="checkbox"
                          id="select-all-languages"
                          checked={formData.languages.length === languages.length}
                          onChange={(e) => handleSelectAllLanguages(e.target.checked)}
                        />
                        <label htmlFor="select-all-languages">Select All</label>
                      </div>
                      <div className={styles.checkboxGrid}>
                        {languages.map(lang => (
                          <div key={lang} className={styles.checkboxItem}>
                            <input
                              type="checkbox"
                              id={lang}
                              checked={formData.languages.includes(lang)}
                              onChange={(e) => handleArrayChange('languages', lang, e.target.checked)}
                            />
                            <label htmlFor={lang}>{lang}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-6">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${styles.submitButton} ${isSubmitting ? styles.submitButtonDisabled : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <div className="d-flex align-items-center gap-3">
                          <div className={styles.spinner}></div>
                          Registering...
                        </div>
                      ) : (
                        <div className="d-flex align-items-center gap-3">
                          <span>✅</span>
                          Complete Registration
                        </div>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataClash;