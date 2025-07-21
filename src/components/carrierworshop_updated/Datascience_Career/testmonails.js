import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import TestimonialStyle from './testmonials.module.css';

export const googleData = [
    {
        id: 1,
        content: `I joined this masterclass with zero tech background. Mahesh sir explained everything so clearly that I finally understood the difference between Data Science and AI. Now I’m confidently pursuing a data analytics role!`,
        commentPerson: {
            name: "Priyanka Reddy",
            stars: "⭐⭐⭐⭐⭐",
        },
    },
    {
        id: 2,
        content: `This session changed my mindset. I thought AI was only for coders, but I learned how to start step-by-step even without a strong coding background. Truly inspiring`,
        commentPerson: {
            name: "Arvind Raj ",
            stars: "⭐⭐⭐⭐⭐",
        },
    },
    {
        id: 3,
        content: `The masterclass gave me a clear roadmap. I was lost after graduation, but now I know exactly what to learn and how to get my first job in AI. Loved the free tools and Job Kit!`,
        commentPerson: {
            name: "Meghana Nair ",
            stars: "⭐⭐⭐⭐⭐",
        },
    },
    {
        id: 4,
        content: `I attended so many webinars before, but this one stood out. It was honest, practical, and full of real examples. Mahesh sir’s mentorship is something every fresher needs!`,
        commentPerson: {
            name: "Sai Krishna Y ",
            stars: "⭐⭐⭐⭐⭐",
        },
    },
    {
        id: 5,
        content: `After 3 years in a non-tech job, I wanted to switch but didn’t know where to begin. This session gave me confidence and clarity. I even got freelance ideas to earn while I learn!`,
        commentPerson: {
            name: "Anusha M ",
            stars: "⭐⭐⭐⭐⭐",
        },
    },
    {
        id: 6,
        content: `I’ve already started my learning journey after this masterclass. The career roadmap and the bonus ChatGPT prompts were game changers. Highly recommended for serious learners.`,
        commentPerson: {
            name: "Sreenath Babu ",
            stars: "⭐⭐⭐⭐⭐",
        },
    }
   
];

const Testimonials = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollSpeed = 1;
        let isHovered = false;

        const scroll = () => {
            if (!isHovered && scrollContainer) {
                scrollContainer.scrollLeft += scrollSpeed;
                
                // Reset scroll when reaching the end
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0;
                }
            }
        };

        const intervalId = setInterval(scroll, 20);

        // Pause on hover
        const handleMouseEnter = () => {
            isHovered = true;
        };

        const handleMouseLeave = () => {
            isHovered = false;
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(intervalId);
            if (scrollContainer) {
                scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
                scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className={TestimonialStyle.testimonials}>
            <div className={TestimonialStyle.container}>
                <h2 className={TestimonialStyle.header}>
                    Testimonials
                </h2>
                <div
                    className={TestimonialStyle.scrollContainer}
                    ref={scrollRef}
                >
                    <div className={TestimonialStyle.cardsWrapper}>
                        {[...googleData, ...googleData].map((data, index) => (
                            <div
                                key={`${data.id}-${index}`}
                                className={TestimonialStyle.testimonialCard}
                            >
                                <div className={TestimonialStyle.cardContent}>
                                    <FontAwesomeIcon
                                        icon={faQuoteLeft}
                                        className={TestimonialStyle.quoteStart}
                                    />
                                    <div className={TestimonialStyle.content}>
                                        <p>{data.content}</p>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faQuoteRight}
                                        className={TestimonialStyle.quoteEnd}
                                    />
                                </div>
                                <div className={TestimonialStyle.authorSection}>
                                    <div className={TestimonialStyle.authorInfo}>
                                        <p className={TestimonialStyle.authorName}>
                                            - {data.commentPerson.name}
                                        </p>
                                        <p className={TestimonialStyle.stars}>
                                            {data.commentPerson.stars}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;