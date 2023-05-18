import React, { useState, useEffect } from "react";

function ApiComponents() {
  const [apiData, setapiData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [route, setRoute] = useState("products");
  const [sort,setSort] = useState(false)
  function getApiData(json){
    switch(route){
      case "products":
        return json.products;
      case "users":
        return json.users;
      case "todos":
        return json.todos;
      case "carts":
        // return json;
        return json.carts;
      default:
        return;
    }
  }
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
      const data = await fetch(`https://dummyjson.com/${route}`);
      const json = await data.json();
      // setapiData(route === "products" ? json.products : json.users); Used when only two routes were there
      console.log(json);
      setapiData(getApiData(json));
      setLoader(false);
    })(); // Don't forget to use the semicolon in the end of IIFE function.
    // Or else we can't use another IIFE function in this scope.
    // Because without ; first IIFE funciton don't know where it has ended.

    // Or we can create the function outside and call it from inside
    // fetchData()
  }, [route]);

  function returnRender(item,index){
    switch(route){

      // Case Products
      case "products":
        return <div
        className="card my-2"
        key={index}
        style={{ width: "18rem" }}
      >
        {/* // Its's Always better to do optional Chaining */}
        <img
          className="card-img-top"
          src={item?.thumbnail}
          alt="img"
        />
        <div className="card-body">
          <h5 className="card-title">
            {item?.title}
          </h5>
          <p className="card-text">{item?.description}</p>
          <a href="https://google.com" className="btn btn-primary">
            {item?.price}
          </a>
        </div>
      </div>;

      // Case Users
      case "users":
        return <div
        className="card my-2"
        key={index}
        style={{ width: "18rem" }}
      >
        {/* // Its's Always better to do optional Chaining */}
        <img
          className="card-img-top"
          src={item?.image}
          alt="img"
        />
        <div className="card-body">
          <h5 className="card-title">
            {item?.firstName}
          </h5>
          <p className="card-text">{item?.description}</p>
          <a href="https://google.com" className="btn btn-primary">
            {item.age}
          </a>
        </div>
      </div>;

      // Case Todos
      case "todos":
        return <div
        className="card my-2"
        key={index}
        style={{ width: "18rem" }}
      >
        {/* // Its's Always better to do optional Chaining */}
        
        <div className="card-body">
          <h5 className="card-title">
            {item?.userId}
          </h5>
          <p className="card-text">{item?.todo}</p>
          <a href="https://google.com" className="btn btn-primary">
            {String(item?.completed)}
          </a>
        </div>
      </div>;
      // Case Carts
      case "carts":
        return <div
        className="card my-2"
        key={index}
        style={{ width: "18rem" }}
      >
        {/* // Its's Always better to do optional Chaining */}
        
        <div className="card-body">
          <h5 className="card-title">
            {item?.title}
          </h5>
          <p className="card-text">
            {item?.quantity}
            </p>
          <a href="https://google.com" className="btn btn-primary">
            {item?.price}
          </a>
        </div>
      </div>;
      default:
        return;
    }
  }
  function sortedObj(a,b){
    if(a.price<b.price){
      return -1;
    }
    if(a.price>b.price){
      return 1;
    }
    return 0;
  }
  function sortData(){
    const clonedArr =[...apiData];
    if(sort){
      clonedArr.sort(sortedObj)
    }else{
      clonedArr.sort(sortedObj).reverse();
    }
    setapiData(clonedArr)
    setSort(!sort)
  }

  // Tried to call the data by creating the function but still didn't work
  function clearFilter(){
    (async function fetchData() {
      setLoader(true);
      const data = await fetch(`https://dummyjson.com/products`);
      const json = await data.json();
      setapiData(json.products);
      
      setLoader(false);
    })();

  }
  console.log(apiData);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <div>
        <button
          className={`${
            route === "products" ? "btn btn-primary btn-lg" : "btn btn-outline btn-lg"
          } btn me-2`}
          onClick={() => {
            setRoute("products");
          }}
        >
          Products
        </button>
        <button
          className={`${
            route === "users" ? "btn btn-primary btn-lg" : "btn btn-outline btn-lg"
          } btn me-2`}
          onClick={() => {
            setRoute("users");
          }}
        >
          Users
        </button>
        <button
          className={`${
            route === "todos" ? "btn btn-primary btn-lg" : "btn btn-outline btn-lg"
          } btn`}
          onClick={() => {
            setRoute("todos");
          }}
        >
          Todos
        </button>
        <button
          className={`${
            route === "carts" ? "btn btn-primary btn-lg" : "btn btn-outline btn-lg"
          } btn`}
          onClick={() => {
            setRoute("carts");
          }}
        >
          Carts
        </button>
        </div>
        <div>
        {route === "products" && <button onClick={sortData} style={{marginRight:"10px"}} className="btn btn-info btn-lg"
        >
          Sort{" "}{sort ? <i class="fa-solid fa-sort-down" style={{color: "#000000"}}></i>:<i class="fa-solid fa-sort-up" style={{color: "#000000"}}></i>}
        </button>}
        {route === "products" && <button onClick={clearFilter} className="btn btn-danger btn-lg">Clear Filter</button> }
        {/* {route === "products" && <button onClick={()=>{setapiData("products")}} className="btn btn-danger btn-lg">Clear Filter</button> } */}
      
        </div>
      </div>

      {/* Check if the data is not loaded or not, if loaded then show the data else show the loader */}
      {loader ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"> </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 d-flex justify-content-around flex-wrap">
          {   route !== "carts" &&
            apiData.slice(0, 10).map((item, index) => {
              return (
                returnRender(item,index)
              );
            })
          }
          {
            route === "carts" &&
            apiData.slice(0,10).map((prod,index)=>{ 
              return prod?.products?.map((item,index) =>{return  returnRender(item,index) })
            })
          }
        </div>
      )}
    </div>
  );
}

export default ApiComponents;
