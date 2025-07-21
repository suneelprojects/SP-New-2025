import React, { useState, useEffect, Suspense } from 'react';
import styles from './PopUpForm.module.css';
import { data } from './../../Cards/CardData';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../extraComponents/loading';

const SignInForm = ({ onClose, courseID, actionType }) => {
  const { slug } = useParams();
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    mode: '',
    pageUrl: window.location.href,
    slug: slug || "",
    actionType: actionType || ""
  });

  // ✅ Get card details for course dropdown
  useEffect(() => {
    const cardDetails = data.find(card => card.slug === slug);
    setCard(cardDetails);
  }, [slug]);

  // ✅ Your Google Apps Script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyiFH6YnpFoN2CeaCSOIB5Uv0667e_H3u183xrWTeK95GHV7iUBO1TPn40C6ydXYME2/exec';

  // ✅ Handles form submit: Google Sheets + SalesMax CRM
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, course, mode } = formData;

    // ✅ Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // ✅ Validate required fields
    if (!fullName || !email || !phone || !course || !mode) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Build payload for Google Sheets
      const formPayload = new FormData();
      formPayload.append('fullName', fullName);
      formPayload.append('email', email);
      formPayload.append('phone', phone);
      formPayload.append('actionType', formData.actionType);
      formPayload.append('course', course);
      formPayload.append('mode', mode);
      formPayload.append('pageUrl', formData.pageUrl);
      formPayload.append('slug', formData.slug);

      // ✅ Send to Google Sheets
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        console.log("✅ Google Sheets submission successful");

        // ✅ ALSO trigger SalesMax CRM form submission
        console.log("✅ Triggering SalesMax form submit");
        if (window.salesmaxDataLayer) {
          window.salesmaxDataLayer.push(['form-submit']);
        }

        // ✅ Redirect to thank you page
        navigate('/thank-you');
      } else {
        alert('Failed to submit form. Please try again.');
      }

    } catch (error) {
      console.error('❌ Error submitting:', error);
      alert('There was an error submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.overlay}>
      {/* ✅ Loading spinner */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Suspense fallback={<div>Loading...</div>}>
            <Loading />
          </Suspense>
        </div>
      )}

      <div className={styles.formContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Form"
        >
          &times;
        </button>

        {/* ✅ Your main form */}
        <form id="My Custom Form" onSubmit={handleSubmit}>
          <h2>Enroll Now</h2>

          {/* Full Name */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name" // ✅ Matches CRM field!
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Select Course */}
          <div className={styles.formGroup}>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {card && card.popUpDropDownCourses && card.popUpDropDownCourses.length > 0 ? (
                card.popUpDropDownCourses.map((course) => (
                  <option key={course.dropDownid} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))
              ) : (
                <option disabled>No available courses</option>
              )}
            </select>
          </div>

          {/* Select Mode */}
          <div className={styles.formGroup}>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
            >
              <option value="">Select Training Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Hidden fields */}
          <input type="hidden" name="pageUrl" value={formData.pageUrl} />
          <input type="hidden" name="slug" value={formData.slug} />
          <input type="hidden" name="actionType" value={formData.actionType} />

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;