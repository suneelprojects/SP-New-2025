import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuickHelp_Button.module.css';
import { FaPhone } from 'react-icons/fa';

const QuickHelpButton = () => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/suggestions");
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>

            <div className={`position-fixed ${styles.suggestionButton}`} style={{ top: '30%', left: '0px', transform: 'translateY(-50%)' }}>
                <a
                    href="tel:+918019479419"
                    className={`${styles.glassyButton} d-flex flex-column align-items-center justify-content-center`}
                    style={{ cursor: 'pointer' }}
                >
                    <FaPhone className={`${styles.phoneIcon} text-success`} size={24} />
                    <span className={styles.callMeText}>Call</span>
                </a>

            </div>
        </>
    );
};



export default QuickHelpButton;

