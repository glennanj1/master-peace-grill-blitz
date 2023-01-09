import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
const CreateFood = z.object({
  name: z.string(),
});
export default resolver.pipe(
  resolver.zod(CreateFood),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const food = await db.food.create({
      data: input,
    });
    return food;
  }
);
