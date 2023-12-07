"use client"

import CategoriesTable from "@/components/categoriesTable"
import Filter from "@/components/filter"
import AddModal from "@/ui/modal/category/add"
import { modals } from "@/util"
import { ModalStore } from "@/mobx/modalStore"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { observer } from "mobx-react-lite"
import { UserAuth } from "@/context/AuthContext"

const Home = observer(() => {
  // useLoginCheck()
  const { user } = UserAuth()

  const addStick = async (categoryId: string, name: string) => {
    const newStick = { name, date: new Date() }
    try {
      const stickCollectionRef = collection(
        db,
        `users/${user.uid}/categories/${categoryId}/sticks`
      )
      const docRef = await addDoc(stickCollectionRef, newStick)
      console.log(docRef.id)
    } catch (error) {
      const e = error as Error
      console.log(e.message)
    }
  }
  return (
    <div className="relative flex min-h-screen bg-white ">
      {ModalStore.modalName === modals.addStick && (
        <AddModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={addStick}
          title={"Add Stick"}
        />
      )}

      <div className="basis-5/6  flex flex-col gap-2">
        <Filter />
        <CategoriesTable />
      </div>
    </div>
  )
})
export default Home
