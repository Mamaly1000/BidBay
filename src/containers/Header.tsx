import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { auth } from "@/auth";
import SignOut from "@/components/SignOut";
import SignIn from "@/components/SignIn";
import MainNav from "./MainNav";
import NotifNav from "./NotifNav";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="bg-neutral-800 text-white w-full border-b-[1px] border-orange-500 dark">
      <div className="md:container px-2 md:px-0 ">
        <div className=" w-full flex items-center justify-between gap-1">
          <div className="flex items-center justify-start gap-4">
            <Link
              href={"/"}
              className="w-fit flex items-center justify-start gap-2 p-0"
            >
              <div className="relative w-[70px] p-0 h-[70px] aspect-video flex items-center justify-start overflow-hidden ">
                <Image
                  className="object-cover"
                  fill
                  src={logo.src}
                  alt="bidbay logo"
                />
              </div>
              <h5 className="text-xl font-semibold underline">
                <span className="text-orange-500">BidBay</span>.com
              </h5>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center justify-end gap-2 w-fit">
            {user ? <SignOut /> : <SignIn />}
            <NotifNav user={{ name: user?.name, image: user?.image }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
