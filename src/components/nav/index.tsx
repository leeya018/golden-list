import React, { FC } from "react"
import filterStore from "@/mobx/filterStore"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import { use, useEffect, useRef, useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"

import { useRouter } from "next/navigation"
import Link from "next/link"
import navStore from "@/mobx/navStore"
import { NavNames } from "@/util"
import { NavItemProps } from "./hooks/interfaces"
import useNav from "./hooks/useNav"
// nav
const Nav = observer(({}) => {
  const { user, logOut } = useNav()
  return (
    <div className="w-full py-5 flex items-center justify-between ">
      <div className=" flex items-center  justify-around gap-5 text-xl font-bold">
        <div className="relative">
          <div className="font-bold text-2xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Golden List
          </div>
          <Image
            alt="golden image"
            width={122}
            height={122}
            className="rounded-lg "
            src={"/images/golden.png"}
          />
        </div>
        <NavItem name={`${NavNames.home}`} />
        <NavItem name={`${NavNames.exam}`} />
        <NavItem name={`${NavNames.settings}`} />
        <NavItem name={`${NavNames.gpt}`} />
      </div>
      <div className="flex items-center justify-around gap-5 text-xl ">
        {/* filter */}
        <Filter />
        <div className="flex justify-center gap-3 items-center ">
          <div className="font-semibold">{user?.displayName}</div>

          <Image
            alt="me image"
            width={70}
            height={70}
            className="rounded-full "
            src={user?.photoURL}
          />
          <button onClick={logOut}>logout</button>
        </div>
      </div>
    </div>
  )
})

export default Nav

const NavItem: FC<NavItemProps> = observer(({ name }) => {
  console.log(name, navStore.nav)
  return (
    <Link
      className={`${
        name === navStore.nav ? "underline" : ""
      } cursor-pointer p-2 m-2 capitalize
      duration-200 hover:underline`}
      href={`/${name}`}
      onClick={() => navStore.setNav(`${name}`)}
    >
      {name}
    </Link>
  )
})

const Filter = observer(({}) => {
  const [showMagnify, setShowMagnify] = useState(true)

  return (
    <div className="relative h-20 flex ">
      {showMagnify && (
        <HiMagnifyingGlass
          size={30}
          className="absolute top-1/2 left-2  -translate-y-1/2"
        />
      )}
      <input
        onFocus={() => setShowMagnify(false)}
        onBlur={() => setShowMagnify(true)}
        onChange={(e) => filterStore.setFilter(e.target.value)}
        value={filterStore.search}
        type="text"
        className="rounded-full w-72  pl-14 bg-color-gray-nav outline-none
        focus:ring-2 focus:ring-color-blue "
        placeholder="learn language"
      />
    </div>
  )
})
