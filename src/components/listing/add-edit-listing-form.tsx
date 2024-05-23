'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { config, geocoding } from '@maptiler/client'
import { StorageError } from '@supabase/storage-js'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import clearCachesByTagServerAction from '../../cache/invalidate-cache'
import { PROPERTY_CACHE } from '../../cache/keys'
import { Listing, listingSchema } from '../../schemas/listing'
import { directSessionClient } from '../../supabase/client-config'
import { convertToDMS } from '../../utils/latlong'
import slugify from '../../utils/slugify'
import ImageUpload from '../form/image-upload'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'
import Link from 'next/link'
import { LinkedImages } from '../form/linked-images'
import { UploadApiResponse } from 'cloudinary'
import { uploadToCloudinary } from '../form/cloudinary-upload'
import { propertyWithImages } from '../../types/queries'

config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

type PropertyKey =
  | 'status'
  | 'type'
  | 'property_building_type'
  | 'name'
  | 'address'
  | 'area'
  | 'property_url'
  | 'num_bedrooms'
  | 'num_bathrooms'
  | 'price'
  | 'lot_square_meter'
  | 'property_square_meter'
  | 'has_pool'
  | 'has_parking'
  | 'has_garden'
  | 'has_balcony'
  | 'description'
  | 'youtube_url'
  | 'realtor_id'
  | 'realtor_url'
  | 'latitude'
  | 'longitude'
  | 'reviewed'
  | 'published'
  | 'seo_title'
  | 'seo_description'
  | 'seo_keywords'

type Props = {
  editId?: string
  scrapeMode?: boolean
}

type StorageResponse = {
  data: {
    path: string
  } | null
  error: StorageError | null
}[]

type Realtor = {
  name: string
  id: number
}

export type EditImage = {
  id: number
  delete: boolean
  url: string
  width: number
  height: number
}

type PropertyForForm = Omit<propertyWithImages, 'type'> & { type: boolean }

const AddEditListingForm = (props: Props) => {
  const isAddMode = !props.editId
  const isScrapeMode = props.scrapeMode
  const router = useRouter()
  const { getToken, userId } = useAuth()
  const { user } = useUser()
  const [files, setFile] = useState<File[]>([])
  const [images, setImages] = useState<EditImage[]>([])
  const [geoCodedName, setGeoCodedName] = useState<String | null>(null)
  const [realtors, setRealtors] = useState<Realtor[]>([])
  const [useQuill, setUseQuill] = useState(true)
  const [loading, setLoading] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<Listing>({
    defaultValues: { realtor_id: -1 },
    resolver: zodResolver(listingSchema),
  })

  useEffect(() => {
    async function fetchData() {
      if (!isAddMode || isScrapeMode) {
        setLoading(true)
        const token = await getToken({ template: 'supabase' })
        const client = await directSessionClient(token!)
        // get user and set form fields

        if (!isAddMode && !isScrapeMode) {
          const { data, error } = await client.from('realtor_property').select(`*, property_images (*), realtors (*)`).eq('id', +props.editId!).limit(1).single()

          if (error) throw error

          const listing: PropertyForForm = {
            ...data, // Copy all properties from data
            type: data.type === 'rent', // Change the type property
          }

          const propertyKeys: PropertyKey[] = [
            'status',
            'type',
            'property_building_type',
            'name',
            'address',
            'area',
            'property_url',
            'num_bedrooms',
            'num_bathrooms',
            'price',
            'lot_square_meter',
            'property_square_meter',
            'has_pool',
            'has_parking',
            'has_garden',
            'has_balcony',
            'description',
            'youtube_url',
            'realtor_id',
            'realtor_url',
            'latitude',
            'longitude',
            'reviewed',
            'published',
            'seo_title',
            'seo_description',
            'seo_keywords',
          ]

          propertyKeys.forEach((field: PropertyKey) => {
            if (listing[field]) setValue(field, listing[field]!)
          })

          const imageArray: EditImage[] = []
          for (let index = 0; index < listing.property_images.length; index++) {
            const img = listing.property_images[index]
            imageArray.push({ id: img.id, delete: false, url: img.link!, width: img.width!, height: img.height! })
          }
          setImages(imageArray)
        }
        if (!isAddMode && isScrapeMode) {
          const { data, error } = await client.from('scraped_realtor_property').select(`*`).eq('id', +props.editId!).limit(1).single()

          if (error) throw error
          const listing = data as any
          listing.type = data.type == 'rent' ? true : false
          const imageArray: EditImage[] = []
          if (data.imageIds) {
            for (let index = 0; index < data.imageIds.length; index++) {
              const imgId = data.imageIds[index]
              const img = await client.from('property_images').select(`*`).eq('id', imgId).single()
              if (img.error) throw img.error
              imageArray.push({ id: imgId, delete: false, url: img.data.link!, width: img.data.width!, height: img.data.height! })
            }
            setImages(imageArray)
          }

          const propertyKeys: PropertyKey[] = [
            'status',
            'type',
            'property_building_type',
            'name',
            'address',
            'area',
            'property_url',
            'num_bedrooms',
            'num_bathrooms',
            'price',
            'lot_square_meter',
            'property_square_meter',
            'has_pool',
            'has_parking',
            'has_garden',
            'has_balcony',
            'description',
            'youtube_url',
            'realtor_id',
            'realtor_url',
            'latitude',
            'longitude',
            'reviewed',
            'published',
            'seo_title',
            'seo_description',
            'seo_keywords',
          ]

          propertyKeys.forEach((field: PropertyKey) => {
            if (listing[field]) setValue(field, listing[field]!)
          })
        }
        setLoading(false)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function transformUploadedFiles(uploadedFiles: StorageResponse, property_id: number) {
    const imageLinks = []

    for (const file of uploadedFiles) {
      // Check if an error exists
      if (file.error) {
        throw file.error // Throw the error if it exists
      }

      // Transform the object
      if (file.data) {
        imageLinks.push({
          property_id: property_id,
          link: file.data.path,
        })
      }
    }

    return imageLinks
  }

  function transformCloudinaryFiles(uploadedFiles: UploadApiResponse[], property_id: number) {
    const imageLinks = []

    for (const file of uploadedFiles) {
      imageLinks.push({
        property_id: property_id,
        link: file.url,
        width: file.width,
        height: file.height,
      })
    }

    return imageLinks
  }

  const toggleEditor = () => {
    setUseQuill((prev) => !prev)
  }

  async function geoCode() {
    const address = getValues('address')
    if (address) {
      const results = await geocoding.forward(address, { limit: 1 })
      if (results.features) {
        const firstResult = results.features[0]
        if (firstResult.geometry.type === 'Point') {
          setValue('longitude', firstResult.geometry.coordinates[0])
          setValue('latitude', firstResult.geometry.coordinates[1])
          setGeoCodedName(firstResult.place_name)
        }
      }
    }
  }

  async function onSubmit(listing: Listing) {
    const token = await getToken({ template: 'supabase' })
    const client = await directSessionClient(token!)

    if (isAddMode) addListing(listing, client)
    else if (isScrapeMode) moveToListing(listing, client)
    else editListing(listing, client)
  }

  async function moveToListing(listing: Listing, client: SupabaseClient<Database>) {
    prepareListing(listing)
    const { data, error } = await client
      .from('realtor_property')
      .insert({ ...listing, type: listing.type ? 'rent' : 'sale', owner_id: userId! })
      .select()
      .single()

    const listingId = data?.id
    images.forEach(async (image) => {
      if (!image.delete) {
        const result = await client.from('property_images').update({ property_id: listingId }).eq('id', image.id).select().single()
      } else {
        await client.from('property_images').delete().eq('id', image.id)
        //REMOVE FROM CLOUD
      }
    })

    const { data: d, error: e } = await client.from('scraped_realtor_property').update({ scrape_status: 'ADDED' }).eq('id', +props.editId!).select().single()

    handleResultAndNavigation(data, error)
  }

  async function editListing(listing: Listing, client: SupabaseClient) {
    prepareListing(listing)
    const { data, error } = await client
      .from('realtor_property')
      .update({ ...listing, type: listing.type ? 'rent' : 'sale', owner_id: userId! })
      .eq('id', +props.editId!)
      .select()
      .single()

    images.forEach(async (image) => {
      console.log('Trying to delete images')
      if (image.delete) {
        console.log('Deleting image with id: ' + image.id)
        await client.from('property_images').delete().eq('id', image.id)
        //REMOVE FROM CLOUD
      }
    })

    handleResultAndNavigation(data, error)
  }

  async function readFileAsDataURL(file: File): Promise<string> {
    let result_base64 = await new Promise<string>((resolve) => {
      let fileReader = new FileReader()
      fileReader.onload = (e) => resolve(fileReader.result as string)
      fileReader.readAsDataURL(file)
    })

    return result_base64
  }

  async function addListing(listing: Listing, client: SupabaseClient) {
    const uploads = files.map(async (file) => {
      /*
      return client.storage.from('property_images').upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      })*/
      const b64 = await readFileAsDataURL(file)
      //let dataURI = 'data:' + file.type + ';base64,' + b64
      return uploadToCloudinary(b64)
    })

    try {
      const uploadedFiles = await Promise.all(uploads)
      prepareListing(listing)

      const { data, error } = await client
        .from('realtor_property')
        .insert({ ...listing, type: listing.type ? 'rent' : 'sale', owner_id: userId! })
        .select()
        .single()

      if (data && !error) {
        //const imageLinks = transformUploadedFiles(uploadedFiles, data.id)
        const imageLinks = transformCloudinaryFiles(uploadedFiles, data.id)
        await client.from('property_images').insert(imageLinks).select()
      }

      handleResultAndNavigation(data, error)
    } catch (error) {
      console.error('Error uploading files', error)
    }
  }

  function prepareListing(listing: Listing) {
    if (listing.realtor_id === 0 || listing.realtor_id === -1) {
      delete listing.realtor_id
    }

    if (listing.num_bathrooms === 0) {
      delete listing.num_bathrooms
    }
    if (listing.num_bedrooms === 0) {
      delete listing.num_bedrooms
    }

    if (user && user.publicMetadata.role !== 'ADMIN') {
      console.log('Not an admin, needs to be reviewed')
      listing.reviewed = false
      listing.published = false
    }
  }

  function handleResultAndNavigation(data: any, error: any) {
    if (error) {
      throw error
    }

    clearCachesByTagServerAction(PROPERTY_CACHE)
    if (isScrapeMode) router.push(`/admin/scraped`)
    else router.push(`/listings/${data?.id}/${slugify(data?.name)}`)
  }

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
    clipboard: {
      dangerouslyPasteHTML: true,
    },
  }

  const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'align', 'color', 'code-block']

  // Define custom styles
  const quillStyles = {
    '.ql-editor': {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#333',
    }, // Add more custom styles as needed
  }

  const handleEditorChange = (newContent: string) => {
    setValue('description', newContent)
  }

  const copyPromptToClipboard = async () => {
    let text = `Please rewrite the following realtor listing description in the first-person form, referring to the property as 'the property' instead of 'our property.' Additionally, exclude any mentions or pointers to contacting the realtor or references to external content like videos. Make sure the text is written in an attractive way in regards to SEO. The text should be in rich HTML so you can use h1/h2/etc,p,li,pre,blockquote so try to use where appropriate, it should not contain any html/body tags as this will be added to a existing page. The only thing you should not use is sections. Put the result in a code block.`
    text += text + ' The Text: ' + getValues('description')
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.log(error)
    }
  }

  const description = watch('description')
  const watchRealtorId = watch('realtor_id')

  useEffect(() => {
    async function fetchData() {
      const token = await getToken({ template: 'supabase' })
      const client = await directSessionClient(token!)
      const { data, error } = await client.from('realtors').select('*')
      if (error) throw error
      setRealtors(data)
    }
    fetchData()
  }, [getToken])

  useEffect(() => {
    register('description', { required: true })
  }, [register])

  return (
    <>
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center'>
          <span className='loading loading-infinity w-32 text-primary inline text-center'></span>
          <h2 className='text-center text-white text-xl font-semibold'>Loading...</h2>
          <p className='w-1/3 text-center text-white'>This may take a few seconds, please don&lsquo;t close this page.</p>
        </div>
      )}

      <div className='flex justify-center items-center w-full px-5 py-5'>
        <div className='xl:max-w-7xl bg-base-100 drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5'>
          <div className='mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0'>
            <h1 className='text-center text-2xl sm:text-3xl font-semibold'>{isAddMode ? 'Create' : isScrapeMode ? 'Copy Scraped Content To' : 'Edit'} Listing</h1>
            {isScrapeMode && getValues('property_url') && (
              <Link className='link link-hover line-clamp-1' href={getValues('property_url')!} rel='noopener noreferrer' target='_blank'>
                {getValues('property_url')!}
              </Link>
            )}
            {errors && (
              <div className='errors'>
                {Object.keys(errors).map(
                  (fieldName, index) =>
                    errors[fieldName as keyof Listing] && (
                      <p key={index}>
                        {fieldName}: {errors[fieldName as keyof Listing]?.message}
                      </p>
                    )
                )}
              </div>
            )}

            <form className='mt-12' action='' method='POST' onSubmit={handleSubmit(onSubmit)}>
              <div className='w-full mt-5 sm:mt-8'>
                <label className='flex items-center justify-center cursor-pointer gap-2'>
                  <span className='label-text text-xl font-semibold'>Sell</span>
                  <input {...register('type', { required: true })} type='checkbox' className='toggle toggle-lg' />
                  <span className='label-text text-xl  font-semibold'>Rent</span>
                </label>
                {errors.type && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>{errors.type.message}</span>
                  </label>
                )}
              </div>
              <div className='w-full mt-5 sm:mt-8'>
                <div className='mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>
                        Property type <abbr title='required'>*</abbr>
                      </span>
                    </label>
                    <select
                      {...register('property_building_type', { required: true })}
                      className={`select select-bordered bg-grey-lighter w-full text-base-content placeholder:text-base-content/50' ${errors.name ? 'input-error' : ''}`}
                    >
                      <option value={'house'}>House</option>
                      <option value={'appartment'}>Appartment</option>
                      <option value={'land'}>Land</option>
                      <option value={'other'}>Other</option>
                    </select>
                    {errors.property_building_type && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.property_building_type.message}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>
                        Property name <abbr title='required'>*</abbr>
                      </span>
                    </label>
                    <input
                      {...register('name', { required: true })}
                      type='text'
                      placeholder='Sunshine boulevard 12'
                      className={`input bg-grey-lighter input-bordered w-full text-base-content placeholder:text-base-content/50' ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.name.message}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>
                        Address <abbr title='required'>*</abbr>
                      </span>
                    </label>
                    <div className='flex items-center w-full mb-4 relative'>
                      <input
                        {...register('address', { required: true })}
                        type='text'
                        placeholder='Enter Your Property Name'
                        className='input bg-grey-lighter input-bordered w-full text-base-content placeholder:text-base-content/50'
                      />
                      <button type='button' className='ml-4 mr-2 btn btn-square' onClick={geoCode}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' />
                        </svg>
                      </button>
                    </div>
                    {geoCodedName && (
                      <label>
                        <span className='label-text-alt'>Found geolocation: {geoCodedName}</span>
                      </label>
                    )}
                    {getValues('latitude') && (
                      <label>
                        <span className='label-text-alt '>Geocoordinates: {convertToDMS(getValues('latitude')!, getValues('longitude')!)}</span>
                      </label>
                    )}
                    {errors.address && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.address.message}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Area</span>
                    </label>
                    <input
                      {...register('area', { required: true })}
                      type='text'
                      placeholder='Area Name'
                      className='input bg-grey-lighter input-bordered w-full text-base-content placeholder:text-base-content/50'
                    />
                    {errors.area && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.area.message}</span>
                      </label>
                    )}
                  </div>
                  <div className='mb-3 space-y-2 w-full text-xs'>
                    <label className='label-text font-semibold'>Property URL</label>
                    <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                      <div className='flex'>
                        <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-primary px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-12 bg-primary justify-center rounded-lg text-white'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <input
                        {...register('property_url')}
                        type='text'
                        className='input flex-shrink flex-grow flex-auto input-bordered leading-normal w-px border border-l-0 h-12 rounded-lg rounded-l-none px-3 relative '
                        placeholder='https://'
                      />
                    </div>
                    {errors.property_url && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.property_url.message}</span>
                      </label>
                    )}
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='w-full form-control'>
                      <label className='label-text font-semibold'>Bedrooms</label>
                      <input {...register('num_bedrooms', { required: true, valueAsNumber: true })} type='range' min={0} max='5' className='range range-primary' step='0.5' />
                      <div className='w-full flex justify-between text-xs px-2 pt-2'>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5+</span>
                      </div>
                      {errors.num_bedrooms && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.num_bedrooms.message}</span>
                        </label>
                      )}
                    </div>
                    <div className='w-full form-control'>
                      <label className='label-text font-semibold'>Bathrooms</label>
                      <input {...register('num_bathrooms', { required: true, valueAsNumber: true })} type='range' min={0} max='5' className='range range-primary' step='0.5' />
                      <div className='w-full flex justify-between text-xs px-2 pt-2'>
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5+</span>
                      </div>
                      {errors.num_bathrooms && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.num_bathrooms.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='mb-3 space-y-2 text-xs w-full'>
                      <label className='label-text font-semibold'>
                        Price <abbr title='required'>*</abbr>
                      </label>
                      <div className='flex flex-wrap items-stretch mb-4 relative'>
                        <input
                          {...register('price', { required: true, valueAsNumber: true })}
                          type='number'
                          className='input input-bordered leading-normal w-28 border border-r-0 h-12 rounded-lg rounded-r-none px-3 relative '
                          placeholder='500.000'
                        />
                        <div className='flex'>
                          <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-l-none border border-l-0 border-primary px-3 whitespace-no-wrap text-grey-dark w-12 h-12 bg-primary justify-center text-xl rounded-lg text-white'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                          </span>
                        </div>
                      </div>
                      {errors.price && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.price.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='mb-3 space-y-2 text-xs  w-full'>
                      <label className='label-text font-semibold'>Lot size</label>
                      <div className='flex flex-wrap items-stretch mb-4 relative'>
                        <input
                          {...register('lot_square_meter', { required: true, valueAsNumber: true })}
                          type='number'
                          className='input input-bordered leading-normal w-28 border border-r-0 h-12 rounded-lg rounded-r-none px-3 relative '
                          placeholder='200'
                        />
                        <div className='flex'>
                          <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-l-none border border-l-0 border-primary px-3 whitespace-no-wrap text-grey-dark w-12 h-12 bg-primary justify-center text-xl rounded-lg text-white'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <text x='50%' y='50%' fontSize='20' textAnchor='middle' dy='0.35em' fill='currentColor'>
                                M
                                <tspan baselineShift='super' fontSize='10'>
                                  2
                                </tspan>
                              </text>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {errors.lot_square_meter && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.lot_square_meter.message}</span>
                        </label>
                      )}
                    </div>
                    <div className='mb-3 space-y-2 text-xs w-full'>
                      <label className='label-text font-semibold'>Property size</label>
                      <div className='flex flex-wrap items-stretch mb-4 relative'>
                        <input
                          {...register('property_square_meter', { required: true, valueAsNumber: true })}
                          type='number'
                          className='input input-bordered leading-normal w-28 border border-r-0 h-12 rounded-lg rounded-r-none px-3 relative '
                          placeholder='200'
                        />
                        <div className='flex'>
                          <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-l-none border border-l-0 border-primary px-3 whitespace-no-wrap text-grey-dark w-12 h-12 bg-primary justify-center text-xl rounded-lg text-white'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <text x='50%' y='50%' fontSize='20' textAnchor='middle' dy='0.35em' fill='currentColor'>
                                M
                                <tspan baselineShift='super' fontSize='10'>
                                  2
                                </tspan>
                              </text>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {errors.property_square_meter && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.property_square_meter.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className='form-control'>
                      <label className='label cursor-pointer w-20'>
                        <input {...register('has_pool', { required: true })} type='checkbox' className='checkbox' />
                        <span className='label-text pr-2'>Pool</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer w-24'>
                        <input {...register('has_parking', { required: true })} type='checkbox' className='checkbox' />
                        <span className='label-text pr-2'>Parking</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer w-24'>
                        <input {...register('has_garden', { required: true })} type='checkbox' className='checkbox' />
                        <span className='label-text pr-2'>Garden</span>
                      </label>
                    </div>
                    <div className='form-control'>
                      <label className='label cursor-pointer w-24'>
                        <input {...register('has_balcony', { required: true })} type='checkbox' className='checkbox' />
                        <span className='label-text pr-2'>Balcony</span>
                      </label>
                    </div>
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>
                        Description <abbr title='required'>*</abbr>
                      </span>
                      <span className='label-text-alt'>
                        <input onClick={toggleEditor} value={useQuill.toString()} type='checkbox' className='toggle toggle-xs' />
                      </span>
                    </label>

                    <div className={`${useQuill ? 'visible' : 'hidden'}`}>
                      <QuillEditor value={description} onChange={handleEditorChange} modules={quillModules} formats={quillFormats} className='w-full h-[70%] bg-base prose max-w-none' />
                    </div>
                    <div className={`${!useQuill ? 'visible' : 'hidden'}`}>
                      <textarea className='textarea textarea-bordered textarea-md w-full min-h-96' {...register('description', { required: true })} />
                    </div>
                    {errors.description && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.description.message}</span>
                      </label>
                    )}
                    {isScrapeMode && (
                      <label className='label'>
                        <button type='button' className='btn' onClick={copyPromptToClipboard}>
                          Get Prompt
                        </button>
                      </label>
                    )}
                  </div>
                  <div className='mb-3 space-y-2 w-full text-xs'>
                    <label className='label-text font-semibold'>YouTube URL</label>
                    <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                      <div className='flex'>
                        <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-primary px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-12 bg-primary justify-center rounded-lg text-white'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' className='bi bi-youtube' viewBox='0 0 16 16'>
                            <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z' />
                          </svg>
                        </span>
                      </div>
                      <input
                        {...register('youtube_url', { required: true })}
                        type='text'
                        className='input flex-shrink flex-grow flex-auto input-bordered leading-normal w-px border border-l-0 h-12 rounded-lg rounded-l-none px-3 relative '
                        placeholder='https://'
                      />
                    </div>
                    {errors.youtube_url && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.youtube_url.message}</span>
                      </label>
                    )}
                  </div>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Listed on:</span>
                    </label>
                    <select
                      {...register('realtor_id', { setValueAs: (value) => Number(value) })}
                      className={`select select-bordered bg-grey-lighter w-full text-base-content placeholder:text-base-content/50' ${errors.name ? 'input-error' : ''}`}
                    >
                      <option disabled value={-1}>
                        Pick an option or choose other to add an url
                      </option>
                      {realtors.map((realtor) => (
                        <option key={realtor.id} value={realtor.id}>
                          {realtor.name}
                        </option>
                      ))}
                      <option value={0}>Other</option>
                    </select>
                    {errors.realtor_id && (
                      <label className='label'>
                        <span className='label-text-alt text-error'>{errors.realtor_id.message}</span>
                      </label>
                    )}
                  </div>

                  <div className={`${watchRealtorId == 0 ? 'opacity-100' : 'opacity-0'} mb-3 space-y-2 w-full text-xs`}>
                    <label className='label-text font-semibold'>
                      Company URL <abbr title='required'>*</abbr>
                    </label>
                    <div className='flex flex-wrap items-stretch w-full mb-4 relative'>
                      <div className='flex'>
                        <span className='flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-primary px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-12 bg-primary justify-center rounded-lg text-white'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            ></path>
                          </svg>
                        </span>
                      </div>
                      <input
                        {...register('realtor_url', { required: false })}
                        type='text'
                        className='input flex-shrink flex-grow flex-auto input-bordered leading-normal w-px border border-l-0 h-12 rounded-lg rounded-l-none px-3 relative '
                        placeholder='https://'
                      />
                      {errors.realtor_url && (
                        <label className='label'>
                          <span className='label-text-alt text-error'>{errors.realtor_url.message}</span>
                        </label>
                      )}
                    </div>
                  </div>
                  {user && user.publicMetadata.role == 'ADMIN' && (
                    <>
                      <div className='form-control w-full'>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            SEO Title <abbr title='required'>*</abbr>
                          </span>
                        </label>
                        <input
                          {...register('seo_title', { required: true })}
                          type='text'
                          placeholder='A beautiful house in the sun'
                          className={`input bg-grey-lighter input-bordered w-full text-base-content placeholder:text-base-content/50' ${errors.seo_title ? 'input-error' : ''}`}
                        />
                        {errors.seo_title && (
                          <label className='label'>
                            <span className='label-text-alt text-error'>{errors.seo_title.message}</span>
                          </label>
                        )}
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            SEO Description <abbr title='required'>*</abbr>
                          </span>
                        </label>
                        <textarea
                          {...register('seo_description', { required: true })}
                          placeholder='A beautiful house in the sun'
                          className={`resize-y textarea textarea-bordered textarea-md bg-grey-lighter w-full text-base-content placeholder:text-base-content/50 h-16 min-h-0 overflow-auto' ${
                            errors.seo_description ? 'textarea-error' : ''
                          }`}
                        />
                        {errors.seo_description && (
                          <label className='label'>
                            <span className='label-text-alt text-error'>{errors.seo_description.message}</span>
                          </label>
                        )}
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          <span className='label-text font-semibold'>
                            SEO Keywords <abbr title='required'>*</abbr>
                          </span>
                        </label>
                        <textarea
                          {...register('seo_keywords', { required: true })}
                          placeholder='A beautiful house in the sun'
                          className={`resize-y textarea textarea-bordered textarea-md bg-grey-lighter w-full text-base-content placeholder:text-base-content/50' ${
                            errors.seo_keywords ? 'textarea-error' : ''
                          }`}
                        />
                        {errors.seo_keywords && (
                          <label className='label'>
                            <span className='label-text-alt text-error'>{errors.seo_keywords.message}</span>
                          </label>
                        )}
                      </div>
                    </>
                  )}

                  {isAddMode && <ImageUpload files={files} setFile={setFile} />}
                  {(isScrapeMode || !isAddMode) && <LinkedImages images={images} setImages={setImages} />}
                  <div className='flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center'>
                    <button className='btn btn-active btn-primary hover:btn-success btn-block max-w-[200px]'>
                      {isSubmitting ? (
                        <>
                          <span className='loading loading-spinner'></span> {isAddMode ? 'Create' : isScrapeMode ? 'Copy To' : 'Edit'} Listing
                        </>
                      ) : isAddMode ? (
                        'Create Listing'
                      ) : isScrapeMode ? (
                        'Copy To Listing'
                      ) : (
                        'Edit Listing'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEditListingForm
