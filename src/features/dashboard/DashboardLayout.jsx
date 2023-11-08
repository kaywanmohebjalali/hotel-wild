import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentBookingsStay";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from '../check-in-out/TodayActivity'
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { booking, isBooking, numDays } = useRecentBookings();
  const {confirmedStay, isStays} = useRecentStays();
  const { cabins, isLoading: isCabins} = useCabins();



  if (isBooking || isStays || isCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={booking}
        confirmedStay={confirmedStay}
        numDays={numDays}
        cabinCount={cabins?.length}
      />

      <TodayActivity/>
      <DurationChart confirmedStay={confirmedStay}/>
      <SalesChart bookings={booking} numDays={numDays}/>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
