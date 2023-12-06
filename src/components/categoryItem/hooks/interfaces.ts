import { Category } from "@/api/categories/interfaces"

export type CategoryItemProps = {
  category: Category
  setChosenCategory: (category: Category) => void
  setCategories: (categories: Category[]) => void
  chosenCategory: Category
}
