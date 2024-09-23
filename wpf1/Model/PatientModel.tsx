// PatientModel.ts
export class PatientModel {
    name: string;
    address: string;
    age: number | string;
    phoneNumber: string;

    constructor(name: string, address: string, age: number | string, phoneNumber: string) {
        this.name = name;
        this.address = address;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }

    // You can add methods related to patient data here if needed
}
