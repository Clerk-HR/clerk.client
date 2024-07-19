export interface User {
    id: string,
    email: string,
    avatarUrl?: string,
    fullname: string,
    phoneNumber: string,
    onBoarding: OnBoarding,
    createdOn: number
}

export enum OnBoarding {
    UserDetails,
    Organization,
    Complete
};
