import { Credentials } from "./credentials";
import { User } from "./user";
import { UserInfo } from "./user-info";

export class RealEstateAgent extends User {
    agencyId: number;

    constructor(credentials: Credentials, info: UserInfo, id: number) {
        super(credentials, info);
        this.agencyId = id;
    }
}