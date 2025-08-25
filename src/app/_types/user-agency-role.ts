import { User } from "./user";
import { Agency } from "./agency";

export interface UserAgencyRole {
    user: User;
    agency: Agency | null;
    role: string;
}