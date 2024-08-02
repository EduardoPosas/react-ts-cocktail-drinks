import { ChangeEvent, FormEvent, useState } from "react"
import { useAppStore } from "../stores/useAppStore"

function Form() {

  const categories = useAppStore((state) => state.categories)
  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: ""
  })
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore(state => state.showNotification)

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setSearchFilter({
      ...searchFilter,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(searchFilter).includes("")) {
      showNotification({ text: "Todos los campos son obligatorios", error: true })
    }

    // Make request
    searchRecipes(searchFilter)
  }

  return (
    <form
      className="my-32 md:w-1/2 lg:w-1/3 space-y-4 bg-orange-400 rounded shadow p-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label
          htmlFor="ingredient"
          className="text-white font-extrabold block uppercase"
        >Ingrediente:</label>
        <input
          type="text"
          name="ingredient"
          id="ingredient"
          placeholder="Ingrediente principal ex. coffee, tequila, vodka ..."
          className="outline-none px-4 py-2 w-full rounded"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="text-white font-extrabold block uppercase"
        >Categoría:</label>
        <select
          name="category"
          id="category"
          className="outline-none px-4 py-2 w-full rounded"
          onChange={handleChange}
        >
          <option value="">--Selecciona categoría--</option>
          {
            categories.drinks.length && categories.drinks.map((category, i) => (<option key={`${category.strCategory}-${i}`}>{category.strCategory}</option>))
          }
        </select>
      </div>

      <input
        type="submit"
        value="Buscar recetas"
        className="bg-orange-700 cursor-pointer uppercase w-full px-4 py-2 text-white font-extrabold rounded mt-4"
      />
    </form>
  )
}

export default Form