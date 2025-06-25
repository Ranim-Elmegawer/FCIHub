import { Roles } from "../role.enum";

export class AdminResponse {
    id: number;
    name: string;
    gender: string;
    email: string;

    constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.gender = user.gender;
        this.email = user.email;
  }
  
}