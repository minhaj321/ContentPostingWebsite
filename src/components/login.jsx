import {Link as RouteLink} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React,{useState} from 'react';
import firebase from './../firebase.jsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './../styles/login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'100px',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin() {
  const history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const classes = useStyles();
  
  
  const login = () =>{
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    firebase.database().ref('/accounts').on('child_added',function(data){
          if(email===data.val().email){
            console.log(data.val())
            localStorage.setItem('name',data.val().name);
            localStorage.setItem('avatar',data.val().avatar);
            localStorage.setItem('status',data.val().status);
          }
    })
    history.push('/contentlist');
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage)
  });
  }

  return (
    <div className='Main_login'>
      <br /><br /><br /><br /><br />
    <Container className='login_parent' maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{height:'370px' , width:'400px'}}>
        <Avatar id='avatar' className={classes.avatar}
            style={{
              background:'#D7E66B'
            }}
          >
        </Avatar>
        <Typography component="h1" variant="h5"
        style={{color:'#115D42'}}
        >
          Sign In
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              background:'#D7E66B'
            }}
            className={classes.submit}
            onClick={()=>login()}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <RouteLink to='/signup' style={{color:'black'}}>
                {"Don't have an account? Sign Up"}
              </RouteLink>
            </Grid>
          </Grid>
      </div>
    </Container>
    </div>
  );
}





