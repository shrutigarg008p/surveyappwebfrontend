import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
} from '@material-ui/core';
import { Assets } from 'enums';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(3),
    },
    content: {
        padding: theme.spacing(3),
        textAlign: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        maxWidth: '400px', // Adjust the maximum width as needed
    },
}));

function Privacy() {
    const classes = useStyles();
    const headingStyle = { color: '#5a5a5a', fontSize: '22.5pt' };
    const subHeadingStyle = { color: '#5a5a5a', fontSize: '13pt' };
    const emphasizedStyle = {}; //{ color: '#5a5a5a', backgroundColor: '#ffff00', fontSize: '13pt' };
    const strongHeadingStyle = { color: '#5a5a5a', fontSize: '16.5pt' };
    const listStyle = { listStyleType: 'disc', color: '#5a5a5a', fontSize: '13pt' };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6"> Privacy Policy</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.content}>
                <Paper className={classes.paper}>
                    <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                    <Typography variant="h4" gutterBottom>
                        Privacy Policy
                    </Typography>
                  <div>
  <p><strong><span style={{color: '#455a64', fontSize: '19pt'}}>INDIAPOLLS PANEL PRIVACY POLICY</span></strong></p>
  <p><strong><span style={{fontSize: '15pt'}}>DataXing Digital Privacy Policy</span></strong></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>1. &nbsp; &nbsp;Introduction</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>This Privacy Policy sets out the commitment of DataXing Digital India Pvt. Ltd. Registered at S-325, BASEMENT, GREATER KAILASH, PART - II, NEW DELHI - 110048, INDIA and its affiliates including (DataXing Digital Inc. registered at 228 Park Avenue S, #56766 New York, NY 10003-1502 and DataXing Digital registered at 124 City Road London, EC1V 2NX) (All Together “DataXing”), To the privacy of its panel members (“Panellists”, “Panellist”), and governs Panellists’ rights regarding privacy and data protection.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>This Privacy Policy applies to the DataXing Digital panels known as IndiaPolls, altogether identified in this Privacy Policy as the DataXing Digital panels (the “Panels”). For clarity, this policy is publicly available on the IndiaPolls panel site as “IndiaPolls Panel Privacy Policy”. Panellists are members of the Panels, operated by DataXing Digital and for which DataXing Digital is the data controller. Taking part in our panels, surveys and research activities is entirely voluntary. By registering to the Panels and accepting these terms, you confirm that you have read and understood the terms of this Privacy Policy. We ask you to read this Privacy Policy carefully.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>For the purpose of this Privacy Policy, personal data means any information which relates to an identifiable living individual (or the equivalent applicable term in your jurisdiction - for example in New Delhi, personal information would also relate to a specific household).</span></p>
  <p><strong><span style={{fontSize: '15pt'}}>2. &nbsp; &nbsp;Lawful Collection and Use of Data&nbsp;</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We collect your personal data in several ways such as through our website(s) (for example your panel portal), our mobile applications and other activities such as social media, apps and online, face to face or telephone studies or other research activities. We may add other ways and activities moving forward but we will always operate in compliance with this policy.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We have set out below, more detailed information about how we use your personal data. We are also required by law to explain the legal basis for processing your personal data. These legal bases are listed below and could be different for each use case:</span></p>
  <ol>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>we have your consent for the use of your personal data;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>we need to use your personal data in order to perform a contract with you;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>we need to process your data to comply with a legal obligation;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>we need to process your data in order to protect your vital interests or someone else;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>the processing is necessary to perform a task in the public interest; or</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>the use of your personal data is necessary for our (or our clients’) legitimate interests (in which case we will explain what those interests are).</span></p>
    </li>
  </ol>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We will never misrepresent ourselves or what we are doing. If you receive an email that concerns you, purporting to be from us, please let us know as shown below in “How to Contact Us”.</span></p>
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>OPERATING OUR WEBSITE(S)</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Ensure that content from our site is presented effectively, according to the device you are accessing it on.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Analyse statistical data about user(s) browsing actions and their patterns</span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>IP address, operating system information, browser type</span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '12pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>PANEL REGISTRATION AND MANAGEMENT</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>To administer your panel profile and to communicate with you, including informing you about the panel, selecting you for future surveys, contacting you to participate in our survey and other research activities, issuing your incentive, helping when you contact our panel support, etc.</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Name, email address, postal address, mobile device ID, demographics and any detail you share with us about yourself and your household</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>MARKET RESEARCH</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>To understand your views about certain products and services or to understand your behaviour in different situations</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Identifier, contact details, email address, voice, image, opinion</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>SCIENTIFIC RESEARCH FOR ACADEMICS, PUBLIC HEALTH ORGANISATIONS OR RESEARCH COUNCIL INSTITUTES</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Including but not limiting to clinical studies, health economics and outcomes research (HEOR), non-interventional studies (NIS), real world research (RWR), observational studies, epidemiology research</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Identifier, contact details, email address, health data, e.g. disease, health status, diagnose, treatment pattern, unmet needs</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly, or combined with other secondary database</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>SCIENTIFIC RESEARCH FOR COMMERCIAL COMPANIES AND CHARITABLE RESEARCH ORGANISATIONS</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Including but not limiting to clinical studies, health economics and outcomes research (HEOR), non-interventional studies (NIS), real world research (RWR), observational studies, epidemiology research</span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Identifier, contact details, email address, health data, e.g. disease, health status, diagnose, treatment pattern, unmet needs</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly, or combined with other secondary database</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>SAFETY MONITORING (PHARMACOVIGILANCE ADVERSE EVENTS REPORTING)</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Report Adverse Events during our studies to competent authorities</span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Identifier, contact details, email address, disease, treatment, product taken and adverse events</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly, or combined with other secondary database</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>PUBLIC DISCLOSURE</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>To share or disclose pursuant to judicial or other government subpoenas, warrants, orders or pursuant to similar and other legal or regulatory requirements, we will provide such information to the appropriate authorities</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Identifier, name, contact details, email address, incentive received</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly, or combined with other secondary database</span></p>
  
  <hr />
  
  
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>FRAUD PROTECTION</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Protection of our business interests against fraudulent behaviour</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>IP address, browser specifications, device specifications, postal addresses, email addresses, official identification number (i.e. ME number)</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>SURVEY PARTICIPATION UNIQUENESS</span></strong></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Prevention of multiple entries in surveys by the same individuals in line with our Terms and Conditions</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>IP address, browser specifications, device specifications</span><span style={{color: '#001627', fontSize: '11.5pt'}}></span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>TRACKING OF THE ANSWERS OF RECURRING RESPONDENTS (SPECIAL RESEARCH DESIGN PROJECTS)</span></strong></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>When you participate in our surveys, we typically use a temporary ID which makes your answers in the survey anonymous to our clients. However, some of our clients have the specific research design need to understand how your opinion has evolved over a period of time. For this specific project type that we call "tracking" projects we will use persistent IDs and we will make this clear at the beginning of each of these surveys. Your survey responses will be considered as personal data and you will have the right to access them. Such projects will contain a notice on the very first page of the survey, so that you can identify them and decide whether or not to take part</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Persistent unique project-specific identifier</span><span style={{color: '#001627', fontSize: '11.5pt'}}></span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>DATA MATCHING AND ENRICHMENT</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We enrich the data we hold on file about you by matching your personal data with third parties. This will help us to improve your panel profile and ensure that we select relevant surveys for you.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We utilize matching services (i.e. third parties who are specialized in data management) to acquire additional information about you from public and private data sources (such as social networks, retailers and content subscription services with whom you have an account) or to use your personal data as an aid to develop additional or new types of anonymous data sets (i.e. we compile your aggregate data with data from other consumers to create a new lifestyle segment). The matching service (our data partner) holds the personal data we share for a short time, uses it to assemble the additional information, and then returns the combined information to us. Data partners are contractually bound to delete the data we share with them and/or are not authorised to use it in any way other than for this specific purpose.</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Persistent unique identifier, contact details, email address, social login, cookie, mobile device ID, official identification number (i.e. ME number)</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly or combined with other secondary database</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>ADVERTISING TARGETING AND MEDIA BUYING RESEARCH</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We use your personal data to help our clients and data partners enrich their data by using lookalike modelling techniques.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Thanks to your participation in our surveys and your profile data, we can help our clients to improve their advertising targeting, and to create better online advertising models, through lookalike modelling or similar research methodologies. We will use your personal data we collect about you through profile building, participation in research surveys or data matching to match with third-parties and platforms (our data partners).</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We include contractual safeguards to ensure that you will not automatically be targeted for commercial purposes, as a result of your data being used to help create a lookalike audience, and that our data partners cannot use your data for any other purpose.</span></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Persistent unique identifier, contact details, email address, social login, cookie, IP address, mobile device ID, official identification number (i.e. ME number)</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly or combined with other secondary database</span></p>
  
  <hr />
  
  <p><strong><span style={{color: '#001627', fontSize: '11.5pt'}}>AD EXPOSURE AND MEASUREMENT</span></strong></p>
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>PURPOSE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>In addition to cookie-based matching (which you can control and consent to via your panel account), we will use personal data you provide to us, such as an email address, in a direct matching process with third parties (i.e. our clients and publishers) to determine if you are a user of that service (such as social networks, websites, mobile apps) for advertising measurement research purposes. We will identify what advertisements you may have been exposed to on those sites and platforms and measure how brand attitudes or brand recall have impacted sales. The third parties that we work with are not permitted to use the data for any other purpose.</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>DATA COLLECTED/PROCESSED</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Persistent unique identifier, contact details, email address, social login, cookie, IP address, mobile device ID, official identification number (i.e. ME number)</span></p>
  
  <p><strong><span style={{color: '#455a64', fontSize: '9pt'}}>SOURCE</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We obtain this data from you directly or combined with other secondary database</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>3. &nbsp; &nbsp;Third Parties (Clients and Suppliers)</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We may share your personal data with our third-party vendors and processors to perform panel management related activities in order to deliver panel services and activities to you. This could include vendors managing or assisting us in managing our panel databases, marketing automation and CRM, quality checks and fraud prevention, incentive management, and customer care. Some vendors will specifically work with us on enriching your panel profile, allowing us to select you for surveys, such as vendors specialized in, but not limited to, data matching, online ad effectiveness measurement, and social media data interactions. Categories of personal data shared with these vendors would typically be, but may not be limited to, name, email address, postal address, phone number, cookie ID, panelist ID, and IP address. Your personal data is not sold to third parties.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Our third-party data partners and publishers are all contractually bound to keep any information they collect and disclose to us, or that we collect and disclose to them, confidential and must protect it with security standards and practices that are equivalent to our own.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>4. &nbsp; &nbsp; Confidentiality, Security and Industry Requirements and Where We Store Your Personal Data</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We take appropriate technological and organisational measures to protect your personal data, both during transmission and once we receive it. Our security procedures are consistent with generally accepted standards used to protect personal data.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>The data that we collect from you may be transferred to and/or stored outside your territory. It may also be processed by staff operating outside your territory who work for us or for one of our suppliers. If your personal data is transferred to, stored at or otherwise processed outside your country or territory, and that country or territory has not been recognized as providing an adequate level of data protection, we will put in place additional safeguards to protect your personal data, as required by applicable law. For example, if you are in the EEA, standard contractual clauses would be used if we process your data outside the EEA.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Your account information and personal data are password protected so that you and only you have access to your information. In order to keep your personal data safe, we recommend that you do not divulge your password to anyone. DataXing Digital will never ask you for your password in an unsolicited phone call or in an unsolicited email. Also, please remember to sign out of your Panels account and close your browser window when you have finished visiting our site. This is to ensure that others cannot access your personal data and correspondence if you share a computer with someone else or are using a computer in a public place like a library or Internet cafe. Please change your password regularly.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>5. &nbsp; &nbsp; Industry Standards</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We adhere to various standards and industry codes depending on your location, including:</span></p>
  <ul>
    <li style={{listStyleType: 'disc', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Market Research Society of India (MRSI)</span></p>
    </li>
  </ul>
  
  <p><strong><span style={{fontSize: '15pt'}}>6. &nbsp; &nbsp; Cookie Disclosure</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Cookies are small text files stored on your computer or mobile device by a website that assigns a numerical user ID and stores certain information about your online browsing. They are used to help users navigate websites efficiently and perform certain functions. The website sends information to the browser, which then creates a text file on the user’s computer or mobile device. Every time the user goes back to the same website, the browser retrieves and sends this file to the website's server.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>For behavioural tracking research, we use optional cookies / software applications, but only if you have given your consent to these cookies / applications.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>As is true of most online surveys, we gather certain information automatically and store it in survey data files. This information may include the following: Internet Protocol addresses (IP address), browser type, Internet service provider (“ISP”); referring/exit pages, operating system and date/time stamp.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We use this automatically collected information to analyse trends such as browser usage and to administer the site, e.g. to optimise the survey experience depending on your browser type. We may also use your IP address to check whether there have been multiple participations in the survey from this IP address and to protect our business against fraudulent behaviour.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing Digital defines cookies within 3 categories:</span></p>
  <ol>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Required to use the Panels site;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Security-specific and</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Behavioural or advertising research cookies.</span></p>
    </li>
  </ol>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>For more information, please log in and access your cookie policy page where you are able to adjust your cookie settings.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>7. &nbsp; &nbsp; Accuracy</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We take reasonable steps to keep personal data in our possession or control accurate, complete and current, based on the most recent information made available to us by you and/or by our client.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We rely on you to help us keep your personal data accurate, complete and current by answering our questions honestly. You are responsible for ensuring that you notify us of any changes to your personal data.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>8. &nbsp; &nbsp; Children’s Data&nbsp;</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>DataXing Digital recognizes the need to provide further privacy protections with respect to personal data collected from children. We never knowingly invite children under the legal age set by the authorities in the country in which you reside to participate in research studies without parental permission. If it is necessary and appropriate to a particular project to directly involve children under the legal age, we take measures to ensure we have been obtained permission by a parent and/or legal guardian. DataXing Digital will provide parents and/or a legal guardian information about the survey topic, any personal or sensitive information which may be collected from the children, the way the data will be used and whether and with whom DataXing Digital may share such information. We do not sell children’s personal data.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>While the child is completing the survey, it is the responsibility of the parent and/or guardian to supervise them.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>9. &nbsp; &nbsp; Sensitive Data&nbsp;</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>From time to time, DataXing Digital may collect personal data that is classified as “special categories” of personal data. This includes racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation. You can always choose whether to provide this data to us.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>10. &nbsp; &nbsp; Rights of Individuals&nbsp;</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>To request access to personal data that we hold about you, you should submit your request in writing to the e-mail address or postal address shown below in the ”How to Contact Us” section. When you make a request you should provide your panellist ID or any other relevant identifiers. We may also request you provide a copy of a valid government issued or official identification (such as drivers licence or passport) if we need to verify your request.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>You have the following rights in relation to your personal data:</span></p>
  <ol>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to change your mind and to withdraw your consent;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to access your personal data;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to rectify your personal data;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to erase your personal data from our systems, unless we have legitimate interest reasons for continuing to process the information;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to port your personal data (portability right);</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to restrict processing of your personal data;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to object to the processing of your personal data;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to opt out of the sale of your personal data (if we sell your data) and</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Right to not be discriminated against for exercising any of the rights available to you under applicable data protection laws.</span></p>
    </li>
  </ol>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>If necessary, we shall also notify third parties to whom we have transferred your personal data of any changes that we make on your request. Note that while DataXing Digital communicates to these third parties, DataXing Digital is not responsible for the actions taken by these third parties to answer your request. You may be able to access your personal data held by these third parties and correct, amend or delete it where it is inaccurate.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>11. &nbsp; &nbsp; Data Storage and Retention</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Personal data shall be retained only for such period as is appropriate for its intended and lawful use. DataXing Digital shall retain your personal data for as long as you are a member of the Panels. In the event that you unsubscribe from the Panels, we shall retain data for no longer than 3 months after you unsubscribe, unless otherwise required by law. Personal data that is no longer required shall be disposed of in a manner that ensures that the confidential nature is not compromised.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>As part of the Company Business Continuity Plan and as required by ISO 27001, ISO 9001, ISO 20252 and in certain instances the law, our electronic systems are backed up and archived. These archives are retained for a defined period of time in a strictly controlled environment. Once expired, the data is deleted and destroyed to ensure the data is erased completely.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>12. &nbsp; &nbsp; Updates to Our Privacy Policy</span></strong></p>
  
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>We keep our privacy policy under regular review and it may be amended from time to time and at least every 12 months. We will always have the most up-to-date policy on our website, or within your panel portal. We will record when the policy was last revised. Non-material changes to this Privacy Policy will be announced through the Panels’ sites only. Your continued access to the Panels’ sites and services after such changes conclusively demonstrates your consent to any changes.</span></p>
  
  <p><strong><span style={{fontSize: '15pt'}}>13. &nbsp; &nbsp; How to Contact Us</span></strong></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>If you have any questions or concerns relating to your privacy or to DataXing Digital privacy practices, (or for example you wish to unsubscribe), please feel free to contact us.</span></p>
  <p><span style={{color: '#001627', fontSize: '11.5pt'}}>Name of our Data Protection Officer (DPO) – Ankit Khera, OR you can contact DataXing Digital:</span></p>
  <ol>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>by email at&nbsp;</span><a href="mailto:info@dataxing.com"><u><span style={{color: '#0000ff', fontSize: '11.5pt'}}>info@dataxing.com</span></u></a><span style={{color: '#001627', fontSize: '11.5pt'}}>&nbsp;or&nbsp;</span><a href="mailto:info@dataxing.com"><u><span style={{color: '#0000ff', fontSize: '11.5pt'}}>ankit.khera@dataxing.com</span></u></a><span style={{color: '#001627', fontSize: '11.5pt'}}>&nbsp;</span></p>
    </li>
    <li style={{listStyleType: 'decimal', color: '#001627', fontSize: '11.5pt'}}>
      <p><span style={{color: '#001627', fontSize: '11.5pt'}}>by post to: 736-739, Logix Office Tower,Logix City Centre, Sector 32, Noida, Uttar Pradesh - 201301</span></p>
    </li>
  </ol>
</div>

                </Paper>
            </Container>
        </div>
    );
}

export default Privacy;
