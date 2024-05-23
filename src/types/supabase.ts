export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      property_images: {
        Row: {
          created_at: string
          external_id: string | null
          height: number | null
          id: number
          link: string | null
          property_id: number | null
          width: number | null
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          height?: number | null
          id?: number
          link?: string | null
          property_id?: number | null
          width?: number | null
        }
        Update: {
          created_at?: string
          external_id?: string | null
          height?: number | null
          id?: number
          link?: string | null
          property_id?: number | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'property_images_property_id_fkey',
            columns: ['property_id'],
            isOneToOne: false,
            referencedRelation: 'realtor_property',
            referencedColumns: ['id']
          },
        ]
      }      
      realtor_property: {
        Row: {
          address: string | null
          area: string | null
          created_at: string
          description: string | null
          fts: unknown | null
          has_balcony: boolean | null
          has_garden: boolean | null
          has_parking: boolean | null
          has_pool: boolean | null
          id: number
          latitude: number | null
          longitude: number | null
          lot_square_meter: number | null
          name: string | null
          num_bathrooms: number | null
          num_bedrooms: number | null
          owner_id: string
          price: number | null
          property_building_type: Database['public']['Enums']['property_building_type'] | null
          property_square_meter: number | null
          property_url: string | null
          published: boolean | null
          realtor_id: number | null
          realtor_url: string | null
          reviewed: boolean | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          status: string | null
          type: Database['public']['Enums']['property_type'] | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          created_at?: string
          description?: string | null
          fts?: unknown | null
          has_balcony?: boolean | null
          has_garden?: boolean | null
          has_parking?: boolean | null
          has_pool?: boolean | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          lot_square_meter?: number | null
          name?: string | null
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          owner_id?: string
          price?: number | null
          property_building_type?: Database['public']['Enums']['property_building_type'] | null
          property_square_meter?: number | null
          property_url?: string | null
          published?: boolean | null
          realtor_id?: number | null
          realtor_url?: string | null
          reviewed?: boolean | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          status?: string | null
          type?: Database['public']['Enums']['property_type'] | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          created_at?: string
          description?: string | null
          fts?: unknown | null
          has_balcony?: boolean | null
          has_garden?: boolean | null
          has_parking?: boolean | null
          has_pool?: boolean | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          lot_square_meter?: number | null
          name?: string | null
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          owner_id?: string
          price?: number | null
          property_building_type?: Database['public']['Enums']['property_building_type'] | null
          property_square_meter?: number | null
          property_url?: string | null
          published?: boolean | null
          realtor_id?: number | null
          realtor_url?: string | null
          reviewed?: boolean | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          status?: string | null
          type?: Database['public']['Enums']['property_type'] | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'realtor_property_realtor_id_fkey'
            columns: ['realtor_id']
            isOneToOne: false
            referencedRelation: 'realtors'
            referencedColumns: ['id']
          },
        ]
      }
      realtors: {
        Row: {
          created_at: string
          icon: string | null
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      scraped_listing_urls: {
        Row: {
          id: number
          last_scraped: string | null
          provider: string | null
          status: string | null
          title: string | null
          url: string
        }
        Insert: {
          id?: never
          last_scraped?: string | null
          provider?: string | null
          status?: string | null
          title?: string | null
          url: string
        }
        Update: {
          id?: never
          last_scraped?: string | null
          provider?: string | null
          status?: string | null
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      scraped_realtor_property: {
        Row: {
          address: string | null
          area: string | null
          created_at: string | null
          description: string | null
          description_ai: string | null
          has_balcony: boolean | null
          has_garden: boolean | null
          has_parking: boolean | null
          has_pool: boolean | null
          id: number
          imageIds: number[] | null
          latitude: number | null
          longitude: number | null
          lot_square_meter: number | null
          name: string | null
          num_bathrooms: number | null
          num_bedrooms: number | null
          owner_id: string | null
          price: number | null
          property_building_type: Database['public']['Enums']['property_building_type'] | null
          property_square_meter: number | null
          property_url: string | null
          realtor_id: number | null
          realtor_url: string | null
          reviewed: boolean | null
          scrape_status: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          status: string | null
          type: Database['public']['Enums']['property_type'] | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          created_at?: string | null
          description?: string | null
          description_ai?: string | null
          has_balcony?: boolean | null
          has_garden?: boolean | null
          has_parking?: boolean | null
          has_pool?: boolean | null
          id?: number
          imageIds?: number[] | null
          latitude?: number | null
          longitude?: number | null
          lot_square_meter?: number | null
          name?: string | null
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          owner_id?: string | null
          price?: number | null
          property_building_type?: Database['public']['Enums']['property_building_type'] | null
          property_square_meter?: number | null
          property_url?: string | null
          realtor_id?: number | null
          realtor_url?: string | null
          reviewed?: boolean | null
          scrape_status?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          status?: string | null
          type?: Database['public']['Enums']['property_type'] | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          created_at?: string | null
          description?: string | null
          description_ai?: string | null
          has_balcony?: boolean | null
          has_garden?: boolean | null
          has_parking?: boolean | null
          has_pool?: boolean | null
          id?: number
          imageIds?: number[] | null
          latitude?: number | null
          longitude?: number | null
          lot_square_meter?: number | null
          name?: string | null
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          owner_id?: string | null
          price?: number | null
          property_building_type?: Database['public']['Enums']['property_building_type'] | null
          property_square_meter?: number | null
          property_url?: string | null
          realtor_id?: number | null
          realtor_url?: string | null
          reviewed?: boolean | null
          scrape_status?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          status?: string | null
          type?: Database['public']['Enums']['property_type'] | null
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      distinct_areas: {
        Row: {
          area: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      requesting_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      property_building_type: 'house' | 'appartment' | 'land' | 'other'
      property_type: 'rent' | 'sale'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] & Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions['schema']]['Tables'] : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions['schema']]['Tables'] : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums'] : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
