import React from 'react'
import { useState,useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const ImageApi=()=> {
    const [query,setQuery]=useState("");
    const [count,setCount]=useState(0);
    const [Image, setImage] = useState([]);
    const [totaldata, settotaldata] = useState([]);
    const [value,setValue]=useState("");
    const [visible,setVisible]=useState(8);
    const [page,setPage]=useState(1);

    useEffect(() => {
        getAPidata();
        //https://corona.lmao.ninja/v3/covid-19/countries
    
      },[]);

      const getAPidata=()=>{
          
        fetch(` https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=_MQj-Zdf9Ao2RKPVsNFmYsevxfVkSP0eYRkEE3PW6wM`
        )
        .then(response => {
            return response.json();
        })
        .then((data)=>{
           
            
           console.log(data)
           setCount(data.total)
           setImage(data.results)
                settotaldata((olddata)=>{
                if(query && page==1){
                    return  data.results
                }else if(query){
                    return [...olddata,...data.results]
                }
                else{
                    return [...olddata,...data.results]
                }
           })
           console.log(totaldata.length)
       
          
        })
        .catch(err => {
            console.error(err);
        });
      }

      const ChangeHandler=(e)=>{
        //console.log(e.target.value);
        setValue(e.target.value);
        
      }

      const SubmitHandler=(e)=>{
          //console.log("Submit")
        setQuery(value);
        getAPidata();
        
      }

      const getMore=()=>{
          console.log(page);
          
          setVisible((prev)=>prev+8);
            setPage((prev)=>prev+1);
            getAPidata();
            
      }
    return (
        <div>
           <div className="container">
           <div className="mt-5 row d-flex">
          
            <div className="col-md-10">
                <div class="mb-3 shadow-sm">
                    <input type="text" class="form-control p-4" id="search_textbox" placeholder="Search for photos" value={(totaldata.length>0)?"":null}  onChange={ChangeHandler}/>
                </div>
            </div>
            <div className="col-md-1" >
                <div class="mb-3">
                    <button type="submit" class="btn btn-lg btn-dark" onClick={SubmitHandler}><i class="bi bi-search text-white bg-dark" ></i></button>
                </div>
            </div>
          
               
           </div>
           <div>
                  
                      
                        <h4>{query}</h4>
                        {(totaldata.length>0)?<p className="text-muted">{count} Images has been found</p>:""}
            </div>
            <div className="row d-flex justify-content-start text-center">
               
                    
               {
                   
               
                    totaldata.slice(0,visible).map((item,index)=>(
                    <div className="col-md-3 mt-4" key={index}>
                       <img src={item.urls.full} alt={query}/>
                    </div>
                   )
                )
            }
           
               
              
               
                
            </div>
            {(totaldata.length>0)?
                <div className="text-center">
                    <button type="submit" className="btn btn-dark mt-5" onClick={getMore}>Load More</button>
               </div>
            :""}
               </div>
               
        </div>
    )
}

export default ImageApi

