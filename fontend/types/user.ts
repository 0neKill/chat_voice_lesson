export interface IUser {
    id: number,
    gitId: number;
    fullName: string;
    avatarUrl: string;
    userName: string;
    phone?: string;
    token?: string;
    roomId?: string
}