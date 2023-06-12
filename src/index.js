import React from "react";
import ReactDOMServer from "react-dom/server";
import getApp, { doClientRender } from "./App";
import ReactDOM from "react-dom";

// Our app component tree looks like this:
// - App
//    - Sidebar
//    - Content
//
// Our initial HTML contains them all.
// However, on the client, we'll load their code piece by piece.
//
// The point of this demo is to show that in Concurrent Mode,
// React can make Sidebar/Content interactive the moment their
// code arrives--without waiting for the whole JS bundle to load.

// Do a full server render to fill the HTML.
doServerRender();

// Start hydration as soon as we have the App component.
// Note this doesn't *need* Sidebar or Content code to load yet.

function doServerRender() {
  const App = getApp(
    // Pretend we're on the server, and have all the code
    // to render the app (including Content and Sidebar).
    false
  );
  const rootElement = document.getElementById("root");
  // Just fill the initial HTML. As if it's server rendered.
  rootElement.innerHTML = ReactDOMServer.renderToString(<App />);
  window.doClientRender = doClientRender;

  setTimeout(() => {
    new IntersectionObserver(async ([entry], obs) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(document.querySelector('#point'));

      doClientRender()
    }).observe(document.querySelector('#point'));
  }, 1000);
}

