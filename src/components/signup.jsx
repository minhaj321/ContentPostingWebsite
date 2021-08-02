import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import firebase from './../firebase.jsx';
import './../styles/signup.css';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
},
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

}));

export default function SignUp() {
  const history = useHistory();
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState('');
  const [password,setPassword]=useState('');
  const [code,setCode]=useState(0);
  const [checkbox,setCheckbox]=useState(false);
  const [avatar,setAvatar]=useState('');
  const classes = useStyles();

  const Sign=()=>{
    var status='user';
    if(code==1122){
      status='admin'
    }
    var full=email+avatar.name;
    console.log(status,'=====',full)
    firebase.storage().ref(`/avatars/${full}`).put(avatar);

    setTimeout(() => {
      firebase.storage().ref('/avatars').child(full)
      .getDownloadURL().then(uri=>{
        console.log(uri)
    var data={
      name:name,
      phone:phone,
      address:address,
      email:email,
      age:age,
      status:status,
      avatar:uri
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      firebase.database().ref('/accounts').push(data);
      history.push('/')      
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  })
    }, 5000);



  }


  return (
    <div className='Main_Signup'>
      <br />
    <Container className='signUp_parent' maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} id='avatar'
            style={{
              background:'#D7E66B'
            }}
        >
        </Avatar>
        <Typography component="h1" variant="h5"
        style={{color:'#115D42'}}
        >
          Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="Name"
                value={name}
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={e=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='Phone'
                label="Phone No."
                name="Phone"
                autoComplete="phone"
                onChange={e=>setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={e=>setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                onChange={e=>setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e=>setPassword(e.target.value)}
              />
              </Grid>
              <Grid item xs={6}>
              <span>Profile Picture</span>
              <input type="file" name="avatar" id="avatar_img" accept="image/*"
                onChange={e=>setAvatar(e.target.files[0])}
     />
              </Grid>
            <Grid item xs={7}>
              <div style={{padding:'3px'}}>
              <p style={{color:'#8DB600' , fontSize:15}}>
                For Admin Account check the mark and enter the code
              </p>
              </div>
            </Grid>
            <Grid item xs={2}>
            <Checkbox 
            value={checkbox}
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            onClick={e=>setCheckbox(!checkbox)}
            />              
            </Grid>
            <Grid item xs={3}>
              <TextField
                disabled={!checkbox}
                required
                fullWidth
                name="Code"
                label="Code"
                type="number"
                id="code"
                autoComplete="code"
                onChange={e=>setCode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              background:'#D7E66B'
            }}
            onClick={()=>Sign()}
            >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/" style={{color:'black'}}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
    </Container>
    </div>
  );
}



