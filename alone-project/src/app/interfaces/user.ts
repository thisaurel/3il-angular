export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    picture: string;
    localisation: Localisation;
    mail: string;
    phone: string;
    description: string;
}

export interface Localisation {
    long: number;
    lat: number;
}