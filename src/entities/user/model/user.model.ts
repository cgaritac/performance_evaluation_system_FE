import { UserRol } from "~/shared";
import { User } from "./user.interface";

class UserModel implements User {
    public id: number;
    public fullName: string;
    public email: string | null;
    public departmentId: number;
    public role: UserRol | null;

    private constructor(id: number, fullName: string, email: string, departmentId: number, role: UserRol) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.departmentId = departmentId;
        this.role = role;
    }
}

export default UserModel;