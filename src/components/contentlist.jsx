import { useHistory , Link} from 'react-router-dom';
import './../styles/contentlist.css';
import firebase from './../firebase.jsx';
import React , {useState , useEffect} from 'react';
import ShowContent from './showContent.jsx';
const ContentList = () => {
    const history = useHistory();
    const [posts,setPosts]=useState([]);  
    const [show,setShow]=useState(false);
    var name=localStorage.getItem('name');
    var avatar=localStorage.getItem('avatar');
    var status=localStorage.getItem('status');
    useEffect(()=>{
      console.log('google');
      setPosts([]);
      setPosts(posts);
        firebase.database().ref('/posts').on('child_added',function(data){
          var obj={
            data:data.val(),
            key:data.key
          }
          posts.push(obj);
          setPosts(posts);
        })
        setTimeout(()=>{
          setShow(true);
        },3000);
      },[]);

      const LogOut=()=>{
        firebase.auth().signOut().then(() => {
        localStorage.removeItem('name');
        localStorage.removeItem('status');
        localStorage.removeItem('avatar');
        history.push('/');
        });
      }

      return ( 
        <div>
          <div className='header_div'>
            <p>{name}</p>
            <img src={avatar} alt="avatar" />
            <button onClick={()=>LogOut()}>LogOut</button>
          </div>
          <div className='second_div'>
          <Link to='/contentpost'><button id='post'>+ New Post</button></Link>
            {
              status==='admin'
              &&
          <Link to='/dashboard'><button>Admin Panel</button></Link>
            }
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {
            show &&
          <ShowContent data={posts} show_buttons={true}  reports={false}/>
          }
        </div>
        
     );
}
 
export default ContentList;