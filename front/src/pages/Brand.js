import axios from "axios";
import React, { useEffect, useState } from "react";

function Brand() {
    const [brand, setBrand] = useState({ name: "", location: "" })
    const [show,setShow] = useState(false)
    const [element,setElement] = useState([])
    useEffect(()=>{
                axios.get("http://localhost:8080/brand")
                .then(response => {
                    const brandNames = response.data.map((item) => (<div><img src={`image/logos/${item.location}`} height="20px" width="20px"/><h3>{item.name}</h3></div>))
                    setElement(brandNames)
                    setShow(response.data.length > 0)
                })
                .catch(error => {
                    console.error(error)
                })
    },[brand])
    function handleChange(e) {
        const { name, value, files } = e.target

        setBrand(prev => ({
            ...prev,
            [name]: files ? files[0].name : value, // Store file name if file is selected
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(brand.name.trim() !== "" && brand.location !== ""){
            axios.post("http://localhost:8080/brand",brand)
            .then(response => {
                setBrand({name: "", location: ""});
                console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
        }
    }

    return (
        <div className="container" style={{ width: '80%', height: '500px' }}>
            <form className="form row d-flex flex-column" onSubmit={handleSubmit}>
                <input type="text" name="name" value={brand.name} placeholder="Enter brand name" onChange={handleChange} />
                <input type="file" name="location" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
            {show ? (
        <>
          {element.map((brand, index) => (
            <h1 key={index}>{brand}</h1>
          ))}
        </>
      ) : (
        <h1>No brands found</h1>
      )}
        </div>
    );
}

export default Brand;
