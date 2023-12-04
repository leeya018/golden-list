import Image from "next/image"
import React, { useState, FC } from "react"
import { IoHomeOutline } from "react-icons/io5"
import { IoMdSettings } from "react-icons/io"
import { useRouter } from "next/navigation"
import { UserAuth } from "@/context/AuthContext"
import { BiLogOut } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import useNavLeft from "./hooks/useNavLeft"
import { NavNames } from "@/util"
import { Box, CircularProgress } from "@mui/material"

const NavLeft: FC = () => {
  const { navName, setNavName, router, user, logOut, isLoading, setIsLoading } =
    useNavLeft()
  return (
    <div className="basis-1/6 flex flex-col items-center py-10 px-6 border-r-2 border-color-text-gray ">
      {isLoading && (
        <Box
          sx={{ display: "flex" }}
          className="absolute top-1/2 left-1/2 -translate-y-20"
        >
          <CircularProgress />
        </Box>
      )}
      {/* title */}
      <div className="flex items-center gap-2 mb-7">
        <Image
          alt="profile image"
          width={32}
          height={32}
          className="rounded-lg "
          src={"/images/trophy.png"}
        />
        <div className="font-bold text-4xl ">Stick</div>
      </div>
      {/* my user */}
      <div className="flex items-end gap-2 mb-10">
        {user?.photoURL ? (
          <Image
            alt="profile image"
            width={32}
            height={32}
            className="rounded-full  bg-cover"
            src={user.photoURL}
          />
        ) : (
          <FaUser size={30} />
        )}

        <div className="font-semibold">{user?.displayName}</div>
      </div>
      {/* ul */}
      <ul className="flex flex-col items-start gap-5 capitalize text-gray pl-3">
        <li
          className="flex gap-2 items-start cursor-pointer decoration-color-text-gray hover:underline  hover:ease-in hover:duration-1000"
          onClick={() => {
            if (navName !== NavNames.home) {
              setNavName(NavNames.home)
              setIsLoading(true)
            }

            router.push("/")
          }}
        >
          <IoHomeOutline
            size={20}
            className={`${
              navName === NavNames.home
                ? "text-color-icon-green"
                : "text-color-text-gray"
            } font-bold`}
          />

          <div className="font-medium text-color-text-gray peer">Home</div>
        </li>
        <li
          className="flex gap-2 items-start cursor-pointer decoration-color-text-gray hover:underline  hover:ease-in hover:duration-1000"
          onClick={() => {
            setIsLoading(true)

            setNavName(NavNames.settings)
            router.push("/settings")
          }}
        >
          <IoMdSettings
            size={20}
            className={`${
              navName === NavNames.settings
                ? "text-color-icon-green"
                : "text-color-text-gray"
            } font-bold`}
          />

          <div className="font-medium text-color-text-gray">Settings</div>
        </li>
        <li
          className="flex gap-2 items-start cursor-pointer decoration-color-text-gray hover:underline  hover:ease-in hover:duration-1000"
          onClick={logOut}
        >
          <BiLogOut
            size={20}
            className="text-color-text-gray focus-within:text-color-icon-green"
          />

          <div className="font-medium text-color-text-gray">Logout</div>
        </li>
      </ul>
    </div>
  )
}
export default NavLeft
