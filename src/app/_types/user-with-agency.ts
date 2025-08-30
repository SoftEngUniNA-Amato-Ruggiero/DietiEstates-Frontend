import { User } from "./user";
import { Agency } from "./agency";

export interface UserWithAgency {
    user: User;
    agency: Agency | null;
    role: string | null;
}