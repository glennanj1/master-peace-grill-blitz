import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";
const UpdateFood = z.object({
  id: z.number(),
  name: z.string(),
});
export default resolver.pipe(
  resolver.zod(UpdateFood),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const food = await db.food.update({
      where: {
        id,
      },
      data,
    });
    return food;
  }
);
