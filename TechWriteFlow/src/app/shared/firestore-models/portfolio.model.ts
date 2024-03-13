import { Project } from "./project.model";

export interface Portfolio{
    uid?: string,
    public?: boolean,
    projects?: Project[]
}
