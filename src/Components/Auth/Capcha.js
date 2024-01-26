import React, { useState } from 'react';

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const SimpleCaptcha = (props) => {
    const [captchaText, setCaptchaText] = useState(generateRandomString(6));
    const [userInput, setUserInput] = useState('');
    const [isValid, setIsValid] = useState(null);

    const regenerateCaptcha = () => {
        setCaptchaText(generateRandomString(6));
        setUserInput('');
        setIsValid(null);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        setIsValid(null);
    };

    const handleSubmit = () => {
        if (userInput.toLowerCase() === captchaText.toLowerCase()) {
            setIsValid(true);
            props.onValid()
        } else {
            setIsValid(false);
        }
    };

    return (
        <div>
            <img src={`https://dummyimage.com/120x40/000/fff&text=${captchaText}`} alt="Captcha" />
            <br />
            <input type="text" value={userInput} onChange={handleInputChange} />
            <button className="ml-2" onClick={handleSubmit}>{props.language === 'hi' ? "जमा करना" : "Submit"}</button>
            <button className="ml-2" onClick={regenerateCaptcha}>{props.language === 'hi' ? "पुनः जेनरेट" : "Regenerate"}</button>
            {isValid === true && <p style={{ color: 'green' }}>{props.language === 'hi' ? "कैप्चा मान्य है!" : "Captcha is valid! ✔️"}</p>}
            {isValid === false && <p style={{ color: 'red' }}>{props.language === 'hi' ? "कैप्चा अमान्य है. कृपया पुन: प्रयास करें।" : "Captcha is invalid. Please try again. ❌"}</p>}
        </div>
    );
};

export default SimpleCaptcha;
