require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json())

app.get("/restaurants", async(req, res) => {
    try {
        // const queries = await db.query("SELECT * FROM restaurant");
        const ratingData = await db.query("SELECT * FROM restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on res_id = restaurant_id");

        res.json({
            status: "Success",
            queries: ratingData.rows.length,
            data: {
                restaurant: ratingData.rows
            }
        });
    } catch (err) {
        console.error(err);
    }
});

app.get('/restaurants/:id', async(req, res) => {
    try {
        const query = await db.query("SELECT * FROM restaurant left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating from reviews group by restaurant_id) reviews on res_id = restaurant_id WHERE res_id = $1", [req.params.id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id= $1", [req.params.id]);
        //Using $1 as parameterized query to avoid vulnerabilities
        res.status(200).json({
            status: "Success",
            query: query.rows.length,
            reviews: reviews.rows.length,
            data: {
                restaurant: query.rows[0],
                reviews: reviews.rows
            },
        });

    } catch (err) {
        console.error(err);
    }
});

app.post('/restaurants', async(req, res) => {
    try {
        const postQuery = await db.query("INSERT INTO restaurant(res_name, res_location, price_range) VALUES ($1, $2, $3) returning *", [req.body.res_name, req.body.res_location, req.body.price_range]);

        res.status(201).json({
            status: "Success",
            data: {
                restaurant: postQuery.rows[0]
            }
        })
    } catch (err) {
        console.error(err);
    }
});

app.put('/restaurants/:id', async(req, res) => {
    try {
        const upQuery = await db.query("UPDATE restaurant SET res_name = $1, res_location = $2, price_range = $3 WHERE res_id = $4 returning *", [req.body.res_name, req.body.res_location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "Success",
            data: {
                restaurant: upQuery.rows[0]
            }
        })
    } catch (err) {
        console.error(err);
    }
});

app.delete('/restaurants/:id', async(req, res) => {
    try {
        const delQuery = await db.query("DELETE FROM restaurant WHERE res_id = $1", [req.params.id])
        res.status(204).json({
        status: "Success"
    });
    } catch (err) {
        console.error(err);
    }
});

app.post('/restaurants/:id/addReview', async(req,res) => {
    try {
       const newReview = await db.query("INSERT INTO reviews(restaurant_id,name,content,rating) VALUES ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.content, req.body.rating]);
       res.status(201).json({
           status: 'Success',
           data: {
               review: newReview.rows[0]
           }
       })
    } catch (err) {
        console.error(err);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});