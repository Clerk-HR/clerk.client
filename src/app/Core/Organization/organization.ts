import { Member } from "../User/member";

export type Organization = {
    id: string,
    name: string,
    description?: string,
    logoUrl?: string,
    createdOn: number,
    inviteCode: string,
    members: Member[]
}