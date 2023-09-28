import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from '../../ui/Empty'



const CabinTable = () => {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams]=useSearchParams()
  //  Filter
  const filterValue = searchParams.get('discount')||'all'
  let filteredCabins;
  if(filterValue==='all')filteredCabins= cabins
  else if(filterValue==='no-discount')filteredCabins= cabins?.filter(cabin=>cabin.discount==0)
  else if(filterValue==='with-discount')filteredCabins = cabins?.filter(cabin=>cabin.discount>0)


  // Sort
  const sortBy = searchParams.get('sortBy')||'startDate-asc'
  const [field, direction]=sortBy.split("-")
  const modifier=direction==='asc'?1:-1
  const sortedCabins = filteredCabins?.sort((a,b)=>(a[field]-b[field])*modifier)


  if (isLoading) return <Spinner />;
  if (error)return <div className="">{error && error?.message}</div>
  if (!cabins.length) return <Empty resourceName='cabins'/>

  return (
    <Menus>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div className=""></div>
          <div className="">Cabin</div>
          <div className="">Capacity</div>
          <div className="">Price</div>
          <div className="">DisCount</div>
          <div className=""></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow {...cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
