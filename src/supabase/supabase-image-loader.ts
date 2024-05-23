import { ImageLoaderProps } from 'next/image'

export default function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECTID}.supabase.co/storage/v1/render/image/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${src}?width=${width}&quality=${quality || 75}`
}
