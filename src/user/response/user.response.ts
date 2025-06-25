import { Roles } from "../role.enum";

export class UserResponse {
    id: number;
    name: string;
    gender: string;
    collage: string;
    university: string;
    level: string;
    major: string;
    universityId: number;
    GPA: number;
    email: string;

    constructor(user: any) {
        this.id = user.id;
        this.name = user.name;
        this.gender = user.gender;
        this.collage = user.collage;
        this.university = user.university;
        this.level = user.level;
        this.major = user.major;
        this.universityId = user.universityId;
        this.GPA = user.GPA;
        this.email = user.email;
  }
  
}