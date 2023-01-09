import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";
import Layout from "src/core/layouts/Layout";
import getFood from "src/foods/queries/getFood";
import deleteFood from "src/foods/mutations/deleteFood";
export const Food = () => {
  const router = useRouter();
  const foodId = useParam("foodId", "number");
  const [deleteFoodMutation] = useMutation(deleteFood);
  const [food] = useQuery(getFood, {
    id: foodId,
  });
  return (
    <>
      <Head>
        <title>Food {food.id}</title>
      </Head>

      <div>
        <h1>Food {food.id}</h1>
        <pre>{JSON.stringify(food, null, 2)}</pre>

        <Link
          href={Routes.EditFoodPage({
            foodId: food.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFoodMutation({
                id: food.id,
              });
              await router.push(Routes.FoodsPage());
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
const ShowFoodPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FoodsPage()}>
          <a>Foods</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Food />
      </Suspense>
    </div>
  );
};
ShowFoodPage.authenticate = true;
ShowFoodPage.getLayout = (page) => <Layout>{page}</Layout>;
export default ShowFoodPage;
