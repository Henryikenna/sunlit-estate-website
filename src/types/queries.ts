import { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { ListingType } from '../components/listing/listings-board'
import { serverClient } from '../supabase/config'
import { DbResultOk } from './shorthands'
import { Database, Tables } from './supabase'

export type propertiesWithImages = DbResultOk<typeof getPropertiesWithImagesQuery>
export type propertyWithImages = propertiesWithImages[number]

export type singlePropertyWithImages = DbResultOk<typeof getProperyWithImagesQuery>

const getPropertiesWithImagesQuery = serverClient.from('realtor_property').select(`*, property_images (*), realtors (*)`).order('created_at', { ascending: false }).range(1, 15)
const getProperyWithImagesQuery = serverClient.from('realtor_property').select(`*, property_images (*), realtors (*)`).order('created_at', { ascending: false }).eq('id', 1).limit(1).single()

type AllowedSortValues = 'newest' | 'oldest' | 'high' | 'low'
type AllowedTypeValues = 'house' | 'appartment' | 'land' | 'other'

const rangeMappings: Record<number, number> = {
  1: 0,
  2: 100000,
  3: 150000,
  4: 300000,
  5: 500000,
  6: Infinity,
}

export type PropertyQueryOptions = {
  userId?: string
  type?: AllowedTypeValues
  sort?: AllowedSortValues
  areas?: string[]
  price?: NumberRange
  bedrooms?: number
  bathrooms?: number
  hideNotApproved?: boolean
}

export type NumberRange = {
  from?: number
  to?: number | typeof Infinity
}

export function toValidSort(sort: string | undefined): AllowedSortValues | undefined {
  const allowedSortValues: AllowedSortValues[] = ['newest', 'oldest', 'high', 'low']
  return allowedSortValues.includes(sort as AllowedSortValues) ? (sort as AllowedSortValues) : undefined
}

export function toValidType(type: string | undefined): AllowedTypeValues | undefined {
  const allowedTypeValues: AllowedTypeValues[] = ['appartment', 'house', 'land', 'other']
  return allowedTypeValues.includes(type as AllowedTypeValues) ? (type as AllowedTypeValues) : undefined
}

export function toValidPriceRange(from: string | undefined, to: string | undefined): NumberRange {
  const range: NumberRange = {}
  if (from && rangeMappings[+from]) range.from = rangeMappings[+from]
  if (to && rangeMappings[+to]) range.to = rangeMappings[+to]
  return range
}

export function toValidAreas(areas: string | undefined): string[] | undefined {
  return areas?.split(',')
}

export const getPropertiesWithImages = (page: number, type: ListingType, searchQuery?: string, options?: PropertyQueryOptions, numberOfItems = 15) => {
  let query = serverClient.from('realtor_property').select(`*, property_images (*), realtors (*)`)

  query = applyFilters(options, query, type, searchQuery)

  if (options?.sort) {
    if (options.sort == 'newest' || options.sort == 'oldest') query.order('created_at', { ascending: options.sort != 'newest' })
    if (options.sort == 'high' || options.sort == 'low') query.order('price', { ascending: options.sort != 'high', nullsFirst: false })
  } else {
    query.order('created_at', { ascending: false })
  }

  query.range((page - 1) * numberOfItems, (page - 1) * numberOfItems + numberOfItems)
  //console.log(JSON.stringify(query))

  return query
}

export const countProperties = (type: ListingType, searchQuery?: string, options?: PropertyQueryOptions) => {
  let query = serverClient.from('realtor_property').select('*', { count: 'exact', head: true })

  query = applyFilters(options, query, type, searchQuery)

  return query
}

function applyFilters<T>(
  options: PropertyQueryOptions | undefined,
  query: PostgrestFilterBuilder<Database['public'], Database['public']['Tables']['realtor_property']['Row'], 'realtor_property' | any>,
  type: string,
  searchQuery: string | undefined
) {
  if (options?.price) {
    if (options.price.from) query.filter('price', 'gte', options.price.from)
    if (options.price.to && options.price.to != Infinity) query.filter('price', 'lte', options.price.to)
  }

  if (options?.areas) {
    if (options.areas.length > 0) query.in('area', options?.areas)
  }

  if (options?.type) {
    query = query.eq('property_building_type', options.type)
  }

  if (options?.bedrooms) {
    query = query.filter('num_bedrooms', 'gte', options?.bedrooms)
  }

  if (options?.bathrooms) {
    query = query.filter('num_bathrooms', 'gte', options?.bathrooms)
  }

  if (options?.hideNotApproved) {
    query = query.eq('reviewed', true)
    query = query.eq('published', true)
  }

  if (type !== 'all') {
    query = query.eq('type', type)
  }

  if (options?.userId) {
    query = query.eq('owner_id', options.userId)
  }

  if (searchQuery) {
    query = query.textSearch('fts', searchQuery, { type: 'websearch', config: 'english' })
  }
  return query
}
