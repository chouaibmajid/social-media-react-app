import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { PostDatas, UpdateData } from "../../Redux/action";

import useStyles from "./styles";

const Form = ({ cureentId , setCureentId }) => {
  const dispatch = useDispatch();
  const Post = useSelector((state) =>
    cureentId ? state.Posts.Posts.find((item) => item._id === cureentId) : null
  );

  React.useEffect(() => {
    if (Post) {
      setPostData(Post);
    }
  }, [cureentId]);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const updatState = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const UpdatImageState = ({ base64 }) =>
    setPostData({ ...postData, selectedFile: base64 });
  const submitForm = (e) => {
    e.preventDefault();
    if (cureentId === null) {
      dispatch(PostDatas(postData));
    }
    if (cureentId) {
      dispatch(UpdateData(cureentId, postData));
    }
    clear();
  };
  const clear = () => {
    setCureentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        noValidate
        onSubmit={submitForm}
      >
        <Typography variant="h6"></Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={updatState}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={updatState}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={updatState}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={updatState}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={UpdatImageState} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
