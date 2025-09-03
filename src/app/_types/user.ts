export class User {
    id: number | null;
    username: string;
    roles: string[] | null;

    constructor(username: string, id: number | null = null, roles: string[] | null = null) {
        this.username = username;
        this.id = id;
        this.roles = roles;
    }
}
