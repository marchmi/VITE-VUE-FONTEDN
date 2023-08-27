import { defineStore } from 'pinia'
import useForage from '@/plugins/useForage'

const useEnumStore = defineStore('enumStore', {
  state: () => {
    return {
      ingredientsCategoryEnum: [], // 食材种类信息
      ingredientEnum: [], // 食材信息
      ingredientEnumMap: {}, // 食材信息Map
      cuisineEnum: [], // 菜品种类信息
      cuisineEnumMap: {}, // 菜品种类信息Map
    }
  },
  getters: {},
  actions: {
    /**
     * 获取食材种类信息
     */
     fetchIngredientsCategoryEnum() {
      const { fetchList } = useForage('material', 'ingredientsCategory')
      fetchList().then(res => {
        this.ingredientsCategoryEnum.length = 0
        res.list.forEach(ingredient => {
          this.ingredientsCategoryEnum.push({ code: ingredient.ingredientCategoryCode, name: ingredient.ingredientCategoryName, ...ingredient })
        })
      })
    },
    
    /**
     * 获取食材信息
     */
    fetchIngredientEnum() {
      const { fetchList } = useForage('material', 'ingredients')
      fetchList().then(res => {
        this.ingredientEnum.length = 0
        res.list.forEach(ingredient => {
          this.ingredientEnumMap[ingredient.ingredientCode] = { ...ingredient }
          this.ingredientEnum.push({ code: ingredient.ingredientCode, name: ingredient.ingredientName, ...ingredient })
        })
      })
    },

    /**
     * 获取菜品种类信息
     */
    fetchCuisineEnum() {
      const { fetchList } = useForage('material', 'cuisine')
      fetchList().then(res => {
        this.cuisineEnum.length = 0
        res.list.forEach(cuisine => {
          this.cuisineEnumMap[cuisine.cuisineCode] = { ...cuisine }
          this.cuisineEnum.push({ code: cuisine.cuisineCode, name: cuisine.cuisineName, ...cuisine })
        })
      })
    },

  }
})

export default useEnumStore
