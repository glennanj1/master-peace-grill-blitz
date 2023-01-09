import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import createFood from "src/foods/mutations/createFood";
import { FoodForm, FORM_ERROR } from "src/foods/components/FoodForm";
const NewFoodPage = () => {
  const router = useRouter();
  const [createFoodMutation] = useMutation(createFood);
  return (
    <Layout title={"Create New Food"}>
      <h1>Create New Food</h1>

      <FoodForm
        submitText="Create Food"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFood}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const food = await createFoodMutation(values);
            await router.push(
              Routes.ShowFoodPage({
                foodId: food.id,
              })
            );
          } catch (error) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.FoodsPage()}>
          <a>Foods</a>
        </Link>
      </p>
    </Layout>
  );
};
NewFoodPage.authenticate = true;
export default NewFoodPage;
