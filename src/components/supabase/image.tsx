import Image from 'next/image'
import { serverClient } from '../../supabase/config'

type Props = {
  path: string | null
  className: string
}

const SupabaseImage = (props: Props) => {
  if (!props.path) return <Image src='/caribbean-home-abstracted-to-minimal-shapes-suggesting-absence-of-image-includes-text-no-image-me.png' alt='No Property image found' width={512} height={512} />

  const { data } = serverClient.storage.from('property_images').getPublicUrl(props.path)
  return <Image className={props.className} src={data.publicUrl} width={1024} height={1024} alt={data.publicUrl.replace('public/', '')} />
  //return <Image loader={supabaseLoader} src={src} alt={src} width={500} height={500} />
}

export default SupabaseImage
