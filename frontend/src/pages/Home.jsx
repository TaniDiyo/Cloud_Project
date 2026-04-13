import { useState } from "react";
import Navbar from "../components/Navbar";
import TripForm from "../components/TripForm";
import Result from "../components/Result";

function Home() {
  const [data, setData] = useState(null);

  return (
    <>
      <Navbar />

      <div className="hero">
        <h1>Find Your Next Adventure ✈️</h1>
        <p>Plan smart trips within your budget</p>
      </div>

      <TripForm setData={setData} />
      {data && <Result data={data} />}
    </>
    
  );
  
}

export default Home;