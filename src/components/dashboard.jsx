import { useHistory } from 'react-router-dom';
import ShowContent from './showContent.jsx';
import React ,{useState , useEffect} from 'react';
import firebase from './../firebase.jsx';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Report';
import LayersIcon from '@material-ui/icons/Layers';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Display from './display.jsx';


const drawerWidth = 240;

export default function Dashboard() {
const history = useHistory();
const classes = useStyles();
  
  const [open, setOpen] = useState(true);
  const [users,setUsers]=useState([]);
  const [admins,setAdmins]=useState([]);
  const [reports,setReports]=useState([]);
  const [display,setDisplay]=useState([]);
  const [postButton,setpostButton]=useState(false);
  const [dataType,setdataType]=useState('');
  const [postslist,setPost]=useState([]);
  const [postOfEmails,setPostOfEmails]=useState([]);
  const [report,setReport]=useState(false);
  useEffect(()=>{
    firebase.database().ref('/accounts').on('child_added',function(data){
      if(data.val().status==='user')
            {
                users.push(data.val());
            }
    })

    },[]);

  // user function      
    const Users=(cond)=>{
      if(users.length<=0){
          firebase.database().ref('/accounts').on('child_added',function(data){
            if(data.val().status==='user')
            {
                users.push(data.val());
            }
        })
      }
        setDisplay(users);
        setdataType('users');
        setpostButton(cond);
        console.log(display);
        }
  

  // admin function      
  const Admins=(cond)=>{
    if(admins.length<=0){
        firebase.database().ref('/accounts').on('child_added',function(data){
            if(data.val().status==='admin')
            {
                admins.push(data.val());
            }
      })
    }
        setDisplay(admins);
        setdataType('users');
        setpostButton(cond);
        console.log(display);
  }


    // reports function      
  const Reports=(cond)=>{
    if(reports.length<=0){
        firebase.database().ref('/posts').on('child_added',function(data){
        var obj={
            data:data.val(),
            key:data.key
          }
          if(data.val().report===true)
            {
              reports.push(obj);
            }
      })
    }
        setDisplay(reports);
        setdataType('posts');
        setpostButton(cond);
        setReport(true);
  }


  // posts function      
  const Posts=(cond)=>{ 

    if(postslist.length<=0){
      firebase.database().ref('/accounts').on('child_added',function(data){
        postslist.push(data.val());
      })
    }
      setDisplay(postslist);
      setdataType('users');
      setpostButton(cond)

   }

   // prop function
   const Email_posts=(avatar)=>{
     setPostOfEmails([])
      firebase.database().ref('/posts').on('child_added',function(data){
        var obj={
          data:data.val(),
          key:data.key
        }
        if(data.val().posterAvatar===avatar)
          {
              postOfEmails.push(obj);
            }
          })
          setDisplay(postOfEmails);
          setdataType('posts');
          console.log('google');
          setReport(false);    
   }


  // UI Functions
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  // return method
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>

        <ListItem button
        onClick={()=>Users(false)}
        >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button
        onClick={()=>Admins(false)}
        >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Admins" />
    </ListItem>
    <ListItem button
        onClick={()=>Reports(false)}
        >
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="Reported Posts" />
    </ListItem>
    <ListItem button
        onClick={()=>Posts(true)}
        >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Posts" />
    </ListItem>
    <ListItem button
        onClick={()=>history.push('/contentlist')}
        >
      <ListItemIcon>
        <ArrowBackIcon />
      </ListItemIcon>
      <ListItemText primary="Back" />
    </ListItem>


        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        
        {
         dataType==='users' &&
            <Display data={display} showbutton={postButton} Email_posts={Email_posts}/>
        }
        {
         dataType==='posts' &&
            <ShowContent data={display} show_buttons={false} reports={report}/>
        }
                    
        </Container>
      </main>
    </div>
  );
  // end of return
}


















const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));
  