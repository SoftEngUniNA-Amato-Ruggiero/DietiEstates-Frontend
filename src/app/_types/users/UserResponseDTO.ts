import { RoleDTO } from "../RoleDTO";

export interface UserResponseDTO {
    id: number;
    username: string;
    roles: Array<RoleDTO>;
}
