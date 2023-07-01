"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const NabBar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toogleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt='logo'
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promtopia</p>
      </Link>
      {/* desktop  nav */}
      <div className="sm:flex hidden">
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link
                href="/create-prompt"
                className="black_btn"
              >
                Create Post
              </Link>
              <button className="outline_btn">Sign Out</button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  height={37}
                  width={37}
                  className="rounded-full"
                  alt='Profile'
                />
              </Link>
            </div>
          ) :
            (
              <>
                {
                  providers && Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      type="button"
                      className="black_btn"
                      onClick={() => signIn(provider.id)}
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
            )
        }
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className="rounded-full"
                alt='Profile'
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {
                toogleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button type='button' onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )
              }
            </div>
          ) :
            (
              <>
                {
                  providers && Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      type="button"
                      className="black_btn"
                      onClick={() => { }}
                    >
                      Sign In
                    </button>
                  ))
                }
              </>
            )
        }
      </div>
    </nav>
  );
};

export default NabBar;