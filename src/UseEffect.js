import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);
  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>inc</button>
        <button onClick={() => setValue(v => v - 1)}>dec</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        {/* <ClassCounter value={value} /> */}
        <Notification />
      </div>
    );
  } else {
    return (
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        Show
      </button>
    );
  }
};

const HookCounter = props => {
  useEffect(() => {
    console.log("mount");
  }, []);
  useEffect(() => {
    console.log("update");
  });
  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);
  return <p>Hook {props.value}</p>;
};
class ClassCounter extends React.Component {
  componentDidMount() {
    console.log("class: did mount");
  }
  componentDidUpdate(props) {
    console.log("class: did update");
  }
  componentWillUnmount() {
    console.log("class: will unmount");
  }

  render() {
    return <p>Class {this.props.value}</p>;
  }
}

const Notification = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (visible) {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  } else return <div></div>;
};
ReactDOM.render(<App />, document.getElementById("root"));
