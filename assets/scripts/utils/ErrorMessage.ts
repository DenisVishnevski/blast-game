export class ErrorMessage {
    private message: string;
    constructor(message: string) {
        this.message = message;
    }

    get notDefined(): Error {
        return new Error(`Component "${this.message}" was not defined in inspector`)
    }

    get notAdded(): Error {
        return new Error(`Component "${this.message}" was not added to this node in inspector`)
    }

    get notFound(): Error {
        return new Error(`Node named "${this.message}" not found`)
    }
}