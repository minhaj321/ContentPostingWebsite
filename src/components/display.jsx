import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));


export default function Display({data , showbutton ,Email_posts}) {


  const classes = useStyles();

  return (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((user) =>{
              return(
              <Grid item key={user} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={user.avatar}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {user.name}
                    </Typography>
                    <Typography component='h2' variant='h5'>
                      {user.status}
                    </Typography>
                    <Typography component='h1'>
                      Email : {user.email}
                    </Typography>
                    <Typography component='h1'>
                      Phone : {user.phone}
                    </Typography>
                    <Typography component='h1'>
                      Age : {user.age}
                    </Typography>
                    <Typography component='h1'>
                      Address : {user.address}
                    </Typography>
                  </CardContent>
                  {
                    showbutton &&
                  <CardActions>
                    <Button size="small" color="primary"
                    onClick={()=>Email_posts(user.avatar)}
                    >
                      Posts
                    </Button>

                  </CardActions>
                  }
                </Card>
              </Grid>
              )
                })}
          </Grid>
        </Container>
  );
}