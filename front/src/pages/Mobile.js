import React, { useEffect, useState } from "react";
import axios from "axios";

function Mobile() {
    const [mobile, setMobile] = useState({ name: "", description: "", brand_id: "", price: "" , location: "" })
    const [show,setShow] = useState(false)
    const [element,setElement] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products");
                const MobileNames = response.data.data.map((item) => (<div><h4>{item.name}</h4><img src={`image/mobile/${item.location}`}/></div>));
                setElement(MobileNames);
                setShow(response.data.data.length > 0);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); // Call the async function
    }, [mobile]);
    function handleChange(e) {
        const { name, value, files } = e.target

        setMobile(prev => ({
            ...prev,
            [name]: files ? files[0].name : value, // Store file name if file is selected
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (
            mobile.name.trim() !== "" &&
            mobile.description.trim() !== "" &&
            mobile.brand_id.trim() !== "" &&
            mobile.price.trim() !== "" &&
            mobile.location !== ""
        ) {
            try {
                const response = await axios.post("http://localhost:8080/createProduct",mobile);
                setMobile({ name: "", description: "", brand_id: "", price: "", location: "" });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    }
    

    return (
        <div className="container" style={{ width: '80%', height: '500px' }}>
        <form className="form row d-flex flex-column" onSubmit={handleSubmit}>
            <div className="col">
                <input type="text" name="name" value={mobile.name} className="form-control" placeholder="Enter mobile name" onChange={handleChange} />
            </div>
            <div className="col">
                <input type="text" name="description" value={mobile.description} className="form-control" placeholder="Enter mobile description" onChange={handleChange} />
            </div>
            <div className="col">
                <input type="number" name="brand_id" value={mobile.brand_id} className="form-control" placeholder="Enter mobile brand id" onChange={handleChange} />
            </div>
            <div className="col">
                <input type="number" name="price" value={mobile.price} className="form-control" placeholder="Enter mobile price" onChange={handleChange} />
            </div>
            <div className="col">
                <input type="file" name="location" className="form-control-file" onChange={handleChange} />
            </div>
            <div className="col">
                <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
        </form>
        {show ? (
        <>
          {element.map((mobile, index) => (
            <h1 key={index}>{mobile}</h1>
          ))}
        </>
      ) : (
        <h1>No mobiles found</h1>
      )}
    </div>
    
    );
}

export default Mobile;
