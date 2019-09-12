import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import ProjectsComponent from './ProjectsComponent';

class App extends React.Component {
  state = {
    students: [],
    projects: [],
    studentID: 0,
    file: null
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/projects">Projects!!!</Link>

          <Route path="/" exact render={() =>
            <>
              {
                this.state.students.map(x => <div>
                  {x.Name} {x.Surname}
                  <img src={x.Image} style={{ width: "100px", height: "100px" }} />
                </div>)
              }
              <hr></hr>
              <select onChange={(val) => this.setState({ studentID: val.target.value })} >
                {this.state.students.map(x => <option value={x.ID}>{x.Name} {x.Surname}</option>)}

              </select>

              <input type="file" onChange={(val) => this.setState({ file: val.target.files[0] })} />
              <button onClick={this.sendImage} >Change Picture</button>
            </>
          } />

          <Route path="/projects" component={ProjectsComponent} />

        </div>
      </Router>
    );
  }

  sendImage = async () => {
    console.log("hey!")
    const data = new FormData();
    data.append("picture", this.state.file)

    await fetch("http://localhost:3550/students/" + this.state.studentID + "/upload",
      {
        body: data,
        method: "POST"
      })
  }

  componentDidMount = async () => {
    var resp = await fetch("http://127.0.0.1:3550/students/");
    var json = await resp.json();
    this.setState({ students: json })


  }
}

export default App;
