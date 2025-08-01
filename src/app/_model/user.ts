import { Credentials } from './credentials';
import { UserInfo } from './user-info';

export class User {
    credentials: Credentials;
    info: UserInfo;

    constructor(credentials: Credentials, info: UserInfo) {
        this.credentials = credentials;
        this.info = info;
    }
}
