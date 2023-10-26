import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from '../ui/Row'
function Settings() {
  return<Row>
    <Heading p='0 0 2rem 0' as="h1">Update hotel settings</Heading>
    <UpdateSettingsForm/>

  </Row> 
  
}

export default Settings;
