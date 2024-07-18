
export interface UserAccount {
    id: string,
    email: string,
    onBoarding: onBoarding
}

export interface CreateAccount {

    email: string,
    password: string,
}

export interface CreateAccountResponse {
    account: UserAccount,
    token: string
}


export enum onBoarding {
    CreateAccount,
    UserDetails,
    Organization,
    Complete
}

