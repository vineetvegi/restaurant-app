import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {

    const [restaurant, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    const addRestaurant = (res) => {
        setRestaurants([...restaurant, res]);
    };
    return (
        <RestaurantsContext.Provider value={{restaurant, setRestaurants, addRestaurant, selectedRestaurant, setSelectedRestaurant }}>
            {props.children}
        </RestaurantsContext.Provider>
    );
};