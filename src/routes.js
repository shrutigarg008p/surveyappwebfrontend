import Dashboard from "@material-ui/icons/Dashboard";
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
import {
  ArrowBack,
  ArrowBackIosTwoTone,
  ArrowDownward,
  ArrowDropDown,
  ArrowForward,
  ArrowLeft, ArrowRight
} from "@material-ui/icons";
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
import MyRewards from "./Components/Rewards/MyRewards";
import MyRequests from "Components/Requests/MyRequests";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardSurvey,
    layout: "/admin",
  },
  {
    path: "/my-rewards",
    name: "My Rewards",
    icon: Dashboard,
    component: MyRewards,
    layout: "/admin",
  },
  {
    path: "/my-requests",
    name: "My Requests",
    icon: Dashboard,
    component: MyRequests,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: Dashboard,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/surveys",
    name: "Surveys",
    icon: Dashboard,
    component: Surveys,
    layout: "/admin",
  },
  {
    path: "/redemption",
    name: "Redemption Request",
    icon: Dashboard,
    component: List,
    layout: "/admin",
  },
  {
    path: "/rewards",
    name: "Rewards",
    icon: Dashboard,
    component: RewardsList,
    layout: "/admin",
  },
  {
    path: "/referrals",
    name: "Referrals",
    icon: Dashboard,
    component: ReferralsList,
    layout: "/admin",
  },
  {
    path: "/",
    name: "PANELISTS",
    icon: ArrowBack,
    component: '',
    layout: "",
  },
  {
    path: "/panelistDashboard",
    name: "All",
    icon: ArrowRight,
    component: AllPanelists,
    layout: "/admin",
  },
  {
    path: "/panelistDetails/:userId",
    name: "Details",
    icon: ArrowRight,
    component: PenalistDetails,
    layout: "/admin",
    isVisible : false
  },
  {
    path: "/registeredOnlyPanelists",
    name: "Registered Only",
    icon: ArrowRight,
    component: RegisteredOnly,
    layout: "/admin",
  },
  {
    path: "/basicProfileOnly",
    name: "Basic Profile Only",
    icon: ArrowRight,
    component: BasicProfileOnly,
    layout: "/admin",
  },
  {
    path: "/unsubscribeRequests",
    name: "Unsubscribe Requests",
    icon: ArrowRight,
    component: UnsubscribedPanelistOnly,
    layout: "/admin",
  },
  {
    path: "/deleteRequests",
    name: "Delete Requests",
    icon: ArrowRight,
    component: DeletedPanelistsOnly,
    layout: "/admin",
  },
  {
    path: "/bounces",
    name: "Bounces",
    icon: ArrowRight,
    component: Bounces,
    layout: "/admin",
  },
  {
    path: "/samples",
    name: "Samples",
    icon: Dashboard,
    component: Samples,
    layout: "/admin",
  },
  {
    path: "/newsletters",
    name: "Newsletters",
    icon: Dashboard,
    component: NewsLetters,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Messages",
    icon: Dashboard,
    component: Messages,
    layout: "/admin",
  },
  {
    path: "/help",
    name: "Help",
    icon: Dashboard,
    component: Help,
    layout: "/admin",
  },
  {
    path: "/",
    name: "MASTER SETTINGS",
    icon: ArrowBack,
    component: '',
    layout: "",
  },
  {
    path: "/redemption-mode",
    name: "Redemption Mode",
    icon: ArrowRight,
    component: RedemptionMode,
    layout: "/master",
  },
  {
    path: "/country",
    name: "Country",
    icon: ArrowRight,
    component: Countries,
    layout: "/master",
  },
  {
    path: "/states",
    name: "States",
    icon: ArrowRight,
    component: States,
    layout: "/master",
  },
  {
    path: "/cities",
    name: "Cities",
    icon: ArrowRight,
    component: City,
    layout: "/master",
  },
  {
    path: "/partners",
    name: "Partners",
    icon: ArrowRight,
    component: PartnersList,
    layout: "/master",
  },
  {
    path: "/profile-management",
    name: "Profiles",
    icon: ArrowRight,
    component: ProfileManagement,
    layout: "/master",
  },
  {
    path: "/labels",
    name: "Labels",
    icon: ArrowRight,
    component: LabelsList,
    layout: "/master",
  },
  {
    path: "/marketing-links",
    name: "Marketing Links",
    icon: ArrowRight,
    component: MarketingLinksList,
    layout: "/admin",
  },
  {
    path: "/sec",
    name: "SEC",
    icon: ArrowRight,
    component: SecList,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: Dashboard,
    component: UserProfile,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-surveys",
    name: "My Surveys",
    icon: Dashboard,
    component: PanelistSurveys,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/panelist-message",
    name: "Messages",
    icon: Dashboard,
    component: MessageForm,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/profile-overview",
    name: "PROFILE",
    icon: ArrowBack,
    component: Profiles,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/about",
    name: "About",
    icon: ArrowRight,
    component: About,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/personal-finance",
    name: "Personal Finance",
    icon: ArrowRight,
    component: PersonalFinance,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/shopping",
    name: "Shopping",
    icon: ArrowRight,
    component: Shopping,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/travels",
    name: "Travel",
    icon: ArrowRight,
    component: Travels,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/health-wellness",
    name: "Health And Wellness",
    icon: ArrowRight,
    component: HealthAndWellness,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/household",
    name: "House Hold",
    icon: ArrowRight,
    component: HouseHold,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/Leisure-activity",
    name: "Leisure And Activity",
    icon: ArrowRight,
    component: LeisureActivity,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/media",
    name: "Media",
    icon: ArrowRight,
    component: Medias,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/professionals",
    name: "Professional",
    icon: ArrowRight,
    component: Professional,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/electronics",
    name: "Electronics",
    icon: ArrowRight,
    component: Electronics,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/smokers",
    name: "Smokers",
    icon: ArrowRight,
    component: Smokers,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/auto",
    name: "Auto",
    icon: ArrowRight,
    component: Auto,
    layout: "/panelist",
    type: 'panelist'
  },
  {
    path: "/food-beverage",
    name: "Food And Beverage",
    icon: ArrowRight,
    component: FoodAndBeverage,
    layout: "/panelist",
    type: 'panelist'
  },
];

export default dashboardRoutes;
