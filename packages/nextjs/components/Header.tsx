import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${isActive ? "shadow-md" : ""
        } hover:bg-secondary hover:shadow-md focus:bg-secondary py-1.5 px-3 text-sm rounded-full gap-2`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const router = useRouter();
  console.log(router.pathname);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );
  const navLinks = (
    <>

      {/* {
        router.pathname == "/" &&
        <li>
          <NavLink href="/lands">
            -{">"} Lands
          </NavLink>
        </li>
      } */}

      {/* {
        router.pathname == "/lands" &&
        <li>
          <NavLink href="/"> -{">"} Home </NavLink>
        </li>
      } */}

      {/* <li>
        <NavLink href="/debug">
          Debug Contracts
        </NavLink>
      </li> */}
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-300 min-h-0 flex-shrink-0 justify-between z-20  px-0 sm:px-2">
     
      <div className="navbar-end flex-grow mr-4 mt-2">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
