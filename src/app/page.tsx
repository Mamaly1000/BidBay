import { auth } from "@/auth";
import Heading from "@/components/common/Heading";
import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";

export default async function HomePage() {
  const session = await auth();

  return (
    <section className="w-full flex flex-col items-start justify-start gap-10">
      <Heading
        title="items for sale"
        subHeading="here you can bid items that are available for sale."
      />
    </section>
  );
}
