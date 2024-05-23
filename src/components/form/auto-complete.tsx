'use client'
import React, { useEffect, useRef, useState } from 'react'

type SearchInputProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement>
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onKeyDown, inputRef, placeholder = 'Search Listings' }) => {
  return (
    <input
      type='text'
      className='block w-full p-4 ps-10 text-sm input input-bordered text-base-content'
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={inputRef}
      placeholder={placeholder}
    />
  )
}

type Item = {
  id: number
  title: string
}

type ItemListProps = {
  items: Item[]
  selectedItemIndex: number
  handleItemClick: (product: Item) => void
}

const ItemsList: React.FC<ItemListProps> = ({ items, selectedItemIndex, handleItemClick }) => {
  return (
    <div className='dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md'>
      <ul
        className='menu menu-compact '
        // use ref to calculate the width of parent
        //style={{ width: ref.current?.clientWidth }}
      >
        {items.map((item, index) => (
          <li key={item.id} tabIndex={index + 1} id={`item-${index}`} onClick={() => handleItemClick(item)}>
            <button>{item.title}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const AutocompleteSearchBar = () => {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Item[]>([])
  const [isLoading, setLoading] = useState(true)
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(-1)
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json() as unknown as Item[])
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setSelectedProductIndex(-1)
    setSearchResults(products.filter((product) => product.title.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      setSelectedProductIndex((prevIndex) => (prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1))
    } else if (event.key === 'ArrowDown') {
      setSelectedProductIndex((prevIndex) => (prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1))
    } else if (event.key === 'Enter') {
      if (selectedProductIndex !== -1) {
        const selectedProduct = searchResults[selectedProductIndex]
        alert(`You selected ${selectedProduct.title}`)
        setQuery('')
        setSelectedProductIndex(-1)
        setSearchResults([])
      }
    }
  }

  const handleItemClick = (product: Item) => {
    alert(`You selected ${product.title}`)
    setQuery('')
    setSelectedProductIndex(-1)
  }

  const scrollActiveProductIntoView = (index: number) => {
    const activeProduct = document.getElementById(`product-${index}`)
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex)
    }
  }, [selectedProductIndex])

  return (
    <div className='flex flex-col'>
      <SearchInput value={query} onChange={handleQueryChange} onKeyDown={handleKeyDown} inputRef={inputRef} placeholder='Search Listings' />

      {query !== '' && searchResults.length > 0 && <ItemsList items={searchResults} selectedItemIndex={selectedProductIndex} handleItemClick={handleItemClick} />}
    </div>
  )
}
