export class User {
    id: number | null;
    username: string;

    constructor(username: string, id: number | null = null) {
        this.username = username;
        this.id = id;
    }
}
