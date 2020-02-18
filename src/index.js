import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [value, setValue] = useState(2);
  const [visible, setVisible] = useState(true);
  if (visible) {
    return (
      <div>
        <button onClick={() => setValue(v => v + 1)}>inc</button>
        <button onClick={() => setValue(v => v - 1)}>dec</button>
        <button onClick={() => setVisible(false)}>Hide</button>
        <PlanetInfo id={value} />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>Show</button>;
  }
};

const getPlanet = id => {
  return fetch(`https://swapi.co/api/planets/${id}`)
    .then(res => res.json())
    .then(data => data);
};

const useRequest = request => {
  const initialState = useMemo(
    () => ({
      data: null,
      loading: true,
      error: null
    }),
    []
  );
  const [dataState, setDataState] = useState(initialState);
  useEffect(() => {
    setDataState(initialState);
    let cancel = false;
    request()
      .then(
        data =>
          !cancel &&
          setDataState({
            loading: false,
            data: data,
            error: null
          })
      )
      .catch(
        error =>
          !cancel &&
          setDataState({
            data: null,
            error: error,
            loading: false
          })
      );
    return () => (cancel = true);
  }, [request, initialState]);

  return dataState;
};
const usePlanetInfo = id => {
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};
const PlanetInfo = ({ id }) => {
  const { data, loading, error } = usePlanetInfo(id);
  if (error) {
    return <div>ERROR</div>;
  }
  if (loading) {
    return <div>LOADING</div>;
  }
  return (
    <div>
      {id} - {data.name}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
