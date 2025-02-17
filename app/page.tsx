import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: ["home", "index"],
}

export default function Home() {
  redirect('/order/cafe')
}
