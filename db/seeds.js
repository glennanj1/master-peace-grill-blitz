import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  const food1 = await db.food.create({
    data: {
      name: "Small Caesar Salad",
      price: 50.00,
      details: 'crisp romain with croutons parmesan cheese and dressing on the side',
      add_ons: "(add chicken for $20.00)",
      category: "A La Carte"
    }
  })
  console.log(food1)
}
export default seed
