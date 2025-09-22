export class User {
    id: number | null;
    username: string;
    roles: { name: string }[] | null;

    constructor(username: string, id: number | null = null, roles: { name: string }[] | null = null) {
        this.username = username;
        this.id = id;
        this.roles = roles;
    }
}
