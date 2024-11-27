import z from "zod";

export const WorldObjectType = z.enum(["person", "forest"]);
export type WorldObjectType = z.infer<typeof WorldObjectType>;

export const BaseWorldObject = z.object({
  pos: z.object({
    x: z.number().int(),
    y: z.number().int(),
  }),
});
export type BaseWorldObject = z.infer<typeof BaseWorldObject>;

export const Person = BaseWorldObject.extend({
  type: z.literal(WorldObjectType.enum.person),
});
export type Person = z.infer<typeof Person>;

export const Forest = BaseWorldObject.extend({
  type: z.literal(WorldObjectType.enum.forest),
});
export type Forest = z.infer<typeof Forest>;

export const WorldObjectData = Person.or(Forest);
export type WorldObjectData = z.infer<typeof WorldObjectData>;
