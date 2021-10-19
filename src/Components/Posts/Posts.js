import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector , useDispatch } from "react-redux";
import {getData} from "../../Redux/action"
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCureentId }) => {
  const  { Posts } = useSelector((state) => state.Posts);
  const dispatch = useDispatch();
  const classes = useStyles();


  return    !Posts.length ? <CircularProgress /> : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {Posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCureentId={setCureentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
