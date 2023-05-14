import React, { useState, useEffect } from "react";

function ApiComponents() {
  const [apiData, setapiData] = useState([]);
  const [loader,setLoader] = useState(false);
  // async function fetchData(){
  //   const data = await fetch('https://dummyjson.com/products');
  //   const json = await data.json()
  //   setapiData(json)
  // }

  useEffect(() => {
    // Here we will see four Methods to call fetch the data
    // fetch('https://dummyjson.com/products')
    // .then(res => res.json())
    // .then(json => setapiData(json))

    // We can also use one more mehtod
    // async function fetchData(){
    //   const data = await fetch('https://dummyjson.com/products');
    //   const json = await data.json()
    //   setapiData(json)
    // }
    // One more mehtod is there
    (async function fetchData() {
      setLoader(true);
      const data = await fetch("https://dummyjson.com/products");
      const json = await data.json();
      setapiData(json.products);
      setLoader(false);
      console.log(json.products);
    })(); // Don't forget to use the semicolon in the end of IIFE function.
    // Or else we can't use another IIFE function in this scope.
    // Because without ; first IIFE funciton don't know where it has ended.

    // Or we can create the function outside and call it from inside
    // fetchData()
  }, []);
  return (
    <div className="container flex">
      {loader ? (<div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"> </span>
        </div>
      </div>):
      <div className="mt-5 d-flex justify-content-around flex-wrap">
      {apiData.length > 0 &&
        apiData.slice(0, 10).map((item, index) => {
          return (
            <div className="card my-2" key={index} style={{ width: "18rem" }}>
              {/* // Its's Always better to do optional Chaining */}
              <img
                className="card-img-top"
                src={item?.thumbnail}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item?.title}</h5>
                <p className="card-text">{item?.description}</p>
                <a href="#" className="btn btn-primary">
                  {item?.price}/- Rs
                </a>
              </div>
            </div>
          );
        })}
    </div>}
      
    </div>
  );
}

export default ApiComponents;
