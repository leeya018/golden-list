import { Category } from "@/api/categories/interfaces"

export type CategoriesProps = {
  categories: Category[]
  setChosenCategory: (category: Category) => void
  chosenCategory: Category
}
