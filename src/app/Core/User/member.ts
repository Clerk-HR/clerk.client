import { ResolveStart } from "@angular/router";
import { User } from "./user";
import { Organization } from "../Organization/organization";

export interface Member {
    id: string,
    user: User,
    organization?: Organization,
    roles: Role[],
    JoinedOn: number
}


export enum Role {
    User ='user',
    employee= 'employee',
    manager ='manager'
}