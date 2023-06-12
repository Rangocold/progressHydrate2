import React from "react";

import ReactDOM from "react-dom";

export function doClientRender() {
  const App = getApp(
    // Make Content and Sidebar code unavailable on first
    // client-side render, as if they're still loading over network.
    true
  );
  const rootElement = document.getElementById("root");
  // Start hydrating the app. Note that in Concurrent Mode,
  // we don't need *all* code to be loaded. Notice how if
  // you press "Load Sidebar JS code", you can interact
  // with the Sidebar even though the Content component
  // hasn't loaded its code yet.
  ReactDOM.createRoot(rootElement, {
    hydrate: true
  }).render(<App />);
}

// This is a setup function that simulates client/server setup.
// On the server, it simulates Sidebar and Content being available right away.
// On the client, it simulates them resolving over network (when you press a button).
export default function getApp(
  /** 是否模拟网络，为true就是客户端 */
  isSimulatingNetwork
) {
  let Sidebar;
  let Content;

  Sidebar = RealSidebar;
    Content = RealContent;

  function RealSidebar() {
    const [count, setCount] = React.useState(0);
    const [
      didHydrate,
      setDidHydrate
    ] = React.useState(false);
    React.useEffect(() => {
      // Make it easy to see when the code has loaded.
      setDidHydrate(true);
    }, []);
    return (
      <div
        id={'SideBar'}
        style={{
          background: didHydrate
            ? "rgba(0, 255, 0, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}
      >
        <h1>
          Sidebar (
          {didHydrate
            ? "Hydrated with JS"
            : "Initial HTML"}
          )
        </h1>
        <button
          onClick={() => setCount(c => c + 1)}
        >
          Clicked on sidebar {count} times
        </button>
      </div>
    );
  }

  function RealContent() {
    const [count, setCount] = React.useState(0);
    const [
      didHydrate,
      setDidHydrate
    ] = React.useState(false);
    React.useEffect(() => {
      // Make it easy to see when the code has loaded.
      setDidHydrate(true);
    }, []);
    return (
      <div
        style={{
          background: didHydrate
            ? "rgba(0, 255, 0, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}
      >
        <h1>
          Content (
          {didHydrate
            ? "Hydrated with JS"
            : "Initial HTML"}
          )
        </h1>
        <button
          onClick={() => setCount(c => c + 1)}
        >
          Clicked on content {count} times
        </button>
      </div>
    );
  }

  function App() {
    return (
      <div
        className="App"
        style={{
          border: "1px solid grey",
          margin: 10,
          padding: 10
        }}
      >
        <h1>React Progressive Hydration Demo*</h1>
        <h3>
          <i>
            * very experimental — likely contains
            bugs.
          </i>
        </h3>
        <h2>
          This app is server-rendered to HTML.{" "}
          Concurrent Mode lets us hydrate parts of
          UI without waiting for <i>all</i> JS to
          load.
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id='point' />
        <React.Suspense
          fallback={<h2>Loading sidebar...</h2>}
        >
          <Sidebar />
        </React.Suspense>
        <br />
        <React.Suspense
          fallback={<h2>Loading content...</h2>}
        >
          <Content />
        </React.Suspense>
      </div>
    );
  }

  return App;
}
