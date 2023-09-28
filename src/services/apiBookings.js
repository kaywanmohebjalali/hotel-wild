import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";


export async function getBookings(props) {
  try {
  
    const { filter, sortBy, filterPage } = props

    let query = supabase
      .from('bookings')
      .select('id, created_at, startDate, endDate, numNights, numGuests, status, extrasPrice, totalPrice, isPaid,hasBreakfast, cabins(id,name), guests(id,fullName, email)'
      ,{count:'exact'}  
      )

    if (filter) {
      query = query[filter.method || 'eq'](filter.field, filter.value)
    }

    if (sortBy) {
      query = query.order(sortBy.field, { ascending: sortBy.direction == 'asc' })
    }
    if (filterPage) {
      const from = (filterPage - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1
      query = query.range(from, to)
    }

    let { data, error,count} = await query
    if (error) {
      throw new Error('Booking could not be loaded')
    }
    
    return {data,count}
  } catch (error) {
    console.log('error for request get Booking : ', error.message);
    throw new Error('Booking could not be loaded')
  }
}

export async function getBooking(id) {
  try {
    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*,cabins(*), guests(*)")
      .eq("id", id)
      .single();
    if (error) {
      throw new Error('Booking not found')
    }
    
   

    return booking
  } catch (error) {
    console.log('error for request grt Booking : ', error.message);
    throw new Error('Booking not found')
  }
}

export async function updateBooking(id, updateItems) {

  
  try {
    const { data, error } = await supabase
  .from('bookings')
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

export async function deleteBooking(id,eq=false) {
  // REMEMBER RLS POLICIES
  
  let query =  supabase
  .from("bookings")
  .delete()
   if(eq){
    query=query.eq(eq,id)
   }else{
    query=query.eq("id", id);
   }

  
  const {error } = await query

   


  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
 
  return id;
}



export async function AddBooking(booking) {
  // REMEMBER RLS POLICIES
  
  const { data, error } = await supabase
  .from('bookings')
  .insert(booking)
  .select()

  if (error) {
    console.error('error add booking : ',error);
    throw new Error("Booking could not be created");
  }
 
  return data;
}



// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// data:ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}


// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
 
  return data;
}

