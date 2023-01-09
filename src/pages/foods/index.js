import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getFoods from "src/foods/queries/getFoods";
const ITEMS_PER_PAGE = 100;
export const FoodsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ foods, hasMore }] = usePaginatedQuery(getFoods, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    });
  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    });
  return (
    <div>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <Link
              href={Routes.ShowFoodPage({
                foodId: food.id,
              })}
            >
              <a>{food.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};
const FoodsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Foods</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFoodPage()}>
            <a>Create Food</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FoodsList />
        </Suspense>
      </div>
    </Layout>
  );
};
export default FoodsPage;
