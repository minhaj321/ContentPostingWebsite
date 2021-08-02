import {useHistory} from 'react-router-dom';
import React, { useState } from 'react';
import firebase from './../firebase.jsx';
import { Col,Row,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './../styles/contentpost.css';
const ContentPost = () => {
    const history = useHistory();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [main,setMain]=useState('');
    const [file,setFile]=useState('');
    const poster=localStorage.getItem('name');
    const posterAvatar=localStorage.getItem('avatar');
    const sendPost=()=>{
        firebase.storage().ref(`/posts/${file.name}`).put(file);
          setTimeout(() => {
          firebase.storage().ref('/posts').child(file.name)
          .getDownloadURL().then(uri=>{
            console.log(uri)
            const obj={
              poster:poster,
              posterAvatar:posterAvatar,
              title:title,
              description:description,
              main:main,
              url:uri,
              report:false,
              likes:0,
              reportCounts:0
            };
            firebase.database().ref('/posts').push(obj);
            history.push('/contentlist');
          })
        }, 4000);
      };// end of sendPost function

      return (
        <div className='contentpost_main'> 
          <br /><br />
<Container className='post_form'>
  <Row>
    <Col> <h2> Lets Create A New Post</h2> </Col>
  </Row>
        <br />
  <Row>
    <Col> 
    <h5>Content Title</h5>
     <TextField id="standard-basic" value={title} label="Title"  className='post_input'
     onChange={e=>setTitle(e.target.value)}
     /></Col>
  </Row>
  <br />    
  <Row>
    <Col> 
    <h5>Content Description</h5>
     <TextField id="standard-basic" value={description} label="Description"  className='post_input'
     onChange={e=>setDescription(e.target.value)}     
     /></Col>
  </Row>
  <br />
  <Row>
    <Col> 
    <span>Choose Image For Content </span>
        <input type="file" name="post_img" id="post_img" accept="image/*"
     onChange={e=>setFile(e.target.files[0])}
     />
     </Col>
  </Row>
  <br />
  <Row>
    <Col> 
    <h5>Main Content</h5>
    <Box component="span">
        {/* <img src="" alt="photo" height='100' width='100' /> */}
        <textarea name="main_content"  value={main} id="main_content" rows="5"
     onChange={e=>setMain(e.target.value)}
     ></textarea>
    </Box></Col>
  </Row>
  <Row>
      <Col>
      <Button id='post_button' variant="contained" color='primary'
      onClick={()=>sendPost()}
      >Post</Button>
      </Col>
  </Row>
    <br />
</Container>
</div>
     );
}
 
export default ContentPost;