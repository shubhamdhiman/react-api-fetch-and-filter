import React  from 'react';
import ApiComponent from './ApiComponents'
import '../styles/App.css';

function App() {
  
  // var [value,setValue] = useState(0);
  // const increment = ()=>{
  //   setValue((prevValue)=> {
  //     var a = prevValue;
  //     a = prevValue + (prevValue+1);
  //     return a;
  //   })
  // }
  // useEffect(()=>{
  //   console.log("Component Mounted")
  // },[])
  // useEffect(()=>{
  //   console.log("Updating")
  // },[value])

  return (
    <div className="App">
      <ApiComponent />
      {/* {console.log(value)}
      <h2>starting</h2>
      <h2>value is {value}</h2>
      <button onClick={increment}>Button</button> */}
    </div>
  );
}

export default App;
