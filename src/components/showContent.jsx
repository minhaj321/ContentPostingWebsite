import './../styles/showContent.css';
import Button from '@material-ui/core/Button';
import React from 'react';
import Media from 'react-bootstrap/Media';
import firebase from './../firebase.jsx';


const ShowContent = ({data,show_buttons,reports}) => {


  // like handling function
  const Liking=(k,lik)=>{
firebase.database().ref('/posts/'+k).update({
  likes:lik+1
})
}

// report handling function
const Reporting=(k,c)=>{
  firebase.database().ref('/posts/'+k).update({
    report:true,
    reportCounts:c+1
  })}
      
  
// Delete post method
const deletePost = key=>{
  console.log(key)
  firebase.database().ref('/posts/').child(key).remove();
}


  // main return method
  return ( 
        <div style={{background:'#454545' , marginTop:'-44px'}}>
          <br /><br /><br />
        {
        data.reverse().map((v,i)=>{
              return(
        <Media className='media' key={i}>
        <img
          width={64}
          height={64}
          className="align-self-start mr-3 avatar"
          src={v.data.posterAvatar}
          alt="Generic placeholder"
        />
        <Media.Body>
          <h1 className='poster'>{v.data.poster}</h1>
          <h1>{v.data.title} : <p className='description'>{v.data.description}</p></h1>
          
          <img className='post_img' src={v.data.url} alt="nothing" />
          <p className='main'>{v.data.main}</p>    
          {
                  show_buttons
                  &&
                  <div style={{display:'flex' , justifyContent:"space-around"}}>
                    
        <Button
            type="submit"
            variant="outlined"
            color="primary"
            id='like'
            size='small'
            onClick={()=>{Liking(v.key , v.data.likes)}}
          >
            Like
          </Button>
          <Button
            type="submit"
            variant="outlined"
            id='report'
            size='small'
            onClick={()=>{Reporting(v.key,v.data.reportCounts)}}
          >
            Report
          </Button>
                  </div>
                }
                {
                  reports &&
                  <div>
                    <h2 className='likes_show'>likes:{v.data.likes}</h2>
                    <h2 className='reports_show'>Reports:{v.data.reportCounts}</h2>
                    <button className='dlt_btn' onClick={()=>deletePost(v.key)}>Delete post</button>
                    <br />
                  </div>
                }
        </Media.Body>



                
                <br />
      </Media>
      
              )
          })    
    }
    
    </div>
     );
}
 
export default ShowContent;