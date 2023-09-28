
import Spinner from "../../ui/Spinner";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import {useGuests} from './useGuests'
import GuestRow from "./GuestRow";
import Empty from '../../ui/Empty'


const GuestTable = () => {
  const {isGuests, guests, error} = useGuests();

  const [searchParams]=useSearchParams()
  
  //  Filter
  const filterValue = searchParams.get('fullName')
  let filteredGuest=guests;
  if(filterValue){
    filterValue.replace('+',' ')
    filteredGuest= guests?.filter(guest=>{
      return Boolean(guest?.fullName?.match(filterValue));
  })
  }


  if (isGuests ) return <Spinner />;
  if (error)return <div className="">{error && error?.message}</div>
  if (!guests.length) return <Empty resourceName='cabins'/>

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div className=""></div>
          <div className="">fullName</div>
          <div className="">email</div>
          <div className="">nationality</div>
          
          <div className=""></div>
        </Table.Header>

        <Table.Body
          data={filteredGuest}
          render={(guest) => <GuestRow {...guest} key={guest.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default GuestTable;
