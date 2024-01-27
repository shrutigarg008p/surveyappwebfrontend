import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const GoogleReCaptcha = ({  onCaptchaValidation }) => {
    const recaptchaRef = useRef<any>(null);

    useEffect(() => {
        if (recaptchaRef.current) {
            recaptchaRef.current.execute();
        }
    }, []);

    const handleToken = token => {
        console.log("ReCAPTCHA token:", token);
        const url:any = process.env.REACT_APP_BASE_URL_API;
        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recaptchaToken: token })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          onCaptchaValidation(data)
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    };

    const onReCAPTCHAChange = token => {
        if (token && onCaptchaValidation) {
            handleToken(token);
        }
    };


    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Ld4Jl4pAAAAALPyGX-iXYAu0iBGpnKhLzGYzipn"
            size="invisible"
            onChange={onReCAPTCHAChange}
        />
    );
};

export default GoogleReCaptcha;
