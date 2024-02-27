import React from 'react'
import useSelectedCategory from '../hooks/useSelectedCategory'
import SkeletonCategoryList from './SkeletonCategoryList'
import CategoryItem from './CategoryItem'

export default function CategoriesList({ categories }) {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory()
  return (
    <>
      <h1 className="text-xl font-medium">Popular Categories</h1>
      <div className="flex flex-wrap my-4 gap-3">
        {categories.length ? (
          categories.map((category, i) => (
            <CategoryItem
              key={i}
              category={category}
              isSelected={selectedCategory === category}
              clickHandler={() => setSelectedCategory(category)}
            />
          ))
        ) : (
          <SkeletonCategoryList />
        )}
      </div>
    </>
  )
}