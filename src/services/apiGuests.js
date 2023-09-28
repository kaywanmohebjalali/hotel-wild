import supabase from './supabase'

export async function getGuests() {

    const { data, error } = await supabase
        .from('guests')
        .select('*')

    if (error) {
        throw new Error('guests could not be loaded')
    }
    return data
}



export async function AddGuest(guest) {
    // REMEMBER RLS POLICIES
    
    const { data, error } = await supabase
    .from('guests')
    .insert(guest)
    .select()
  
    if (error) {
      console.error('error add guest : ',error);
      throw new Error("guest could not be created");
    }
   
    return data;
  }
  
  

  export async function updateGuest(id, updateItems) {

    
    try {
      const { data, error } = await supabase
    .from('guests')
    .update(updateItems)
    .eq('id',id)
    .select()
    .single()
  
    if(error) throw new Error(' Your update was not successful')
  
    return data
     } catch (error) {
      console.log('Error Update : ',error?.message);
      throw new Error(' Your update was not successful')
     }
  }
  



  
  export async function deleteGuest(id) {
    // REMEMBER RLS POLICIES
    
    const {  error } =await  supabase
    .from("guests")
    .delete()
    .eq('id',id)
  
    if (error) {
      console.error(error);
      throw new Error("Guest could not be deleted");
    }
   
    return id;
  }
