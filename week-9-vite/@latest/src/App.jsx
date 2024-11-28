import { useState,useEffect } from "react";

function App(){
  const [posts,setPosts] = useState([]) ;

  const postComponents = posts.map(post=>
    <PostComponent 
    image  = {post.image}
    name = {post.name}
    followerCount = {post.followerCount}
    time = {post.time}
    description = {post.description}
    />)


  function addPosts(){
    setPosts([...posts,{
      image : "https://media.licdn.com/dms/image/v2/D5612AQHV7OQuC-dRvQ/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1709355461942?e=1738195200&v=beta&t=YNJHdCxMmayvFE4dySFnA1TzX7UlB3pxa4ktgRTEuNQ",
      name : "KITTY",
      followerCount :"53,378",
      time : 22 ,
      description: "Kitty knows how to dance and knows the JIZZ."
    }])
  }


  return <div style={{display : "flex", justifyContent : "center"}}>
    <div>
      <div>
        <button onClick = {addPosts}>CLICK TO ADD</button>
      </div>
      {postComponents}
      {/* <PostComponent 
      image = {"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAilBMVEX///8AAAD8/PwEBAT5+fkICAi8vLw3NzdwcHAMDAz29vYUFBStra3f398eHh51dXXZ2dkRERHKysrr6+s/Pz8aGhrQ0NDAwMAkJCSbm5toaGiLi4tLS0tQUFDU1NTw8PBdXV18fHylpaWGhoZhYWGenp4sLCxCQkKJiYmUlJQwMDBVVVW0tLRMTEyUaczXAAAH10lEQVR4nO2Zi3aiSBCGoRtQEPCCihrvJnGMyfu/3tZf1Y3mtok6O3Oyp75kDCB0V3VdmwkCRVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURfm7GNMcvb7+xyW5GQPk6HSJ/0R/R6Br+BcrmB9nE2ePV4LLtZ+jipPUif1O7p+jSGOOt1ebjx9GFvxMuU+Q9FWd5+MVH57pki3zbV18+bjjvxTxg1kDJFQTTMO4ywFh6Kfex6ENw/i+OFejmnVwMRzm/kG5OzD+gAaowtja2MZxnD6up5n/guaIfKYwZ5NHEoXR2RhvFu97ShgXD2ZnQ9t2spkZyUu/9BEfZDL6zJJ+c/m4auIl8lPjJAtM4W6SG0e7CEJ6CWUkX4nOBfYjNJpeZFDjFzQZYtouRKEr61Bgke68Jom1Il1M//a0vPRLkpmoqZD4G/Vs2KhBv7ZVNct9Nm9gsubk5ISmUffiNA9Fiu5EBG9zeAd3LMJkvejQX2trmaGIoUK6WD+xlDMR2ysRGe9aZJE4LB8nk7Iv+kyq97O6EtWYxIhBjBspuNAgbpitdevX5qUqUjqMtzBEF1cnGd81hyWOGQmedHD74Kxj8drgo6Dv0oSF7G1iGHEYZD51n0eJ8Y+wSSJxjswty+n424qYIGd3sexaZPE2TnOZ3B3T0QB6LFjoaBCmYTjn5zM/jvHO34OWtRu8V8Kohw/U8NI6Uxi/ICYyLuwuaOlcTBXbfLsl77IbtnDfWjt3Vl+NSI4WBp2RRnERiPtCP0tZOBqPBwOJ+6Aa0HFGriWKcPjR2HDPMpNkaIIq2XXvtquMM1gxGIyXPvf16OmCBy8edptfyeqy3tStDw3bsuJaUQI/S/yybegsJSePSjiWf6QHEx7o6hPduzCcWpEhWhAdSibe2pTVSZNnCYBs05cscF9h0i3MnclXhgIqfKCniqO4eedwiR5ntDjYITqGXwXOXWoMm4h44UMTmcgOR1iE1LPses+Yfhm4O5NmnSIE1D1bsnh0OY9stKRvMwi/lTvh3umK7ildvrSUTq5WpAvZsSKTwAtSYQVpcZ5dfLsv5nT5Ce7XJrlKci72wR0i5o0i5p7EKqFR9oQc2HkccSrDrfck7lxsvKCLazqcQ9X5YhTKAl2viBwMg6bYpWKpA8Srmirepnn7ULvqpEjFAS5MVhzf9qQImGKtEdg7LPQDKZCXiEfKJgNIzcl5hdpUmwjr1kckkl/Yx6t6HHEtmg9uP/fNQhCgKblvFPF0sWKcaXIkgWUNh6klVk+K8BC5W4IMPrblZDGgHNmngIeH2gPuQrhMIvHkPcaNZseX9VXd2kkR+1qR8EyRJneyIs4pEOTQfial7My1zhSRIGKXNcgskqFhpBau7enCjmw0RnQ8w+2yz/YS31HkI9eKnWthnYvGtSgZ2z7KWET1k8M3HDl7FTg5uZaBa8V0a5vSYqtOauJ5Qfcc2A0tp/EKDtxDDeRYH+13SeQX4kpFTLB+HeyhBDsn5bpRBDHZcmVOOpowd7XtXBE4ydoF+9FKl+Z7uC6sDkv8kjhijyIfs5LZUk7RVyrCLcrOuvTL+PTLCk199eL0uw6kWK+4wxllrmU5z1qBy7GUDcyLlJBGFTb/Ax0+BcGQRJ+6DUTptU3rqxVBi2IGmCZ3OxPU8NiuWHQbLhCFuDyGTG5m1Hx49s4540kR1usOp8/e0t026NJP+5m3BqiQy4o+0pV/25G0WykbLS2aUS5VhFseVIShW+0KSf8FOiG82Y3R3rXRn1cRt+dj39z3RC+ftaSzWsIgJY439MhQOpeM45g9cU1Pbw5SRBqxTTbmdnMaRZe7FxIJKnuEfM/LDZGx2vGz685Du5e9Qg3RjzytQZkL12uad3/uWpE8P+ZGGZ00LB3ankyW73Z3S749gZ1aHFU4rx8OhwFruOFu/KTcRRaRByuUDnugZctQlVGXuOJbyv57snaWw/Lp2HCn/Yue61Scdg7SCkL3BD64Gq+511iwPxrsY/bIqtzYhNIhRqXEfin74Dz2dfWOm9grMpfECK/SlH0lXexp800S92S0Aosbx6257MJ4N0kJtM/mi6Zkkn4P+bqA7HHc70NxjPTo0k+OUZ+2vcEBIx1dSHVDNxwnrSylm1pJVSU4SMwVLzadRSL4Thd5KHUJ5oHXma6OU9mK8w+vMmmCPDyM+HkbHjExu5a0hvw5rwK33Zg1G2Day1euPV7KLEu2esQl3t0Tt6SRv0QVFFso4mI5uItD9wqhk7gZSOrxxM/Crylo/WRPNsYzSzyy5axlT8KE5UEqG4/cjl0NCUsJBHw1tFyBXdNAsRE7Xcvi1F9cwL7T6Wz8lEFvhv4znOxW5rT9C7ID79fT9ditU/bon6KsRIePVH+KUb8D+p2yNcvdOz4j+9b6hffxo03l8xNVfrqzPw38XjdI9uzYnW7z9ugGEMbFeFC936RVy0Fxy38rZL168MULPhMt67q4UQM/lhj+ncS/Y42+LA3N+5jbJno76gent87weyX8eqbTa7NX390ghvmOQXgOc3Xz+9nEP59P36abS144vXv4W9ul3/Yi/7Nxbg6ObyeLP+MLt8zyv/BWRVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEURVEU5f/JPxSHTUSy1oHtAAAAAElFTkSuQmCC"}
      name = {"100xDevs"}
      followerCount = {"23,378"}
      time = {12}
      description = {"100xDevs Hackathon Want to know how to win big .. ? Check out how these folks won 60000 in bounties."}

      />
    <PostComponent 
     image = {"https://media.licdn.com/dms/image/v2/D5612AQHV7OQuC-dRvQ/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1709355461942?e=1738195200&v=beta&t=YNJHdCxMmayvFE4dySFnA1TzX7UlB3pxa4ktgRTEuNQ"}
      name = {"KITTY"}
      followerCount = {"53,378"}
      time = {22}
      description = {"Kitty knows how to dance and knows the JIZZ."}
    /> */}

    </div>
    
  </div>
  
}

const style = {height: 90 , width : 90 , borderRadius : 20}

function PostComponent({image,name,followerCount,time,description}){

  return <div style = {{fontSize : 25, height : "23vh", width : "20vw", backgroundColor:"gray", borderRadius : 20}}>
    <div style = {{display : "flex",marginLeft : 20,marginTop : 20 ,paddingTop : 10}}>
      <div>
        <img src={image} style = {style} />
      </div>
      <div style = {{marginLeft : 15}}>
        {name} <br/>
      {followerCount} followers<br/>
      {time}m
      </div>
      

    </div>
    <div style = {{marginTop:10,marginLeft : 20, marginRight : 20}}>
        {description}
      </div>
  </div>
}



export default App ;