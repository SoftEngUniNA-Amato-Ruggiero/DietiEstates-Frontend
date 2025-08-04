import { UserInfo } from './user-info';

export class User {
    email: string;
    info: UserInfo;

    constructor(email: string, info: UserInfo) {
        this.email = email;
        this.info = info;
    }
}
