import { Member } from "../User/member";

export type Organization = {
    id: string,
    name: string,
    description?: string,
    logoUrl?: string,
    departments: string[],
    createdOn: number,
    members: Member[]
}