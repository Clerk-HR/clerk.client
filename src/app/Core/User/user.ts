import { Member } from "./member"

export type User = {
    id: string,
    email: string,
    avatarUrl?: string,
    fullname: string,
    phoneNumber: string,
    onBoarding: OnBoarding,
    createdOn: number
    Profile: Member
}


export enum OnBoarding {
    CreateAccount,
    UserDetails,
    Organization,
    Complete
};
