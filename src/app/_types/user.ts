export class User {
    username: string;
    role: string | null;

    constructor(username: string, role: string | null) {
        this.username = username;
        this.role = role;
    }
}
