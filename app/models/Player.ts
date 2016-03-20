export class Player {
    name: string;
    jerseyNumber: number;
    position: string[];

    constructor(name:string, jerseyNumber:number, position: string[]) {
        this.name = name;
        this.jerseyNumber = jerseyNumber;
        this.position = position;
    }
}