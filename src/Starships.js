import React from "react";
//import axios from "axios";
import Pilot from "./pilot";

class Starships extends React.Component{
    constructor(){
        super();
        this.state = {
            starshipName: [],
            visibleStarship: [],
            pilotName: [],
        }
    } 

    componentDidMount(){
        
        const starshipUrl = `https://swapi.co/api/starships/`;
        
        fetch(starshipUrl).then(response => response.json())
            .then((starshipList) => {
                //console.log(searchShip.data.results);
                this.setState({
                    starshipName: starshipList.results,
                    visibleStarship: starshipList.results
                })
            })
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
                                        <p>
                                            Pilots: <Pilot pilotList={getStarships.pilots}/>
                                        </p>
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