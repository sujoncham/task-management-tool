import React, { useEffect, useState } from 'react';

const Blog = () => {
    const [blogs, setBlogs] = useState([{"id": 1, "name": "sujon"}, {"id": 2, "name": "Mamun"}]);
    console.log(blogs)
    useEffect(()=>{
        const getData = async()=>{
           await fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBlogs(data)
        })
        .catch(err=>console.log(err))
        }
        getData()
    }, [])
    return (
        <div>
            
        </div>
    );
};

export default Blog;