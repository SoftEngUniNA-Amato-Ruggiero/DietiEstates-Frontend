export class InsertionDetails {
    tags: string[];
    description: string | null;

    constructor(tags: string[] = [], description: string | null = null) {
        this.tags = tags;
        this.description = description;
    }
}