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


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: Dashboard,
    component: UserProfile,
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
    path: "/country",
    name: "Country",
    icon: Dashboard,
    component: Countries,
    layout: "/master",
  },
  {
    path: "/states",
    name: "States",
    icon: Dashboard,
    component: States,
    layout: "/master",
  },
  {
    path: "/cities",
    name: "Cities",
    icon: Dashboard,
    component: City,
    layout: "/master",
  },
  {
    path: "/redemption-mode",
    name: "Redemption Mode",
    icon: Dashboard,
    component: RedemptionMode,
    layout: "/master",
  },
  {
    path: "/partners",
    name: "Partners",
    icon: Dashboard,
    component: PartnersList,
    layout: "/master",
  },
  {
    path: "/labels",
    name: "Labels",
    icon: Dashboard,
    component: LabelsList,
    layout: "/master",
  },
  {
    path: "/marketing-links",
    name: "Marketing Links",
    icon: Dashboard,
    component: MarketingLinksList,
    layout: "/master",
  },
  {
    path: "/sec",
    name: "SEC",
    icon: Dashboard,
    component: SecList,
    layout: "/master",
  },
];

export default dashboardRoutes;
