export class ImageConverter {
  static async convertToWebPFile(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (ctx) {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  // Use the Blob directly to create the File
                  const updatedFileName = file.name + '.webp'

                  const webpFile = new File([blob], updatedFileName, { type: blob.type })
                  resolve(webpFile)
                } else {
                  reject(new Error('Unable to create blob.'))
                }
              },
              'image/webp',
              1
            )
          } else {
            reject(new Error('Unable to get 2D context for canvas.'))
          }
        }
        img.src = event.target?.result as string
      }

      reader.onerror = (error) => {
        reject(error)
      }

      reader.readAsDataURL(file)
    })
  }
}
