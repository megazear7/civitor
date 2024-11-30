import z from "zod";

export const WorldZoneData = z.number().array();
export type WorldZoneData = z.infer<typeof WorldZoneData>;
