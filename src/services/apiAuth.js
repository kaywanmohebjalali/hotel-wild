import supabase, { supabaseUrl } from '../services/supabase'


export async function signup({ email, password, fullName }) {

  const { data, error } = await supabase
    .auth
    .signUp({
      email, password, options: {
        data: {

          fullName,
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/default-user.png`

        }
      }
    })

  if (error) throw new Error(error?.message)

  return data

}


export async function login({ email, password }) {

  let { data, error } = await supabase
    .auth
    .signInWithPassword({
      email,
      password
    })

  if (error) throw new Error(error?.message)

  return data

}

export async function getCurrentUser() {

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data, error } = await supabase.auth.getUser()


  if (error) throw new Error(error?.message)

  return data?.user


}



export async function logout() {

  let { error } = await supabase.auth.signOut()

  if (error) throw new Error(error?.message)



}


export async function updateUser({ password, fullName, avatar,previousAvatar }) {
 
  let updateData;
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }
  const { data: dataUpdateUser, error: updateUserError } = await supabase.
  auth.updateUser(updateData)
  if (updateUserError) throw new Error(updateUserError?.message)
  if (!avatar) return dataUpdateUser


  let fileName = `avatar-${dataUpdateUser?.user?.id}-${Math.random()}-${avatar?.name}`
  const { error: storageUploadError } = await supabase.storage.from('avatars')
    .upload(fileName, avatar)
  if (storageUploadError) throw new Error(storageUploadError?.message)


  // delete previous avatar
    let imageName=previousAvatar?previousAvatar.split('/').at(-1):''
 
    if(imageName &&imageName!='default-user.png'){

      const {error:errorRemoveStorage } =await supabase
      .storage
      .from('avatars')
      .remove(imageName)
      
      if(errorRemoveStorage)throw new Error('error delete avatar previous image in database')
    }
  

  const { data: dataUpdateAvatar, error } = await supabase.auth
    .updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
      }
    })
  if (error) throw new Error(error?.message)

  return dataUpdateAvatar

}

