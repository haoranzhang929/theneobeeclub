import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en"); // Change '/en' to your default locale if needed
  return null;
}
