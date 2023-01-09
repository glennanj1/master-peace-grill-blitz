import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";
import getFood from "src/foods/queries/getFood";
import updateFood from "src/foods/mutations/updateFood";
import { FoodForm, FORM_ERROR } from "src/foods/components/FoodForm";
export const EditFood = () => {
  const router = useRouter();
  const foodId = useParam("foodId", "number");
  const [food, { setQueryData }] = useQuery(
    getFood,
    {
      id: foodId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateFoodMutation] = useMutation(updateFood);
  return (
    <>
      <Head>
        <title>Edit Food {food.id}</title>
      </Head>

      <div>
        <h1>Edit Food {food.id}</h1>
        <pre>{JSON.stringify(food, null, 2)}</pre>

        <FoodForm
          submitText="Update Food"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFood}
          initialValues={food}
          onSubmit={async (values) => {
            try {
              const updated = await updateFoodMutation({
                id: food.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowFoodPage({
                  foodId: updated.id,
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
      </div>
    </>
  );
};
const EditFoodPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFood />
      </Suspense>

      <p>
        <Link href={Routes.FoodsPage()}>
          <a>Foods</a>
        </Link>
      </p>
    </div>
  );
};
EditFoodPage.authenticate = true;
EditFoodPage.getLayout = (page) => <Layout>{page}</Layout>;
export default EditFoodPage;
