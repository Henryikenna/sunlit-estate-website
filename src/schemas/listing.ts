import z from 'zod'

const youtubeRegEx = new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)
//const urlRegExt = new RegExp('^([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?')
export const listingSchema = z.object({
  status: z.optional(z.string().min(1)),
  type: z.boolean(),
  property_building_type: z.enum(['house', 'appartment', 'land', 'other']),
  name: z.string().min(1),
  address: z.string().min(1),
  area: z.string().min(1),
  property_url: z.union([z.string().url().optional(), z.literal('')]),
  num_bedrooms: z.optional(z.number().min(0).max(5)),
  num_bathrooms: z.optional(z.number().min(0).max(5)),
  price: z.number().min(0).max(100000000),
  lot_square_meter: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  property_square_meter: z.union([z.number().int().positive().min(1), z.nan()]).optional(),
  has_pool: z.boolean(),
  has_parking: z.boolean(),
  has_garden: z.boolean(),
  has_balcony: z.boolean(),
  description: z.string().max(50000),
  youtube_url: z.union([z.string().regex(youtubeRegEx).optional(), z.literal('')]),
  realtor_id: z.optional(z.number()),
  realtor_url: z.optional(z.union([z.string().url().optional(), z.literal('')])),
  latitude: z.optional(z.number()),
  longitude: z.optional(z.number()),
  reviewed: z.optional(z.boolean()),
  published: z.optional(z.boolean()),
  seo_title: z.optional(z.string()),
  seo_description: z.optional(z.string()),
  seo_keywords: z.optional(z.string()),
})

export type Listing = z.infer<typeof listingSchema>
