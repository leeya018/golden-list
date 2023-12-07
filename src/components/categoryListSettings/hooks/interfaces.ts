import { Category } from "@/api/categories/interfaces"

export type CategoriesProps = {
  categories: Category[]
  setChosenCategory: (category: Category) => void
  setCategories: (categories: Category[]) => void
  chosenCategory: Category
}
export type CategoryItemSettingsProps = {
  category: Category
}
