import { observer } from "mobx-react-lite"
import Image from "next/image"
import { HiMagnifyingGlass } from "react-icons/hi2"

// nav
const Nav = observer(() => {
  return (
    <div className="w-full px-10 py-5 flex items-center justify-between ">
      <div className=" flex items-center justify-around gap-5 text-xl font-bold">
        <div className="relative">
          <div className="font-bold text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Golden
          </div>
          <Image
            alt="golden image"
            width={100}
            height={100}
            className="rounded-lg "
            src={"/images/golden.png"}
          />
        </div>

        <div>Find A</div>
        <div>Find A</div>
        <div>Find A</div>
        <div>Find A</div>
        <div>Find A</div>
      </div>
      <div className="flex items-center justify-around gap-5 text-xl ">
        <div className="relative h-20 flex ">
          <HiMagnifyingGlass
            size={30}
            className="absolute top-1/2 left-2  -translate-y-1/2"
          />
          <input
            type="text"
            className="rounded-full w-72  placeholder:pl-14 bg-color-gray-nav "
            placeholder="learn language"
          />
        </div>
        <div className="flex justify-center items-center ">
          <Image
            alt="me image"
            width={70}
            height={70}
            className="rounded-full "
            src={"/images/me.jpg"}
          />
        </div>
      </div>
    </div>
  )
})

export default Nav
