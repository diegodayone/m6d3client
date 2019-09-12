import React from "react";

class ProjectsComponent extends React.Component {
  state = { projects: [] };
  render() {
    return (
      <div>
        {this.state.projects.map(x => (
          <div>
            {x.Name} --> {x.Description}
          </div>
        ))}
      </div>
    );
  }

  componentDidMount = async () => {
    var resp = await fetch("http://127.0.0.1:3550/projects/");
    var json = await resp.json();
    this.setState({ projects: json });
  };
}

export default ProjectsComponent;
