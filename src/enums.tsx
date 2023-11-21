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
