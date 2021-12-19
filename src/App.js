import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "./Redux/action";
import { Container } from "@material-ui/core";
import Layout from "./HOC/Layout";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import useStyles from "./styles";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

// <Route path="/about">
//   <About />
// </Route>
// <Route path="/users">
//   <Users />
// </Route>
