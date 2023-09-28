import supabase from './supabase'
import { supabaseUrl } from '../services/supabase'

export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        throw new Error('cabin could not be loaded')
    }
    return data
}



export async function deleteCabin(id) {

    try {
        const { data, error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error('cabin could not be delete')
        }
        return data
    } catch (error) {
        console.log('delete cabin : ', error.message);
        throw new Error('cabin could not be delete')
    }

}








export async function createOrEditCabin(newCabin, id) {

    const hasImagePath = typeof newCabin?.image == 'string'
    

    const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from('cabins')
    // CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

    // Edit
    if (id) query = query.update([{ ...newCabin, image: imagePath }])
        .eq('id', id)




    const { data, error } = await query.select()
    if (error) {
        throw new Error(error.message)
    }


    //    upload image
    if (!hasImagePath) {
        const { error: storageError } = await supabase
            .storage
            .from('cabin-images')
            .upload(imageName, newCabin.image[0])

        if (storageError && !id) {
            await supabase
                .from('cabins')
                .delete()
                .eq('id', data.id)
         
            throw new Error('cabin image could not be uploaded and the cabin was not created')
        }
    }

    return data
}

