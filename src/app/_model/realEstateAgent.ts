import { User } from "./user";
import { UserInfo } from "./user-info";

export class RealEstateAgent extends User {
    agencyId: number;

    constructor(email: string, info: UserInfo, agencyId: number) {
        super(email, info);
        this.agencyId = agencyId;
    }
}