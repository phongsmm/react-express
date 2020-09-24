import React from 'react';
import './Calldata.css'



class Calldata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input_1:'',
      items:[],
      isLoaded:false,
     
    }
  }

  async componentDidMount() {
    const link = "https://express-serve.herokuapp.com/api";
    const response = await fetch(link);
    const data = await response.json();
    await this.setState({isLoaded:true,items:data});
    await console.table(data)


  }

   count(len){
    if(len<10){
      return `0${len}`
    }
    return len;
  }

  
  Input1_Change = (event)=>{
    this.setState({input_1:event.target.value});
  }
    Input1_Submit = async ()=>{

   let newData = {
      id: `${this.count(this.state.items.length+1)}`,
      name : this.state.input_1,
      atb : 'OFF'

    };

    const r =  await fetch("https://express-serve.herokuapp.com/create",
    {method:'POST',headers:{'Content-type':'application/json'},
    body:JSON.stringify(newData)
  });
  r.json()
  window.location.reload(false);
 

    
  }

  render() {
    var {isLoaded,items} = this.state
    if(isLoaded){console.log('Data Loaded');}
  return (
    <div>
      <h1>Welcome </h1>
    <h3>
  {items.map(item => 

  {
    if(item.img!==""){
      return <div>
        <img alt="" src={item.img}/>
        <li className={item.atb} key={item.id}>{item.name}</li>
      
      </div>
    }
    
    
    else{
    return [
  <li className={item.atb} key={item.id}>{item.name}</li>
];
  }
})


}
    </h3>
    
    <div className="ui action input">
      <input type="text" placeholder="name" onChange={this.Input1_Change}/>
    <button className="ui button" onClick={this.Input1_Submit}>POST</button>
    </div>
    </div>

  );
  }

}

export default Calldata;
