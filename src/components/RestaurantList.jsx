import React, {useEffect, useContext} from 'react';
import Request from '../requests/Request';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';
const RestaurantList = (props) => {
    const {restaurant, setRestaurants} = useContext(RestaurantsContext)
    let history = useHistory()
    useEffect(() => {
        const getData = async () => {
            try {
            const response = await Request.get("/");
            setRestaurants(response.data.data.restaurant)
            // setRestaurants(response.data.data.restaurants);
        } catch (err) {
            console.error(err);
        };
        }
        getData();
    },[]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
           const response = await Request.delete(`/${id}`);
           setRestaurants(restaurant.filter(res => {
               return res.res_id !== id
           })
           )}
         catch (err) {
             console.error(err);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    };

    const handleSelectedRestaurant = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (rest) => {
        if (!rest.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (
        <>
        <StarRating rating={rest.res_id} />
        <span className="text-warning ml-1">({rest.count})</span>
        </>
        );
    };

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurant && restaurant.map((rest) => {
                        return (
                            <tr onClick={() => handleSelectedRestaurant(rest.res_id)} key={rest.res_id}>
                            <td>{rest.res_name}</td>
                            <td>{rest.res_location}</td>
                            <td>{"$".repeat(rest.price_range)}</td>
                            <td>{renderRating(rest)}</td>
                            <td><button onClick={(e) => handleUpdate(e, rest.res_id)} className="btn btn-warning btn-sm">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, rest.res_id)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
