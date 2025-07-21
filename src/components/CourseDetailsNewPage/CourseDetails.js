import React, { Suspense, useState, useEffect } from 'react';
import Loading from '../../components/extraComponents/loading';
import { useParams } from 'react-router-dom';
import PageNotFound from '../pageNotFound/PageNotFound';
import { Helmet } from 'react-helmet-async';
// import FooterBtn from '../footerButton/footerBtn';
// import Breadcrumbs from './Breadcrumbs';
// import CourseItinerary from './CourseItinerary';
// import Faq from './Faq';

const Headerpart = React.lazy(() => import('../Pageslices/Header/Headerpart'));

const Testmonials = React.lazy(() => import('../Pageslices/Testmonials/Testmonials'));
const Whatwillyoulearn = React.lazy(() => import('../Pageslices/Whatwillyoulearn/Whatwillyoulearn'));
const Mentorpage = React.lazy(() => import('../Pageslices/Mentorpage/Mentorpage'));
const Certificate = React.lazy(() => import('../Pageslices/Certificatepart/Certificate'));
const Banner = React.lazy(() => import('../Pageslices/Banner/Banner'));
const CourseAccordion = React.lazy(() => import('../Pageslices/AccordianQuestions/Accordian'));

const validSlugs = ['data-science', 
    'python-full-stack-development-course',
    'java-full-stack-development-course',
    'full-stack-developer-course',
    'awsdevopscourse',
    'artificial-intelligence-course-training-institute-in-hyderabad',
    'generative-ai-course-training-institute-hyderabad',
    'digital-marketing-course-training-institute-hyderabad',
    'data-analytics-course-training-hyderabad',
    'snowflake-training-in-hyderabad',
    'salesforce-course'

]
const routeMeta = {
  "data-science": {
    title: "Best Data Science Course Training institute in Hyderabad | SocialPrachar",
    description: "Join the top-rated Data Science course in Hyderabad with real-time projects and expert mentors at SocialPrachar"
  },
  "python-full-stack-development-course": {
    title: "Python Full Stack Development Course in Hyderabad | SocialPrachar",
    description: "Learn backend and frontend development with Python Full Stack course at SocialPrachar."
  },
  "java-full-stack-development-course": {
    title: "Java Full Stack Development Course in Hyderabad | SocialPrachar",
    description: "Build a career in software development with our Java Full Stack Developer course."
  },
  "full-stack-developer-course": {
    title: "MERN Full Stack Developer Course training institute in Hyderabad | SocialPrachar",
    description: "Become a MERN Stack Developer with our expert-led Full Stack Development course in Hyderabad."
  },
  "awsdevopscourse": {
    title: "AWS DevOps Course Training Institute in Hyderabad | SocialPrachar",
    description: "Get certified with our AWS DevOps course designed for real-world cloud deployment practices."
  },
  "artificial-intelligence-course-training-institute-in-hyderabad": {
    title: "Artificial Intelligence Course Training Institute in Hyderabad | SocialPrachar",
    description: "Kickstart your AI career with our industry-aligned Artificial Intelligence course in Hyderabad."
  },
  "generative-ai-course-training-institute-hyderabad": {
    title: "Generative AI Course Training Institute in Hyderabad | SocialPrachar",
    description: "Learn about the latest AI technologies with our Generative AI course in Hyderabad."
  },
  "digital-marketing-course-training-institute-hyderabad": {
    title: "Digital Marketing Course Training Institute in Hyderabad | SocialPrachar",
    description: "Master SEO, SEM, SMM and more with our Digital Marketing training in Hyderabad."
  },
  "data-analytics-course-training-hyderabad": {
    title: "Data Analytics Course Training in Hyderabad | SocialPrachar",
    description: "Become a data analytics expert with our comprehensive training in Hyderabad."
  },
  "snowflake-training-in-hyderabad": {
    title: "Snowflake Training in Hyderabad | SocialPrachar",
    description: "Learn Snowflake data warehousing with hands-on training in Hyderabad."
  },
  "salesforce-course": {
    title: "Salesforce Course Training Institute in Hyderabad | SocialPrachar",
    description: "Get certified with our Salesforce course designed for real-world CRM practices."
  }
};

const DEFAULT_OG_IMAGE = "https://socialprachar.com/homeReplaceImage-removebg-preview.png";
const SITE_NAME = "SocialPrachar";
const PROVIDER = {
  "@type": "Organization",
  "name": SITE_NAME,
  "url": "https://socialprachar.com",
  "logo": DEFAULT_OG_IMAGE
};

const slugToName = {
  "data-science": "Data Science",
  "python-full-stack-development-course": "Python Full Stack",
  "java-full-stack-development-course": "Java Full Stack",
  "full-stack-developer-course": "Full Stack Developer",
  "awsdevopscourse": "AWS DevOps",
  "artificial-intelligence-course-training-institute-in-hyderabad": "Artificial Intelligence",
  "generative-ai-course-training-institute-hyderabad": "Generative AI",
  "digital-marketing-course-training-institute-hyderabad": "Digital Marketing",
  "data-analytics-course-training-hyderabad": "Data Analytics",
  "snowflake-training-in-hyderabad": "Snowflake",
  "salesforce-course": "Salesforce"
};

const getCourseUrl = slug => `https://socialprachar.com/${slug}`;

const getBreadcrumbListJsonLd = (slug) => {
  const name = slugToName[slug] || slug.replace(/-/g, ' ');
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://socialprachar.com/" },
      { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://socialprachar.com/courses" },
      { "@type": "ListItem", "position": 3, "name": name, "item": getCourseUrl(slug) }
    ]
  };
};

const getCourseJsonLd = (slug, meta) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": meta.title,
    "description": meta.description,
    "url": getCourseUrl(slug),
    "provider": PROVIDER,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "url": getCourseUrl(slug)
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "startDate": "2025-07-01",
      "endDate": "2025-12-31",
      "location": {
        "@type": "Place",
        "name": "Hyderabad"
      }
    }
  };
};

const CourseDetails = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null); // Assuming you fetch this data

  useEffect(() => {
    // Placeholder for fetching course data based on slug
    // In a real app, you would fetch this from an API
    const fetchData = async () => {
        // Mock data structure
        const mockData = {
            course_itinerary: [],
            faq: []
        };
        setCourseData(mockData);
    };
    fetchData();
  }, [slug]);

  if (!validSlugs.includes(slug)) {
    return <PageNotFound />;
  }

    const meta = routeMeta[slug] || {
      title: "SocialPrachar",
      description: "Learn more about our courses at SocialPrachar."
    };
    const url = getCourseUrl(slug);
    const ogImage = DEFAULT_OG_IMAGE;
    const breadcrumbJsonLd = getBreadcrumbListJsonLd(slug);
    const courseJsonLd = getCourseJsonLd(slug, meta);

    return (
        <>
          <Helmet>
            {/* Basic Meta Tags */}
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={url} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@socialprachar" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={ogImage} />
            
            {/* WhatsApp */}
            <meta property="og:image:alt" content={meta.title} />
            <meta property="og:image:type" content="image/png" />
            
            {/* LinkedIn */}
            <meta property="linkedin:card" content="summary_large_image" />
            <meta property="linkedin:title" content={meta.title} />
            <meta property="linkedin:description" content={meta.description} />
            <meta property="linkedin:image" content={ogImage} />
            
            {/* Additional Meta for better sharing */}
            <meta name="author" content={SITE_NAME} />
            <meta name="robots" content="index, follow" />
            <meta property="article:publisher" content="https://www.facebook.com/socialprachar" />
            
            {/* JSON-LD */}
            <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
            <script type="application/ld+json">{JSON.stringify(courseJsonLd)}</script>
          </Helmet>
          <Suspense fallback={<Loading />}>
              <Headerpart />
              <Testmonials/>
              
              <Whatwillyoulearn />
              <Mentorpage />
              <Certificate />
              <CourseAccordion /> 
              <Banner />
              {/* {courseData && (
                <>
                  <CourseItinerary sections={courseData.course_itinerary} />
                  <Faq faqs={courseData.faq} />
                </>
              )} */}
              
             
          </Suspense>
        </>
    );
};

export default CourseDetails;