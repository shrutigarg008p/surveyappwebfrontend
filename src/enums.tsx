export enum PageStatus {
    None = 'None',
    Loading = 'Loading',
    Loaded = 'Loaded',
    Deleting = 'Deleting',
    Deleted = 'Deleted',
    Submitting = 'Submitting',
    Submitted = 'Submitted',
    Updating = 'Updating',
    Updated = 'Updated',
    Confirmed = 'Confirmed',
    ShowForm = 'ShowForm',
    Rejecting = 'Rejecting',
    Rejected = 'Rejected',
    Repeated = 'Repeated',
    Selecting = 'Selecting',
    Selected = 'Selected',
    Send = 'Send',
    Error = 'Error',
    Success = "Success",
}

export const SIDE_MENU_ITEMS = {
  NONE: 'NONE',
  MORE: 'MORE',
  COUNTRY: 'COUNTRY',
};

export const RequestWorkflow = {
	APPROVE: 'APPROVE',
	DRAFT:"DRAFT",
	REVIEW:"REVIEW",
	REJECT: 'REJECT',
};

export enum AppointmentWorkflow {
    Pending = 'PENDING',
    FreeConsultation = 'FREE_CONSULTATION',
    Approved = 'APPROVE_LEAD',
    Payment = 'PAYMENT',
    Consultation = 'CONSULTATION',
    Completed = 'COMPLETED',
    FURTHER_STATUS = 'FURTHER_STATUS',
}

export enum KycStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum CompanyKycStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum DisputeStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

export enum DisplayTypes {
    CHECKBOX = 1,
    DROPDOWN = 2,
    TAGS = 3,
    RADIO = 4,
    TEXT_BOX = 5
}

export enum Operands {
    All = 1,
    ANSWERED = 2,
    ANY = 3,
    EXCEPT = 4,
    NOT_ANSWERED = 5
}

export enum SeoPageTitle {
  Home = 'Home',
  Login = 'Login',
  Signup = 'Signup',
  Listing = 'Listing',
  Duration = 'Duration',
  Billing = 'Billing',
  Purchase = 'Purchase',
  Kyc = 'Kyc',
  User = 'User',
  SubscriptionPayment = 'SubscriptionPayment',
  Dashboard = 'Dashboard',
  Chat = 'Chat',
  ConsultationRoom = 'ConsultationRoom',
  VideoCall = 'VideoCall',
  PasswordReset = 'PasswordReset',
  Blog = 'Blog',
  Faq = 'Faq',
  PartnerWithUs = 'PartnerWithUs',
}

export enum Assets {
  Logo = "/assets/img/logo2.png"
}

export enum ProfilesIds {
    About = 'b6e9d661-bd50-492c-a2ab-a4551607d9be',
    PersonalFinance = 'bafbf42a-38b2-439d-895f-96ae267a6b28',
    Shopping = '04789a48-98b0-40cb-ac56-a3bb6674dd71',
    Travel = '01af1240-ecb4-4a32-bcf4-fdbba548d2e0',
    LeisureAndActivity = '5c7e2649-aee9-43e5-abeb-bc0fc3aa1dc3',
    Media = 'a5187f72-dc4f-4207-a520-57d2714ce6e9',
    HouseHold = 'db66c69d-8137-45e6-8c22-5d1e81d78f13',
    HealthAndWellness = 'e6ace457-6fec-4b67-b3a1-f28f716c7679',
    Professional = '2339588b-55cc-4d20-976c-ea83283caa83',
    Electronics = '1ce0afed-01c9-46b0-b16c-35069d7236ca',
    Smokers = '9ce620cd-bd19-4cd4-9135-1bcdc167a802',
    Auto = 'd0c9cbee-b5b7-4e18-a872-9210bd4668df',
    FoodAndBeverage = 'd5219ed7-6855-4f68-89f3-27d748eece68'


}
