import { User } from "./user.interface";
import { UserRol } from "~/shared";

class UserModel implements User {
    public id: number;
    public fullName: string;
    public email: string | null;
    public companyId: number;
    public role: UserRol | null;

    private constructor(id: number, fullName: string, email: string, companyId: number, role: UserRol) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.companyId = companyId;
        this.role = role;
    }
}

export default UserModel;