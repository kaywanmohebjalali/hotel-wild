/* eslint-disable react/prop-types */
import {HiOutlineBriefcase, HiOutlineChartBar} from 'react-icons/hi'
import {HiOutlineBanknotes, HiOutlineCalendarDays} from 'react-icons/hi2'


import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'







const Stats = ({bookings, confirmedStay, numDays, cabinCount}) => {

    const numBookings= bookings?.length

    const salesPrice = bookings.reduce((acc, cur)=>acc+cur.totalPrice,0)

    const checkins = confirmedStay?.length


    const occupation = confirmedStay?.reduce((acc, cur)=>acc+cur.numNights,0)/(numDays * cabinCount)
  return (
    <>
      <Stat value={numBookings} title='bookings' color='blue' icon={<HiOutlineBriefcase/>} />
      <Stat value={formatCurrency(salesPrice)} title='Sales' color='green' icon={<HiOutlineBanknotes/>} />
      <Stat value={checkins} title='check ins' color='indigo' icon={<HiOutlineCalendarDays/>}/>
      <Stat value={Math.round(occupation*100)+ '%'} title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar/>} />
    </>
  )
}

export default Stats