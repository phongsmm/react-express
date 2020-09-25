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


  shouldComponentUpdate(Props,State){
    if(this.state!==State){
      return true;
    }

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

    <h3>
  {items.map(item => 

  {

      return [
      <div  className ="Datacard">
        <div className="ui card" key={item.id}><div className="image"><img draggable="false" alt="" src={item.img}/>
        </div><div className="content"><div className="header">{item.name}</div><div className="meta">
        <div className={item.atb}><span className="date">Attribute is : {item.atb}</span></div></div>
          </div></div>
      </div>
    
  
];
  }
  )


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
