import z from "zod";
import { Person } from "../objects/person.object";
import { Forest } from "../objects/forest.object";

export const WorldObjectData = Person.or(Forest);
export type WorldObjectData = z.infer<typeof WorldObjectData>;
