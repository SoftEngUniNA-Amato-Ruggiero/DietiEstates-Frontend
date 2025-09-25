import { RoleDTO } from "../RoleDTO";

export class UserResponseDTO {
    id: number;
    username: string;
    roles: Array<RoleDTO>;

    constructor(id: number = 0, username: string = '', roles: Array<RoleDTO> = []) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}
