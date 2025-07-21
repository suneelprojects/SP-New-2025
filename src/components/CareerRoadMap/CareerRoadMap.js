import React, { useState, useEffect } from 'react';
import { Download, Users, Clock, BookOpen, Star, ChevronRight, X } from 'lucide-react';
import { RoadMapData } from './RoadMapData';
import styles from './CareerRoadMap.module.css';

const CareerRoadMap = ({ onClose }) => {
  const [formData, setFormData] = useState({
    course: '',
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Animate cards on mount
    RoadMapData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 200);
    });
  }, []);

  const handleDownloadClick = (fileName, courseName) => {
    if (fileName !== "Download RoadMap") {
      setSelectedFile(fileName);
      setFormData(prev => ({ ...prev, course: courseName }));
      setIsFormOpen(true);
    } else {
      alert("Download not available for this course.");
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.course) errors.course = 'Please select a course.';
    if (!data.name) errors.name = 'Please enter your name.';
    if (!data.email) {
      errors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.phone) {
      errors.phone = 'Please enter your phone number.';
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.values(errors).some(error => error)) return;

    setLoading(true);

    try {
      const formDataEncoded = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataEncoded.append(key, value);
      });
      formDataEncoded.append('sheetName', 'careerRoadmaps');

      const response = await fetch("https://script.google.com/macros/s/AKfycbzr6UbL2zGx8LF0C3qW-Gq2ohpONS9q7aXqyWkr_qg5oPHTqOgPnCIjs8_0uQ17PRlMQg/exec", {
        method: "POST",
        body: formDataEncoded,
      });

      if (!response.ok) throw new Error("Failed to submit the form.");

      alert('Thank you for Submission! Your form has been submitted successfully.');
      setIsFormOpen(false);

      if (selectedFile) {
        const link = document.createElement("a");
        link.href = `/roadmaps/${selectedFile}`;
        link.download = selectedFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      alert('There was an error submitting your form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.container}>
      {/* Form Modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} onClick={() => setIsFormOpen(false)}></div>
          <div className={styles.modalContent}>
            <button
              onClick={() => setIsFormOpen(false)}
              className={styles.closeButton}
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-900 to-orange-500 rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Download Your Roadmap</h2>
              <p className="text-gray-600 mt-2">Get instant access to your career guide</p>
            </div>

            <div className="space-y-4">
              <div className={styles.formSection}>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={styles.formSelect}
                  required
                >
                  <option value="" disabled>Select Course</option>
                  {RoadMapData.map(course => (
                    <option key={course.courseName} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
                {formErrors.course && <div className={styles.formError}>{formErrors.course}</div>}
              </div>

              <div className={styles.formSection}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className={styles.formInput}
                  required
                />
                {formErrors.name && <div className={styles.formError}>{formErrors.name}</div>}
              </div>

              <div className={styles.formSection}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  className={styles.formInput}
                  required
                />
                {formErrors.email && <div className={styles.formError}>{formErrors.email}</div>}
              </div>

              <div className={styles.formSection}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className={styles.formInput}
                  required
                />
                {formErrors.phone && <div className={styles.formError}>{formErrors.phone}</div>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? (
                  <div className={styles.loadingSpinner}>
                    <div className={styles.spinner}></div>
                    Processing...
                  </div>
                ) : (
                  "Download Free Roadmap"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className={styles.heroContent}>
          <div className="inline-block p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-6">
            <span className="text-2xl">🎓</span>
          </div>
          <h1 className={styles.heroTitle}>
            Don't Join Any IT Course
            <span className={styles.heroTitleGradient}>
              Before Reading This!
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Download 6 Proven Career Roadmaps for Freshers – Free!
          </p>
          <p className={styles.heroDescription}>
            Confused about choosing between Data Science, Full Stack, AI, DevOps, or Cybersecurity?
          </p>
          <div className={styles.heroBadge}>
            <Star className="w-5 h-5 mr-2" />
            Get clarity in 2 minutes with our expert-designed career guides
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard} style={{backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#b45309'}}>
            <Users className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <div className={styles.statNumber}>10,000+</div>
            <div className={styles.statLabel}>Students Trained</div>
          </div>
          <div className={styles.statCard} style={{backgroundColor: 'rgba(220, 38, 38, 0.2)', color: '#991b1b'}}>
            <Download className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Free Downloads</div>
          </div>
          <div className={styles.statCard} style={{backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#1e40af'}}>
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Career Paths</div>
          </div>
          
          <div className={styles.statCard} style={{backgroundColor: 'rgba(234, 179, 8, 0.3)', color: '#92400e'}}>
            <Download className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <div className={styles.statNumber}>1800+</div>
            <div className={styles.statLabel}>People Downloaded This Week</div>
          </div>
        </div>

        {/* Course Cards */}
        <div className={styles.courseGrid}>
          {RoadMapData.map((course, index) => (
            <div
              key={index}
              className={`${styles.courseCard} ${
                visibleCards.includes(index) ? '' : styles.hidden
              }`}
              style={{ 
                transition: 'all 0.6s ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Border Effect */}
              <div className={`${styles.courseCardBorder} bg-gradient-to-r ${course.color}`}></div>
              
              {/* Course Icon */}
              <div className="text-center mb-6">
                <div className={`${styles.courseIcon} bg-gradient-to-r ${course.color}`}>
                  {course.icon}
                </div>
                <h3 className={styles.courseTitle}>{course.courseName}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
              </div>

              {/* Course Details */}
              <div className={styles.courseDetails}>
                <div className={styles.courseDetail}>
                  <Clock className={`${styles.courseDetailIcon} text-blue-400`} />
                  <span className={styles.courseDetailText}>No. of Hours to Learn: {course.noOfHoursToLearn}</span>
                </div>
                <div className={styles.courseDetail}>
                  <BookOpen className={`${styles.courseDetailIcon} text-green-400`} />
                  <span className={styles.courseDetailText}>Projects Included: {course.projectsIncluded}</span>
                </div>
                <div className={styles.courseDetail}>
                  <Users className={`${styles.courseDetailIcon} text-purple-400`} />
                  <span className={styles.courseDetailText}>Students Trained Till Now: {course.studentsTrainedTillNow}</span>
                </div>
              </div>
              <p className={styles.courseSummary}>{course.summary}</p>

              {/* Download Button */}
              <button
                onClick={() => handleDownloadClick(course.downloadRoadMap, course.courseName)}
                className={`${styles.downloadButton} bg-gradient-to-r ${course.color}`}
              >
                <Download className={styles.downloadButtonIcon} />
                Download RoadMap
                <ChevronRight className={styles.downloadButtonArrow} />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h2 className={`${styles.ctaTitle} ${styles.ctaTitleHighlight}`}>
            Ready to Start Your IT Career Journey?
          </h2>
          <p className={styles.ctaDescription + ' ' + styles.ctaDescriptionWide}>
            Embark on a transformative journey with our expertly crafted career roadmaps. Join thousands of professionals who have unlocked their potential and accelerated their careers. Download your personalized guide now and take confident steps towards a successful future in IT!
          </p>
          <div className={styles.ctaFeatures}>
            <div className={styles.ctaFeature + ' ' + styles.ctaFeatureHighlight}>
              <div className={`${styles.ctaFeatureDot} bg-green-400`}></div>
              Job Roles & Responsibilities
            </div>
            <div className={styles.ctaFeature + ' ' + styles.ctaFeatureHighlight}>
              <div className={`${styles.ctaFeatureDot} bg-blue-400`}></div>
              Required Tools & Technologies
            </div>
            <div className={styles.ctaFeature + ' ' + styles.ctaFeatureHighlight}>
              <div className={`${styles.ctaFeatureDot} bg-yellow-400`}></div>
              Salary Expectations
            </div>
            <div className={styles.ctaFeature + ' ' + styles.ctaFeatureHighlight}>
              <div className={`${styles.ctaFeatureDot} bg-purple-400`}></div>
              Growth Paths
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadMap;