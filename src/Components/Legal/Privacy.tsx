import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

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
          <Typography variant="h6" > Privacy Policy</Typography><br/>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.content}>
        <Paper className={classes.paper} >
          <div style={{textAlign : "center"}}>
          <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
          </div>
          <Typography variant="h4" style={{textAlign : "center"}} gutterBottom>
            Privacy Policy
          </Typography><br/>
          <Typography variant="h5" style={{ color: '#455a64', textAlign : "center" }}>INDIAPOLLS PANEL PRIVACY POLICY</Typography><br/>
          <Typography variant="h6">DataXing Digital Privacy Policy</Typography><br/>

          <Typography variant="h6">1. Introduction</Typography><br/>
          <Typography variant="body1" style={{ color: '#001627' }}>
          This Privacy Policy sets out the commitment of DataXing Digital India Pvt. Ltd. and its
          affiliates including (DataXing Digital Inc. USA and DataXing Digital, London) (All Together
          “DataXing”), To the privacy of its panel members (“Panellists”, “Panellist”), and governs
          Panellists’ rights regarding privacy and data protection.
          </Typography><br/>
          <Typography variant="body1" style={{ color: '#001627' }}>
            This Privacy Policy applies to the DataXing Digital panels known as IndiaPolls, altogether identified in this Privacy Policy as the DataXing Digital panels (the “Panels”). For clarity, this policy is publicly available on the IndiaPolls panel site as “IndiaPolls Panel Privacy Policy”. Panellists are members of the Panels, operated by DataXing Digital and for which DataXing Digital is the data controller. Taking part in our panels, surveys and research activities is entirely voluntary. By registering to the Panels and accepting these terms, you confirm that you have read and understood the terms of this Privacy Policy. We ask you to read this Privacy Policy carefully.
          </Typography><br/>
          <Typography variant="body1" style={{ color: '#001627' }}>
            For the purpose of this Privacy Policy, personal data means any information which relates to an identifiable living individual (or the equivalent applicable term in your jurisdiction - for example in New Delhi, personal information would also relate to a specific household).
          </Typography>
          <Typography variant="h6">2. Lawful Collection and Use of Data</Typography><br/>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We collect your personal data in several ways such as through our website(s) (for example your panel portal), our mobile applications and other activities such as social media, apps and online, face to face or telephone studies or other research activities. We may add other ways and activities moving forward but we will always operate in compliance with this policy.
          </Typography><br/>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We have set out below, more detailed information about how we use your personal data. We are also required by law to explain the legal basis for processing your personal data. These legal bases are listed below and could be different for each use case:
          </Typography><br/>
          <ul style={{"color": "#001627"}}>
  <li>we have your consent for the use of your personal data;</li>
  <li>we need to use your personal data in order to perform a contract with you;</li>
  <li>we need to process your data to comply with a legal obligation;</li>
  <li>we need to process your data in order to protect your vital interests or someone else;</li>
  <li>the processing is necessary to perform a task in the public interest; or</li>
  <li>the use of your personal data is necessary for our (or our clients’) legitimate interests (in which case we will explain what those interests are).</li>
</ul>

          <Typography variant="body1" style={{ color: '#001627' }}>
            We will never misrepresent ourselves or what we are doing. If you receive an email that concerns you, purporting to be from us, please let us know as shown below in “How to Contact Us”.
          </Typography><br/>

          <Typography variant="h6">OPERATING OUR WEBSITE(S)</Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>PURPOSE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Ensure that content from our site is presented effectively, according to the device you are accessing it on.
          </Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Analyse statistical data about user(s) browsing actions and their patterns
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>DATA COLLECTED/PROCESSED</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            IP address, operating system information, browser type
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>SOURCE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We obtain this data from you directly
          </Typography><br/>
          <Divider /><br/>

          <Typography variant="h6">PANEL REGISTRATION AND MANAGEMENT</Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>PURPOSE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            To administer your panel profile and to communicate with you, including informing you about the panel, selecting you for future surveys, contacting you to participate in our survey and other research activities, issuing your incentive, helping when you contact our panel support, etc.
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>DATA COLLECTED/PROCESSED</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Name, email address, postal address, mobile device ID, demographics and any detail you share with us about yourself and your household
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>SOURCE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We obtain this data from you directly
          </Typography><br/>
          <Divider /><br/>

          <Typography variant="h6">MARKET RESEARCH</Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>PURPOSE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            To understand your views about certain products and services or to understand your behaviour in different situations
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>DATA COLLECTED/PROCESSED</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Identifier, contact details, email address, voice, image, opinion
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>SOURCE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We obtain this data from you directly
          </Typography><br/>
          <Divider /><br/>

          <Typography variant="h6">SCIENTIFIC RESEARCH FOR ACADEMICS, PUBLIC HEALTH ORGANISATIONS OR RESEARCH COUNCIL INSTITUTES</Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>PURPOSE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Including but not limiting to clinical studies, health economics and outcomes research (HEOR), non-interventional studies (NIS), real world research (RWR), observational studies, epidemiology research
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>DATA COLLECTED/PROCESSED</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Identifier, contact details, email address, health data, e.g. disease, health status, diagnose, treatment pattern, unmet needs
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>SOURCE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We obtain this data from you directly, or combined with other secondary database
          </Typography><br/>
          <Divider /><br/>

          <Typography variant="h6">SCIENTIFIC RESEARCH FOR COMMERCIAL COMPANIES AND CHARITABLE RESEARCH ORGANISATIONS</Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>PURPOSE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Including but not limiting to clinical studies, health economics and outcomes research (HEOR), non-interventional studies (NIS), real world research (RWR), observational studies, epidemiology research
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>DATA COLLECTED/PROCESSED</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            Identifier, contact details, email address, health data, e.g. disease, health status, diagnose, treatment pattern, unmet needs
          </Typography><br/>
          <Typography variant="subtitle1" style={{ color: '#455a64' }}>SOURCE</Typography>
          <Typography variant="body1" style={{ color: '#001627' }}>
            We obtain this data from you directly, or combined with other secondary database
          </Typography><br/>
          <Divider /><br/>
          <hr />

          <div>
            <Typography variant="h5" gutterBottom><strong>SAFETY MONITORING (PHARMACOVIGILANCE ADVERSE EVENTS REPORTING)</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">Report Adverse Events during our studies to competent authorities</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Identifier, contact details, email address, disease, treatment, product taken and adverse events</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly, or combined with other secondary database</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>PUBLIC DISCLOSURE</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To share or disclose pursuant to judicial or other government subpoenas, warrants, orders or pursuant to similar and other legal or regulatory requirements, we will provide such information to the appropriate authorities</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Identifier, name, contact details, email address, incentive received</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly, or combined with other secondary database</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>FRAUD PROTECTION</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">Protection of our business interests against fraudulent behaviour</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">IP address, browser specifications, device specifications, postal addresses, email addresses, official identification number (i.e. ME number)</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>SURVEY PARTICIPATION UNIQUENESS</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">Prevention of multiple entries in surveys by the same individuals in line with our Terms and Conditions</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">IP address, browser specifications, device specifications</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>TRACKING OF THE ANSWERS OF RECURRING RESPONDENTS (SPECIAL RESEARCH DESIGN PROJECTS)</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">When you participate in our surveys, we typically use a temporary ID which makes your answers in the survey anonymous to our clients. However, some of our clients have the specific research design need to understand how your opinion has evolved over a period of time. For this specific project type that we call "tracking" projects we will use persistent IDs and we will make this clear at the beginning of each of these surveys. Your survey responses will be considered as personal data and you will have the right to access them. Such projects will contain a notice on the very first page of the survey, so that you can identify them and decide whether or not to take part</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Persistent unique project-specific identifier</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA MATCHING AND ENRICHMENT</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">We enrich the data we hold on file about you by matching your personal data with third parties. This will help us to improve your panel profile and ensure that we select relevant surveys for you.</Typography><br/>
            <Typography variant="body1">We utilize matching services (i.e. third parties who are specialized in data management) to acquire additional information about you from public and private data sources (such as social networks, retailers and content subscription services with whom you have an account) or to use your personal data as an aid to develop additional or new types of anonymous data sets (i.e. we compile your aggregate data with data from other consumers to create a new lifestyle segment). The matching service (our data partner) holds the personal data we share for a short time, uses it to assemble the additional information, and then returns the combined information to us. Data partners are contractually bound to delete the data we share with them and/or are not authorised to use it in any way other than for this specific purpose.</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Persistent unique identifier, contact details, email address, social login, cookie, mobile device ID, official identification number (i.e. ME number)</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly or combined with other secondary database</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>ADVERTISING TARGETING AND MEDIA BUYING RESEARCH</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">We carry out research studies to understand the effectiveness of our media and advertising campaigns, and to serve you with more relevant advertisements</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">IP address, browser specifications, device specifications, postal addresses, email addresses, cookies, mobile device ID, social login, browsing history, online behaviour, official identification number (i.e. ME number)</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data from you directly, or combined with other secondary database</Typography><br/>
            <Divider /><br/>
          </div>
          <div>
            <Typography variant="h5" gutterBottom><strong>MOBILE AND WEBSITE ANALYTICS</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To understand how visitors interact with our mobile applications and websites to improve their performance and design</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">IP address, browser specifications, device specifications, browsing history, online behaviour</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data directly from your interactions with our mobile applications and websites</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>CUSTOMER SUPPORT</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To provide assistance and support to our customers</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Name, contact details, email address, inquiry details</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data directly from you when you reach out to our customer support team</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA RETENTION</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To retain personal data as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA DELETION</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To delete personal data when it is no longer necessary for the purposes outlined in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA SECURITY</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption of personal data, where appropriate</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>
          <div>
            <Typography variant="h5" gutterBottom><strong>MOBILE AND WEBSITE ANALYTICS</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To understand how visitors interact with our mobile applications and websites to improve their performance and design</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">IP address, browser specifications, device specifications, browsing history, online behavior</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data directly from your interactions with our mobile applications and websites</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>CUSTOMER SUPPORT</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To provide assistance and support to our customers</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Name, contact details, email address, inquiry details</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">We obtain this data directly from you when you reach out to our customer support team</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA RETENTION</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To retain personal data as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA DELETION</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To delete personal data when it is no longer necessary for the purposes outlined in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>DATA SECURITY</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption of personal data, where appropriate</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>
          <div>
            <Typography variant="h5" gutterBottom><strong>THIRD PARTIES (CLIENTS AND SUPPLIERS)</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To share personal data with third-party vendors and processors for panel management related activities</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">Name, email address, postal address, phone number, cookie ID, panelist ID, IP address</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">Directly from you and your interactions with our panel services</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>CONFIDENTIALITY, SECURITY, AND INDUSTRY REQUIREMENTS</strong></Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">PURPOSE</Typography>
            <Typography variant="body1">To protect your personal data with appropriate technological and organizational measures</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">DATA COLLECTED/PROCESSED</Typography>
            <Typography variant="body1">All personal data collected and processed as described in this Privacy Policy</Typography><br/>
            <Typography variant="subtitle1" color="textSecondary">SOURCE</Typography>
            <Typography variant="body1">N/A</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>INDUSTRY STANDARDS</strong></Typography><br/>
            <Typography variant="body1">We adhere to various standards and industry codes depending on your location, including:</Typography><br/>
            <ul>
              <li>
                <Typography variant="body1">Market Research Society of India (MRSI)</Typography><br/>
              </li>
            </ul>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>COOKIE DISCLOSURE</strong></Typography><br/>
            <Typography variant="body1">Cookies are small text files stored on your computer or mobile device by a website that assigns a numerical user ID and stores certain information about your online browsing. They are used to help users navigate websites efficiently and perform certain functions.</Typography><br/>
            <Typography variant="body1">For more information, please log in and access your cookie policy page where you are able to adjust your cookie settings.</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>ACCURACY</strong></Typography><br/>
            <Typography variant="body1">We take reasonable steps to keep personal data accurate, complete, and current, based on the most recent information made available to us by you and/or by our client.</Typography><br/>
            <Typography variant="body1">You are responsible for ensuring that you notify us of any changes to your personal data.</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>CHILDREN'S DATA</strong></Typography><br/>
            <Typography variant="body1">We never knowingly invite children under the legal age set by the authorities in the country in which you reside to participate in research studies without parental permission.</Typography><br/>
            <Typography variant="body1">If it is necessary and appropriate to a particular project to directly involve children under the legal age, we take measures to ensure we have obtained permission by a parent and/or legal guardian.</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>SENSITIVE DATA</strong></Typography><br/>
            <Typography variant="body1">From time to time, we may collect personal data that is classified as “special categories” of personal data. This includes racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation. You can always choose whether to provide this data to us.</Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>RIGHTS OF INDIVIDUALS</strong></Typography><br/>
            <Typography variant="body1">You have the following rights in relation to your personal data:</Typography><br/>
            <ol>
              <li><Typography variant="body1">Right to change your mind and to withdraw your consent;</Typography><br/></li>
              <li><Typography variant="body1">Right to access your personal data;</Typography><br/></li>
              <li><Typography variant="body1">Right to rectify your personal data;</Typography><br/></li>
              <li><Typography variant="body1">Right to erase your personal data from our systems, unless we have legitimate interest reasons for continuing to process the information;</Typography><br/></li>
              <li><Typography variant="body1">Right to port your personal data;</Typography><br/></li>
              <li><Typography variant="body1">Right to object to the processing of your personal data;</Typography><br/></li>
              <li><Typography variant="body1">Right to restrict the processing of your personal data;</Typography><br/></li>
              <li><Typography variant="body1">Right not to be subject to automated decision-making;</Typography><br/></li>
              <li><Typography variant="body1">Right to lodge a complaint with a supervisory authority;</Typography><br/></li>
              <li><Typography variant="body1">Right to receive details about the existence of automated decision-making, including profiling and meaningful information about the logic involved, as well as the significance and expected consequences of such processing for you.</Typography><br/></li>
              <li><Typography variant="body1">Right to opt out of the sale of your personal data (if we sell your data) and</Typography><br/></li>
              <li><Typography variant="body1">Right to not be discriminated against for exercising any of the rights available to you under applicable data protection laws.</Typography><br/></li>
            </ol>
            <Divider /><br/>
          </div>
          <div>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              If necessary, we shall also notify third parties to whom we have transferred your personal data of any changes that we make on your request. Note that while DataXing Digital communicates to these third parties, DataXing Digital is not responsible for the actions taken by these third parties to answer your request. You may be able to access your personal data held by these third parties and correct, amend, or delete it where it is inaccurate.
            </Typography><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>Data Storage and Retention</strong></Typography><br/>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              Personal data shall be retained only for such period as is appropriate for its intended and lawful use. DataXing Digital shall retain your personal data for as long as you are a member of the Panels. In the event that you unsubscribe from the Panels, we shall retain data for no longer than 3 months after you unsubscribe, unless otherwise required by law. Personal data that is no longer required shall be disposed of in a manner that ensures that the confidential nature is not compromised.
            </Typography><br/>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              As part of the Company Business Continuity Plan and as required by ISO 27001, ISO 9001, ISO 20252 and in certain instances the law, our electronic systems are backed up and archived. These archives are retained for a defined period of time in a strictly controlled environment. Once expired, the data is deleted and destroyed to ensure the data is erased completely.
            </Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>Updates to Our Privacy Policy</strong></Typography><br/>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              We keep our privacy policy under regular review and it may be amended from time to time and at least every 12 months. We will always have the most up-to-date policy on our website, or within your panel portal. We will record when the policy was last revised. Non-material changes to this Privacy Policy will be announced through the Panels’ sites only. Your continued access to the Panels’ sites and services after such changes conclusively demonstrates your consent to any changes.
            </Typography><br/>
            <Divider /><br/>
          </div>

          <div>
            <Typography variant="h5" gutterBottom><strong>How to Contact Us</strong></Typography><br/>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              If you have any questions or concerns relating to your privacy or to DataXing Digital privacy practices, (or for example you wish to unsubscribe), please feel free to contact us.
            </Typography><br/>
            <Typography variant="body1" style={{ color: '#001627', fontSize: '11.5pt' }}>
              Name of our Data Protection Officer (DPO) – Ankit Khera, OR you can contact DataXing Digital:
            </Typography><br/>
            <ol>
              <li style={{ color: '#001627', fontSize: '11.5pt' }}>
                <Typography variant="body1">
                  by email at <a href="mailto:info@dataxing.com" style={{ color: '#0000ff', fontSize: '11.5pt' }}>info@dataxing.com</a> or <a href="mailto:ankit.khera@dataxing.com" style={{ color: '#0000ff', fontSize: '11.5pt' }}>ankit.khera@dataxing.com</a>
                </Typography><br/>
              </li>
              <li style={{ color: '#001627', fontSize: '11.5pt' }}>
                <Typography variant="body1">
                  by post to: 736-739, Logix Office Tower, Logix City Centre, Sector 32, Noida, Uttar Pradesh - 201301
                </Typography><br/>
              </li>
            </ol>
          </div>

        </Paper>
      </Container>
    </div>
  );
}

export default Privacy;
