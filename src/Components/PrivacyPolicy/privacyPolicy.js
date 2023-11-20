import React from 'react';

const PrivacyPolicy = () => {
    const headingStyle = { color: '#5a5a5a', fontSize: '22.5pt' };
    const subHeadingStyle = { color: '#5a5a5a', fontSize: '13pt' };
    const emphasizedStyle = { color: '#5a5a5a', backgroundColor: '#ffff00', fontSize: '13pt' };
    const strongHeadingStyle = { color: '#5a5a5a', fontSize: '16.5pt' };
    const listStyle = { listStyleType: 'disc', color: '#5a5a5a', fontSize: '13pt' };

    return (
        <div>
            <h3 style={headingStyle}>Privacy Policy </h3>
            <p>
        <span style={subHeadingStyle}>
          This Privacy Policy is prepared by&nbsp;
        </span>
                <em>
                    <span style={emphasizedStyle}>IndiaPolls</span>
                </em>
                <span style={subHeadingStyle}>&nbsp;and whose registered address is&nbsp;</span>
                <em>
                    <span style={emphasizedStyle}>Delhi</span>
                </em>
                <span style={subHeadingStyle}>&nbsp;(&ldquo;We&rdquo;) are committed to protecting and preserving the privacy of our visitors when visiting our site or communicating electronically with us.</span>
            </p>
            <p>
        <span style={subHeadingStyle}>
          This policy sets out how we process any personal data we collect from you or that you provide to us through our website and social media sites. We confirm that we will keep your information secure and comply fully with all applicable&nbsp;
        </span>
                <em>
                    <span style={emphasizedStyle}>India</span>
                </em>
                <span style={subHeadingStyle}>&nbsp;Data Protection legislation and regulations. Please read the following carefully to understand what happens to personal data that you choose to provide to us, or that we collect from you when you visit our sites. By submitting information you are accepting and consenting to the practices described in this policy.
        </span>
            </p>
            <h4 style={strongHeadingStyle}>Types of information we may collect from you</h4>
            <p>
        <span style={subHeadingStyle}>
          We may collect, store and use the following kinds of personal information about individuals who visit and use our website and social media sites:
        </span>
            </p>
            <p>
                <strong style={strongHeadingStyle}>
                    Information you supply to us.
                </strong>
                <span style={subHeadingStyle}>&nbsp;You may supply us with information about you by filling in forms on our website or social media. This includes information you provide when you submit a contact/inquiry form. The information you give us may include but is not limited to, your name, address, e-mail address, and phone number.</span>
            </p>
            <h4 style={strongHeadingStyle}>How we may use the information we collect</h4>
            <p>
        <span style={subHeadingStyle}>
          We use the information in the following ways:
        </span>
            </p>
            <p>
                <strong style={strongHeadingStyle}>
                    Information you supply to us.&nbsp;
                </strong>
                <span style={subHeadingStyle}>
          We will use this information:
        </span>
            </p>
            <ul>
                <li style={listStyle}>
                    <p>
                        <span style={subHeadingStyle}>to provide you with information and/or services that you request from us;</span>
                    </p>
                </li>
                <li style={listStyle}>
                    <p>
                        <span style={subHeadingStyle}>To contact you to provide the information requested.</span>
                    </p>
                </li>
            </ul>
            <h4 style={strongHeadingStyle}>Disclosure of your information</h4>
            <p>
        <span style={subHeadingStyle}>
          Any information you provide to us will either be emailed directly to us or may be stored on a secure server.
        </span>
            </p>
            <p>
        <span style={subHeadingStyle}>
          We do not rent, sell or share personal information about you with other people or non-affiliated companies.
        </span>
            </p>
            <p>
        <span style={subHeadingStyle}>
          We will use all reasonable efforts to ensure that your personal data is not disclosed to regional/national institutions and authorities unless required by law or other regulations.
        </span>
            </p>
            <p>
        <span style={subHeadingStyle}>
          Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorized access.
        </span>
            </p>
            <h4 style={strongHeadingStyle}>Your rights &ndash; access to your personal data</h4>
            <p>
        <span style={subHeadingStyle}>
          You have the right to ensure that your personal data is being processed lawfully (&ldquo;Subject Access Right&rdquo;). Your subject access right can be exercised in accordance with data protection laws and regulations. Any subject access request must be made in writing to&nbsp;
        </span>
                <span style={emphasizedStyle}>panel@indiapolls.com</span>
                <span style={subHeadingStyle}>. We will provide your personal data to you within the statutory time frames. To enable us to trace any of your personal data that we may be holding, we may need to request further information from you. If you complain about how we have used your information, you have the right to complain to the Information Commissioner&rsquo;s Office (ICO).
        </span>
            </p>
            <h4 style={strongHeadingStyle}>Changes to our privacy policy</h4>
            <p>
        <span style={subHeadingStyle}>
          Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail. Please check back frequently to see any updates or changes to our privacy policy.
        </span>
            </p>
            <h4 style={strongHeadingStyle}>Contact</h4>
            <p>
        <span style={subHeadingStyle}>
          Questions, comments, and requests regarding this privacy policy are welcomed and should be addressed to&nbsp;
        </span>
                <em>
                    <span style={emphasizedStyle}>India Polls & panel@indiapolls.com</span>
                </em>
                <span style={subHeadingStyle}>.
        </span>
            </p>
            <p>
                <br />
            </p>
            <p>
                <br />
            </p>
        </div>
    );
};

export default PrivacyPolicy;
