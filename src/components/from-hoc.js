import React from "react";

const FromHOC = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: "",
        password: ""
      };
      this.onChangeHandle = this.onChangeHandle.bind(this);
    }

    onChangeHandle(key, value) {
        this.setState({
          [key]: value
        });
      }

    render() {
        return <Component data={this.state} onChangeHandle={this.onChangeHandle}  {...this.porps} />
    }
  };
};

export default FromHOC;
