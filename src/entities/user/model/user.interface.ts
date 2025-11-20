import { UserRol } from "~/shared";

export interface User {
    email: string | null;
    role: UserRol | null;
    id: number;
    fullName: string;
    departmentId: number;
}