const MAX_SIZE = 720
const QUALITY = 0.78

export function readAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Veuillez choisir une image.'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Impossible de lire le fichier.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error("Cette image n'a pas pu être chargée."))
      image.onload = () => {
        const scale = Math.min(1, MAX_SIZE / Math.max(image.width, image.height))
        const width = Math.round(image.width * scale)
        const height = Math.round(image.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        context.fillStyle = '#f7f3ee'
        context.fillRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', QUALITY))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
