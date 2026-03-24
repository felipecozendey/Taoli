import { supabase } from './client'
import { v4 as uuidv4 } from 'uuid'

export async function uploadStudyMedia(file: File | Blob): Promise<string | null> {
  try {
    const fileName = `${uuidv4()}-${(file as File).name || 'image.png'}`

    const { data, error } = await supabase.storage.from('study_media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('study_media').getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Unexpected error during upload:', error)
    return null
  }
}
