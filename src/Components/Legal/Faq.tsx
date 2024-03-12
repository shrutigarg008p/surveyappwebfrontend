import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
const faqData = [
    {
      question: "How do I take a survey?",
      answer: "If a survey matches your profile, you will receive an email in your registered e-mail ID or via SMS or WhatsApp Messaging, with a link that will re-direct you to take the survey. We request you to check all these three mediums regularly to participate in surveys and earn I-Points. The more up-to-date your profile surveys are, the more chances you have, of being invited to take part in surveys and earn I-Points."
    },
    {
      question: "How often will I receive a survey?",
      answer: "The number of surveys you receive varies on the number of surveys being run at any given time. At times there may be many all at once, and at other times there may be only a few. The profile information you enter is very important in ensuring that you can be matched to as many surveys as possible. If you keep your 'Member Profile' complete and up to date, you will receive the maximum number of surveys that you qualify for."
    },
    {
        question: "Why am I asked questions about age, income and other personal information?",
        answer: "We ask for personal information such as your name, address, gender, birthday, and employment status to better match you with the appropriate market research projects. This information is also used for incentive fulfilment so that we may send your reward to the appropriate recipient address. Other personal information that you may be asked to provide to us is solely for the purpose of building and operating a worldwide proprietary database of panelists, in order to conduct market research studies on that basis and we provide your responses to our surveys on to our clients in anonymised and aggregated form. Read our privacy policy to know more."
      },
      {
        question: "What is the difference between member profiles and surveys?",
        answer: "Member profiles tell us a little about you and allow us to target you for surveys that match your interests or experience. You can complete these at your leisure in the 'My Profile' area. Surveys are studies in which you will be asked to provide your opinions on specific products, services or advertisements. Surveys are open only for a limited time, until response quotas are met. Occasionally, a study has very specific qualifications that only a small percentage of the population will meet, such a situation might occur when a pharmaceutical company requests feedback from sufferers of a rare disease. In cases like these, it may be necessary to query the entire panel using survey screeners in order to find the handful of panelists who meet the qualifications for a study. Please remember to update your profile and keep it up to date, in order to earn more I-Points."
      },
      {
        question: "Is there a joining fee?",
        answer: "There is NO joining fee. Membership is free. Registration to IndiaPolls is completely free - Just by answering our surveys and engaging in various research activities, you will not only earn I-Points that can be exchanged for vouchers and cash payments, but your valuable answers will enable brands to recognize the market needs and make changes to their products and services and thus help in the overall improvement of goods and services for everyone in the near future."
    },
    {
        question: "How do I become a member of IndiaPolls?",
        answer: "To join IndiaPolls, simply click on 'SIGN UP'. You will be asked to provide some basic information when creating your account. After signing up, a confirmation email will be sent to you in order to finalise your registration. You must click the link in this email to confirm your registration on IndiaPolls. Once your registration is complete, you can start participating in surveys and begin earning I-Points and redeem them with our various redemption options."
    },
    {
        question: "How can I use the rewards I have earned?",
        answer: "To exchange your I-Points for rewards, please follow the steps below: - Sign in to your account - Navigate to the 'My Rewards' page - View items, and ensure that you meet the requirements."
    },
    {
        question: "How long will it take to receive my reward once ordered?",
        answer: "The timing of crediting for I-Points depends on the survey. For some surveys, I-Points are credited very quickly or within a few days, while for others you will receive the I-Points only after the survey has closed. You can expect to wait a maximum of six weeks for I-Points to be credited to your account from when a survey closes, though we try to limit this as much as possible."
    },
    {
        question: "How do I earn I-Points?",
        answer: "First, you must be a registered IndiaPolls member with a verified email address to begin accumulating I-Points. Once your registration is finalised, you can earn I-Points by completing surveys found here on IndiaPolls or through invites you receive via email/WhatsApp or SMS. You can earn extra I-Points by filling out your profile surveys and by inviting your friends to join IndiaPolls."
    },
    {
        question: "Is there any age requirement to join?",
        answer: "You must be 16 years of age or older to create an account and participate in surveys."
    },
    {
        question: "How do I update my personal information?",
        answer: "Sign into your account and visit the 'PROFILE' page. From there you can edit your 'Personal Information'. You may also update other profile information from the same page and get a higher chance of receiving more surveys."
    },
    {
        question: "How do I end my membership with IndiaPolls?",
        answer: "Sign into your account and visit 'My Settings'. Click on 'Unsubscribe From IndiaPolls' button on the top of the page."
    },
    {
        question: "Who are your clients?",
        answer: "IndiaPolls invites thousands of members to answer surveys every day on a wide array of subjects. The purpose of these surveys is to collect your opinions about the products and services of large consumer brands, your habits as a consumer, or about the world you live in. Your opinion will have a direct impact on companies and how they market, distribute or advertise new products and services to consumers like you."
    },
    {
        question: "Can I participate in closed surveys?",
        answer: "Each survey has fixed quotas. When a survey reaches the required number of respondents, it will automatically close and no more responses will be accepted. This can happen sooner than the estimated end date depending on response from members, so please join as soon as it is convenient for you to avoid missing the opportunity of earning I-Points."
    },
    {
        question: "I tried to take a survey, but I didn't qualify?",
        answer: "Sometimes a survey demands respondents who meet very specific criteria. This is because our clients might require feedback from a specific age group or people who use a particular type of product. To increase your chances for qualifying for future online surveys, complete all of your member profiles to earn more I-Points."
    },
    {
        question: "Why is the survey full when I just received the invitation a short time ago?",
        answer: "Sometimes this happens if a survey is generating greater than expected responses. Also, the invitations aren't necessarily delivered right away by your email service provider. Therefore, we advise all our members to keep checking their WhatsApp or SMS along with emails, so that they don't miss any opportunity to earn I-Points. We do apologize for any inconvenience you may experience and thank you for your participation. Please know that more survey opportunities will become available for you in some time soon."
    },
    {
        question: "What is the length of each survey?",
        answer: "Survey length is strictly dependent on the study but a typical survey length ranges between 20 minutes and 40 minutes."
    },
    {
        question: "I have not received any surveys for a long time. How long should I wait?",
        answer: "In your account, any available surveys will be shown in the 'My Surveys' tab. Members are invited to take part in surveys according to the specific need and requirements of each survey. Invitations will be sent automatically as soon as a suitable survey is launched. The profile information you enter is very important in ensuring that you can be matched to as many surveys as possible. If you keep your 'Member Profile' complete and up to date, you will receive the maximum number of surveys that you qualify for. Kindly clear the 'cache' and 'cookies' of your browser to receive timely notifications of survey invitations on your mobile app. Click here to download the android or iOS mobile app."
    },
    {
        question: "How do I take a survey?",
        answer: "All available surveys will be listed on your surveys page after you sign in. From this page, you can view the maximum number of I-Points eligible for a valid response and expiry of the survey timeline. You will receive an email or SMS, notifying you of each new survey you have been invited to. If you have installed our mobile app, you may also receive a notification via the app instead of or in addition to the email."
    },
    {
        question: "What is done with the profile information I gave when signing up?",
        answer: "Your response data is stored on our secured server that allows only the panel to call upon those panelists who match specific criteria to participate in surveys. This query is completely automated and panelists are contacted via email by the panel to participate in our secure surveys. All responses are held in aggregate, which means that individual responses are not linked to personally identifiable information. The information you provide will never be used to advertise or selling purposes. You are not responsible for buying any product or service at any time, nor will any company solicit you as a result of joining the panel."
    },
    {
        question: "Where will you send me the prize that I win?",
        answer: "Prize/Rewards will be sent only at the address that you have provided in your registration form. Do update your address record in 'Account settings' as soon as you move. Also, please make sure that your address is accurate so that your vouchers/rewards can be shipped to the right address."
    },
    {
        question: "How do you know if my responses are accurate?",
        answer: "We build in checks/balances/algorithms within the survey to check the accuracy of the responses. We also look at the time that the respondent takes to fill responses in order to know whether your response is genuine or not."
    },
    {
        question: "Why should I join IndiaPolls if I am a customer?",
        answer: "You are a customer and have an opinion. Your opinion matters. And we give you an opportunity to give your valuable opinion every time you express it. Your valuable opinion and suggestion about products or services will be of immense help to shape the products and services you want and need. Also, apart from giving your valuable opinions, you also earn I-Points which can be redeemed in the form of various reward options we have for our members."
    },
    {
        question: "What are IndiaPolls I-Points?",
        answer: "I-Points are a form of virtual currency awarded to IndiaPolls members for various actions, these include: participation in surveys; inviting friends to join IndiaPolls who complete the registration process; completing profile surveys. When you sign up on IndiaPolls you will receive some I-Points to welcome you to the site. When you have earned enough I-Points, you may redeem them for rewards, such as vouchers from great shops and brands or UPI payments or cashbacks. To stay up to date on all of our offers, please visit the rewards centre."
    },
    {
        question: "Surveys on Mobile: How can I participate in surveys on mobile?",
        answer: "If you would like to receive surveys on your smartphone, simply enter your mobile phone number on IndiaPolls during your registration or directly on your account page. IndiaPolls will only send a limited number of surveys on mobile to specific users that we believe will qualify. You will not be required to answer the survey by text message. The SMS/WhatsApp you will receive will include a link to the survey. When you access a survey from your smartphone, please make sure you have a good internet connection. We recommend using a Wi-Fi secure connection, instead of taking the survey through your Mobile Internet Plan/Mobile Data, to avoid additional costs on your monthly bill/top-up. Warning: Standard SMS reception rates may apply depending on your service provider."
    },
    {
        question: "Who can participate in surveys on mobile?",
        answer: "Anyone who is a member of IndiaPolls and has indicated their mobile phone number on the IndiaPolls.com site can participate in surveys on mobile."
    },
    {
        question: "Are surveys only sent via SMS/WhatsApp?",
        answer: "A few surveys could be sent via SMS / WhatsApp for specific projects. For most surveys, you can participate via email invites and our mobile app."
    },
    {
        question: "How many I-Points can I earn?",
        answer: "There is no limit to how many I-Points you can accumulate on IndiaPolls as there is no limit to how much you can influence your world with IndiaPolls!"
    },
    {
        question: "Do I-Points have to be used within a certain time limit?",
        answer: "Yes. When I-Points are credited to your account, they will remain valid for 12 months. If after this period the I-Points have not been used, they will automatically expire and be deleted from your account. Your I-Points will not expire all at once, instead, I-Points will expire 12 months after you originally earned them. This deduction will always occur towards the end of the month in which they were earned, near the 28th. Please don't wait until the last moment to redeem your I-Points."
    },
    {
        question: "Does IndiaPolls have a mobile app?",
        answer: "Yes, IndiaPolls mobile App is available for both iOS and Android users: Download the IndiaPolls App for iOS. Download the IndiaPolls App for Android."
    },
    {
        question: "How can I invite friends to join IndiaPolls?",
        answer: "To invite your friends to IndiaPolls, you can copy and share your personalised referral link on whatever platform you like. The 'Invite a friend' link can be found in the 'Refer a Friend' tab in your account page."
    },

    {
        question: "How many I-Points will I earn for inviting a friend?",
        answer: "Each time you invite a friend, your account will be credited with 25 I-Points once your friend completes their registration to join the IndiaPolls community. To make sure that all new friends are real people, please note that you can only earn I-Points for a maximum of 10 new friends per month."
    },
    {
        question: "How many I-Points are required to exchange for rewards?",
        answer: "Note that 100 I-Points are valued as INR 100. You must earn the minimum amount before you can exchange them for a reward item of your choice. Click here to view available reward items and the minimum I-Points required."
    },
    {
        question : "I made a redemption request but did not get my reward. When will I receive my E-Gift Card ?",
        answer : "<p>You will receive your E-Gift card based on below timelines.</p><ul><li>AJIO e-Gift Card – Within 7 Working Days</li><li>Flipkart INR e-Gift Card – Within 7 Working Days</li><li>Google Play e-Gift Card – Within 7 Working Days</li> <li>Croma e-Gift Card – Within 15 <li>PhonePe e-Gift Card – Within 15 Working Days</li><li>Amazon e-Gift Card – Within 15-30 </ul>"
    },
    {
        question: "My Flipkart voucher code is not working. What should I do?",
        answer: "<a href='/#/redemption'>Click here</a> to redeem your Flipkart gift card. Flipkart Customer Care Number: 18002089898. They are available 24 hours a day, 7 days a week to resolve your queries. For more details, click here."
    },
    {
        question: "My Amazon voucher code is not working. What should I do?",
        answer: "<a href='/#/redemption' target='_blank'>Click here</a> to redeem your Amazon Gift Card. Amazon Customer Care: 180030002049. They are available 24 hours a day, 7 days a week to resolve your queries. <a href='https://www.amazon.in/gp/help/customer/display.html'>Click here</a> to contact Amazon Care."
    }
];


function FAQ() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6">FAQ</Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className={classes.content}>
            <Paper className={classes.paper}>
                <img alt="Logo" src={Assets.Logo2} className={classes.logo} />
                <Typography variant="h4" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                <div>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
            </Paper>
        </Container>
    </div>

    );
  }

  export default FAQ;
