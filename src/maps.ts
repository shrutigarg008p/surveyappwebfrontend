import {mapper} from "./Shared/Mapper";
import {AppointmentWorkflow} from "./enums";
import {KycStatus,CompanyKycStatus,DisputeStatus} from "./enums";

export const userKycStatusMap = mapper({
    [KycStatus.Pending]: 'Pending',
    [KycStatus.Approved]: 'Approved',
    [KycStatus.Rejected]: 'Rejected',
});

export const companyKycStatusMap = mapper({
    [CompanyKycStatus.Pending]: 'Pending',
    [CompanyKycStatus.Approved]: 'Approved',
    [CompanyKycStatus.Rejected]: 'Rejected',
});

export const disputeStatusMap = mapper({
    [DisputeStatus.PENDING]: 'PENDING',
    [DisputeStatus.RESOLVED]: 'RESOLVED',
});
