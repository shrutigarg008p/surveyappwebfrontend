// import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import {RedemptionRouter} from "./Components/Redemptions";
import {List} from "./Components/Redemptions/List";
import {RewardsList} from "./Components/Rewards/RewardsList";
import UserProfile from "./views/UserProfile/UserProfile";
import {ReferralsList} from "./Components/Referrals/RefferalsList";
import {Countries} from "./Components/Countries/Countries";
import {States} from "./Components/States/States";
import {City} from "./Components/Cities/City";
import {RedemptionMode} from "./Components/RedemptionMode/RedemptionMode";
import {PartnersList} from "./Components/Partners/PartnersList";
import {LabelsList} from "./Components/Labels/LabelsList";
import {MarketingLinksList} from "./Components/MarketingLinks/MarketingLinksList";
import {SecList} from "./Components/Sec/SecList";
import {ProfileManagement} from "./Components/ProfileManagement/ProfileManagement";
import {Surveys} from "./Components/Surveys/Surveys";
import {Samples} from "./Components/Samples/Samples";
import {RegisteredOnly} from "./Components/Panelists/RegisteredOnly";
// import {
//   ArrowBack,
//   ArrowBackIosTwoTone,
//   ArrowDownward,
//   ArrowDropDown,
//   ArrowForward,
//   ArrowLeft, ArrowRight
// } from "@material-ui/icons";
import { Dashboard, AccountCircle, ListAlt, Redeem, CardGiftcard, Group, Apps, Description, HowToReg, Person, Cancel, DeleteForever, Block, Category, Email, Message, Help as HelpIcon, Settings, LocalOffer, Public, LocationCity, LocationOn, Business, AccountBox, Label, Link, Security, Info, AttachMoney, ShoppingCart, Flight, Favorite, Home, SportsEsports, Theaters, Work, Devices, SmokingRooms, DriveEta, Fastfood } from "@material-ui/icons";
import {BasicProfileOnly} from "./Components/Panelists/BasicProfileOnly";
import {UnsubscribedPanelistOnly} from "./Components/Panelists/UnsubscribedPanelistsOnly";
import {DeletedPanelistsOnly} from "./Components/Panelists/DeletedPanelistsOnly";
import {Bounces} from "./Components/Panelists/BouncePenlistsOnly";
import {AllPanelists} from "./Components/Panelists/AllPanelists";
import PenalistDetails from "Components/Panelists/PenalistDetails";
import {NewsLetters} from "./Components/NewsLetters/NewsLetters";
import {Messages} from "./Components/Messsages/Messages";
import {Help} from "./Components/Help/Help";
import {MessageForm} from "./Components/Messsages/MessageForm";
import {DashboardSurvey} from "./Components/Surveys/DashboardSurvey";
import {PanelistSurveys} from "./Components/PanelistSurveys/PanelistsSurveys";
import {About} from "./Components/PanelistProfile/About";
import {PersonalFinance} from "./Components/PanelistProfile/FinancialFinance";
import {Shopping} from "./Components/PanelistProfile/Shoppings";
import {Travels} from "./Components/PanelistProfile/Travels";
import {HealthAndWellness} from "./Components/PanelistProfile/HealthAndWellness";
import {HouseHold} from "./Components/PanelistProfile/HouseHold";
import {LeisureActivity} from "./Components/PanelistProfile/LeisureAndActivity";
import {Medias} from "./Components/PanelistProfile/Media";
import {Professional} from "./Components/PanelistProfile/Professional";
import {Electronics} from "./Components/PanelistProfile/Electronics";
import {Smokers} from "./Components/PanelistProfile/Smokers";
import {Auto} from "./Components/PanelistProfile/Auto";
import {FoodAndBeverage} from "./Components/PanelistProfile/FoodAndBeverage";
import {Profiles} from "./Components/PanelistProfile/Profiles";
import MyRequests from "Components/Requests/MyRequests";
import MyRewards from "./Components/Rewards/MyRewards";
import MyReferralsList from "./Components/Referrals/MyReferralsList";
import {MySettings} from "./Components/My Settings/MySettings";
import DashboardOld from "./views/Dashboard/DashboardOld";
import AdminDashboard from "./views/Dashboard/AdminDashboard";

const dashboardRoutes = [
  {
    path: "/dashboard-admin",
    name: "Admin Dashboard",
    hindi: "एडमिन डैशबोर्ड",
    icon: Dashboard,
    component: AdminDashboard,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Schedule Survey",
    hindi: "सर्वेक्षण की योजना",
    icon: Dashboard,
    component: DashboardSurvey,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    hindi: "उपयोगकर्ता प्रोफ़ाइल",
    icon: AccountCircle,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/surveys",
    name: "Surveys",
    hindi: "सर्वेक्षण",
    icon: ListAlt,
    component: Surveys,
    layout: "/admin",
  },
  {
    path: "/redemption",
    name: "Redemption Request",
    hindi: "रिडेम्प्शन अनुरोध",
    icon: Redeem,
    component: List,
    layout: "/admin",
  },
  {
    path: "/rewards",
    name: "Rewards",
    hindi: "पुरस्कार",
    icon: CardGiftcard,
    component: RewardsList,
    layout: "/admin",
  },
  {
    path: "/referrals",
    name: "Referrals",
    hindi: "संदर्भ",
    icon: Group,
    component: ReferralsList,
    layout: "/admin",
  },
  {
    path: "/",
    name: "PANELISTS",
    hindi: "पैनलिस्ट्स",
    icon: Group,
    component: '',
    layout: "",
  },
  {
    path: "/panelistDashboard",
    name: "All",
    hindi: "सभी",
    icon: Apps,
    component: AllPanelists,
    layout: "/admin",
  },
  {
    path: "/panelistDetails/:userId",
    name: "Details",
    hindi: "विवरण",
    icon: Description,
    component: PenalistDetails,
    layout: "/admin",
    isVisible: false
  },
  {
    path: "/registeredOnlyPanelists",
    name: "Registered Only",
    hindi: "केवल पंजीकृत",
    icon: HowToReg,
    component: RegisteredOnly,
    layout: "/admin",
  },
  {
    path: "/basicProfileOnly",
    name: "Basic Profile Only",
    hindi: "केवल आधारभूत प्रोफ़ाइल",
    icon: Person,
    component: BasicProfileOnly,
    layout: "/admin",
  },
  {
    path: "/unsubscribeRequests",
    name: "Unsubscribe Requests",
    hindi: "सदस्यता रद्द अनुरोध",
    icon: Cancel,
    component: UnsubscribedPanelistOnly,
    layout: "/admin",
  },
  {
    path: "/deleteRequests",
    name: "Delete Requests",
    hindi: "हटाएँ अनुरोध",
    icon: DeleteForever,
    component: DeletedPanelistsOnly,
    layout: "/admin",
  },
  {
    path: "/bounces",
    name: "Bounces",
    hindi: "उछलावर",
    icon: Block,
    component: Bounces,
    layout: "/admin",
  },
  {
    path: "/samples",
    name: "Samples",
    hindi: "नमूने",
    icon: Category,
    component: Samples,
    layout: "/admin",
  },
  {
    path: "/newsletters",
    name: "Newsletters",
    hindi: "समाचार पत्रिकाएँ",
    icon: Email,
    component: NewsLetters,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Messages",
    hindi: "संदेश",
    icon: Message,
    component: Messages,
    layout: "/admin",
  },
  {
    path: "/help",
    name: "Help",
    hindi: "सहायता",
    icon: HelpIcon,
    component: Help,
    layout: "/admin",
  },
  {
    path: "/MASTER SETTINGS",
    name: "MASTER SETTINGS",
    hindi: "मास्टर सेटिंग्स",
    icon: Settings,
    component: '',
    layout: "",
  },
  {
    path: "/redemption-mode",
    name: "Redemption Mode",
    hindi: "रिडेम्प्शन मोड",
    icon: LocalOffer,
    component: RedemptionMode,
    layout: "/master",
  },
  {
    path: "/country",
    name: "Country",
    hindi: "देश",
    icon: Public,
    component: Countries,
    layout: "/master",
  },
  {
    path: "/states",
    name: "States",
    hindi: "राज्य",
    icon: LocationCity,
    component: States,
    layout: "/master",
  },
  {
    path: "/cities",
    name: "Cities",
    hindi: "शहर",
    icon: LocationOn,
    component: City,
    layout: "/master",
  },
  {
    path: "/partners",
    name: "Partners",
    hindi: "साथी",
    icon: Business,
    component: PartnersList,
    layout: "/master",
  },
  {
    path: "/profile-management",
    name: "Profiles",
    hindi: "प्रोफ़ाइल्स",
    icon: AccountBox,
    component: ProfileManagement,
    layout: "/master",
  },
  {
    path: "/labels",
    name: "Labels",
    hindi: "लेबल",
    icon: Label,
    component: LabelsList,
    layout: "/master",
  },
  {
    path: "/marketing-links",
    name: "Marketing Links",
    hindi: "मार्केटिंग लिंक्स",
    icon: Link,
    component: MarketingLinksList,
    layout: "/admin",
  },
  {
    path: "/SEC",
    name: "SEC",
    hindi: "सुरक्षा",
    icon: Security,
    component: SecList,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    hindi: "डैशबोर्ड",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile",
    name: "User Profile",
    hindi: "उपयोगकर्ता प्रोफ़ाइल",
    icon: AccountBox,
    component: UserProfile,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-rewards",
    name: "My Rewards",
    hindi: "मेरे पुरस्कार",
    icon: CardGiftcard,
    component: MyRewards,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-requests",
    name: "My Requests",
    hindi: "मेरे अनुरोध",
    icon: Redeem,
    component: MyRequests,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/my-referrals",
    name: "My Referrals",
    hindi: "मेरे संदर्भ",
    icon: Group,
    component: MyReferralsList,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-surveys",
    name: "My Surveys",
    hindi: "मेरे सर्वेक्षण",
    icon: ListAlt,
    component: PanelistSurveys,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/settings",
    name: "My Setting",
    hindi: "मेरी सेटिंग",
    icon: Settings,
    component: MySettings,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-message",
    name: "Contact Us",
    hindi: "हमसे संपर्क करें",
    icon: Message,
    component: MessageForm,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile-overview",
    name: "PROFILE",
    hindi: "प्रोफ़ाइल",
    icon: AccountBox,
    component: Profiles,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/about",
    name: "About",
    hindi: "बारे में",
    icon: Info,
    component: About,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/personal-finance",
    name: "Personal Finance",
    hindi: "व्यक्तिगत वित्त",
    icon: AttachMoney,
    component: PersonalFinance,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/shopping",
    name: "Shopping",
    hindi: "खरीदारी",
    icon: ShoppingCart,
    component: Shopping,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/travels",
    name: "Travel",
    hindi: "यात्रा",
    icon: Flight,
    component: Travels,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/health-wellness",
    name: "Health And Wellness",
    hindi: "स्वास्थ्य और बेहतरीनी",
    icon: Favorite,
    component: HealthAndWellness,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/household",
    name: "House Hold",
    hindi: "घरेलू",
    icon: Home,
    component: HouseHold,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/Leisure-activity",
    name:  "Leisure And Activity",
    hindi: "फुर्सत और गतिविधि",
    icon: SportsEsports,
    component: LeisureActivity,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/media",
    name:  "Media",
    hindi: "मीडिया",
    icon: Theaters,
    component: Medias,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/professionals",
    name:  "Professional",
    hindi: "पेशेवर",
    icon: Work,
    component: Professional,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/electronics",
    name: "Electronics",
    hindi: "इलेक्ट्रॉनिक्स",
    icon: Devices,
    component: Electronics,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/smokers",
    name: "Smokers",
    hindi: "धूम्रपानकर्ता",
    icon: SmokingRooms,
    component: Smokers,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/auto",
    name:  "Auto",
    hindi: "ऑटो",
    icon: DriveEta,
    component: Auto,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/food-beverage",
    name: "Food And Beverage",
    hindi: "खाद्य और पेय",
    icon: Fastfood,
    component: FoodAndBeverage,
    layout: "/panelist",
    type: 'panelist'
  },
];


export default dashboardRoutes;
