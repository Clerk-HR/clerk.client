import { Member } from "./member"

export type User = {
    id: string,
    email: string,
    avatarUrl?: string,
    fullname: string,
    phoneNumber: string,
    onBoarding: OnBoarding,
    createdOn: number
    profile: Member
}


export enum OnBoarding {
    CreateAccount,
    UserDetails,
    JoinCreate,
    Complete
};
