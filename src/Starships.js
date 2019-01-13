import React from "react";
import axios from "axios";

class Starships extends React.Component{
    constructor(){
        super();
        this.state = {
            starshipName: [],
            visibleStarship: [],
            pilotName: [],
            //test: []
        }
    } 

    componentDidMount(){
        
        const starshipUrl = `https://swapi.co/api/starships/`;
        
        axios.get(starshipUrl)
            .then((searchShip) => {
                //console.log(searchShip.data.results);
                this.setState({
                    starshipName: searchShip.data.results,
                    //starshipModel: searchShip.data.results
                    visibleStarship: searchShip.data.results
                })
                
                for(var i = 0; i<this.state.visibleStarship.length; i++){
                    this.setState({
                        pilotName: this.state.visibleStarship[i].pilots
                    })    
                    console.log(this.state.pilotName);
                }
                
                //return axios.get(this.state.pilotName);
            })
            .then(
                axios.get(this.state.pilotName)
                    .then((pilot) => {
                        
                        this.setState({
                            //test: pilot.data.results
                        })
                    })
            )
            .catch((error) => {
                console.log('Request Failed', error);
            });
    }
    

    filterShips = () => {
        const filterStarship = this.state.starshipName.filter(getShips => {
          return (
              getShips.name.toLowerCase().indexOf(this.filterText.value.toLowerCase()) >= 0 ||
              getShips.model.toLowerCase().indexOf(this.filterText.value.toLowerCase()) >= 0
            )
        })
        
        this.setState({
            visibleStarship: filterStarship
        })
    };
    
    render(){
        return(
           <section>
               <div className="row">
                    <div className="input-group mb-3 mx-auto w-50 mt-5">
                        <input type="text" onChange={this.filterShips} ref={node => (this.filterText = node)}            
                                className="form-control" placeholder="Enter starship's name or model" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.filterShips}>Filter</button>
                        </div>
                    </div>
                </div>    

                <div className="container-fluid">
                    <div className="row ml-5">
                        {this.state.visibleStarship.map(getStarships => {
                            return(
                                <div key={getStarships.name} className="card custom-width m-3">
                                    <img src={require("./img/starship.jpg")} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{getStarships.name}</h5>
                                        <p className="card-text">Model: {getStarships.model}</p>
                                        <p className="card-text">Pilot: {getStarships.pilots}</p>
                                    </div>
                                </div>
                            )
                        })}       
                    </div>
                </div>
           </section>
           
        )
    }
}

export default Starships;