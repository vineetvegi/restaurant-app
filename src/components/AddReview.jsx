import React, { useState } from 'react'
import Request from '../requests/Request';
import { useParams, useHistory, useLocation } from "react-router-dom";

const AddReview = () => {
    const {id} = useParams();
    const location = useLocation()
    const history = useHistory()
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("Rating")

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await Request.post(`/${id}/addReview`, {
            name,
            content,
            rating,
        });
        history.push("/");
        history.push(location.pathname)
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} id="rating" className="custom-select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Review</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} id="content" className="form-control"></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;
