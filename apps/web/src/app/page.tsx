import type { Route } from "next";
import { redirect } from "next/navigation";

const Home = () => {
  redirect("/en" as Route);
};

export default Home;
