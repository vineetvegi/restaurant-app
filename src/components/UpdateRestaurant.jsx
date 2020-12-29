import React, { useState, useContext, useEffect } from 'react'
import { useParams, useHistory} from "react-router-dom";
import { RestaurantsContext } from '../context/RestaurantsContext';
import Request from '../requests/Request';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    let history = useHistory()
    const {restaurant} = useContext(RestaurantsContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await Request.get(`/${id}`);

            setName(response.data.data.restaurant.res_name);
            setLocation(response.data.data.restaurant.res_location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedRestaurant = await Request.put(`/${id}`, {
            res_name: name,
            res_location: location,
            price_range: priceRange
        })
        history.push("/");
    };

    return(
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>

    );
};

export default UpdateRestaurant;
