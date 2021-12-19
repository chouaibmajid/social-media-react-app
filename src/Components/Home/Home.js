import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataBySearch } from "../../Redux/action";
import {
  AppBar,
  Button,
  Chip,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import Form from "../Forms/Forms";
import Pagination from "../Pagination/Pagination";

import Posts from "../Posts/Posts";
import useStyles from "./styles";
import { useHistory, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {


  const classes = useStyles();
  const query = useQuery();
  const [cureentId, setCureentId] = useState(null);
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();
  React.useEffect(() => {
    dispatch(getData(page))
  }, [cureentId, dispatch,page]);

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getDataBySearch(search));
      history.push(`/posts/search?searchQuery=${search}`);
    } else {
      history.push("/");
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCureentId={setCureentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form cureentId={cureentId} setCureentId={setCureentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
