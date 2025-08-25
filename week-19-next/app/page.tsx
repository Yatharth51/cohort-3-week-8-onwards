import axios from "axios";

export default async function Home() {

  const response = await axios.get("http://localhost:3000/api/v1/test") ;
  const userDetails = response.data ;
  

  return (
    <div>
      {userDetails.username}<br/>
      {userDetails.password}
    </div>
  );
}
