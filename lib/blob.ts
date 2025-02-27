// app/lib/blob.ts
import { put } from '@vercel/blob'

export const uploadFile = async (file: File) => {
  const { url } = await put(file.name, file, { access: 'public' })
  return url
}