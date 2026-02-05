export type TUser = {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    roles: string[]
    // ======================
    // refreshToken: string;
    // userId: string;
    // fullName: string;
    // email: string;
    // phoneNumber: string;
    // roles: string[]
    // ======================
    // id: number;
    // username: string;
    // email: string;
    // password: string;
}

export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';