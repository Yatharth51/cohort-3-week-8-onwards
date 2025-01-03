import { useState, useEffect } from "react";

function App() {

  const[posts,setPosts] = useState([]) ;

  function onClickHandler (){
    setPosts([...posts,{
      image : "https://static.vecteezy.com/system/resources/previews/008/695/917/non_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg" ,
      heading1 : "100xdevs",
      heading2 : "23,888 followers",
      heading3 : "12m",
      description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }])
  }

  return (<div>
    
    {posts.map(post=>
      <Post
      image = {post.image}
      heading1 = {post.heading1}
      heading2 = {post.heading2}
      heading3 = {post.heading3}
      description = {post.description}
      />
    )}
    <div style={{display: "flex"}}>
      <button style = {{justifyContent:"center",marginTop:10}} onClick = {onClickHandler}>Add Posts</button>
    </div>
    
  </div>)

}


function Post(props) {

  return (<div style = {{marginTop : 10}}>
    <div style = {{maxWidth: "40vw", maxHeight : "40vh", backgroundColor:"gray", borderRadius : 10, padding : 10}}>
      <div style={{ display: "flex" }}>
        <img src={props.image} style={{ width: 100, height:100, borderRadius: 10 }}></img>
        <div style={{ marginLeft: 10 }}>
          <p>{props.heading1}</p>
          <p>{props.heading2}</p>
          <p>{props.heading3}</p>
        </div>
      </div>
      <p>
        {props.description}
      </p>
    </div>

  </div>)
}


export default App;