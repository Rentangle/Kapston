// DoctorModel.ts
export class DoctorModel {
    name: string;
    address: string;
    age: number | string;
    phoneNumber: string;
    licenseNumber: string;

    constructor(name: string, address: string, age: number | string, phoneNumber: string, licenseNumber: string) {
        this.name = name;
        this.address = address;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.licenseNumber = licenseNumber;
    }

    // You can add methods related to doctor data here if needed
}
