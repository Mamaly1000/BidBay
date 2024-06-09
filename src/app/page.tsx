import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default async function HomePage() {
  const session = await auth();

  return <main className="">{session?.user ? <SignOut /> : <SignIn />} </main>;
}
