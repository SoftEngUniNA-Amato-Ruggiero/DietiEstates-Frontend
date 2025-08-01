export class Credentials {
    email: string;
    cognitoSub: string;

    constructor(email: string, cognitoSub: string) {
        this.email = email;
        this.cognitoSub = cognitoSub;
    }
}