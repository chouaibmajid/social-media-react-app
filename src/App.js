import React , {useState} from "react";
import {useDispatch} from "react-redux"
import {getData} from "./Redux/action"
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import Form from "./Components/Forms/Forms";
import Posts from "./Components/Posts/Posts";
import memories from "./memories.png";
import useStyles from "./styles";

function App() {
  const classes = useStyles();
  const [cureentId, setCureentId] = useState(null);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getData())
  } ,[cureentId,dispatch])
console.log(cureentId);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCureentId={setCureentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form cureentId={cureentId} setCureentId={setCureentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
