import React from "react";

class Pilot extends React.Component {
  constructor() {
    super();
    this.state = {
      pilotName: []
    };
  }

  componentDidMount() {
    const { pilotList } = this.props;

    pilotList.forEach(getPilot => {
        fetch(getPilot)
        .then(response => response.json())
        .then(pilotInStarship => {
            this.setState({
                pilotName: pilotInStarship
            });
        });  
    });
  }

  render() {
    const { name } = this.state.pilotName;
    return <div>{name}</div>;
  }
}

export default Pilot;