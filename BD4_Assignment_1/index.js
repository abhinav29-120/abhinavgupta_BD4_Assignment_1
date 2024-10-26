let express = require('express');
let app = express();
PORT = 3000;

let cors = require('express');
app.use(cors());

let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './BD4_Assignment_1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Get All Restaurants
async function fetchRestaurants(){
    let query = "SELECT * FROM restaurants";
    let response = await db.all(query,[])
    return {restaurants: response};
};
app.get("/restaurants", async (req,res)=>{
    try{
        let result = await fetchRestaurants();
        if (result.restaurants.length === undefined || result.restaurants.length === null || result.restaurants.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 2: Get Restaurant by ID
async function fetchRestaurantsById(Val){
    let query = "SELECT * FROM restaurants WHERE id =?";
    let response = await db.all(query,[Val]);
    return {restaurants: response};
};
app.get("/restaurants/details/:id", async (req,res)=>{
    let Vid = parseInt(req.params.id);
    try{
        let result = await fetchRestaurantsById(Vid);
        if (result.restaurants.length === undefined || result.restaurants.length === null || result.restaurants.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 3: Get Restaurants by Cuisine
async function fetchRestaurantsByCuisine(Vcuisine){
    let query = "SELECT * FROM restaurants WHERE cuisine =?";
    let response = await db.all(query,[Vcuisine]);
    return {restaurants: response};
};
app.get("/restaurants/cuisine/:cuisine", async (req,res)=>{
    let Vcuisine=req.params.cuisine;
    try{
        let result = await fetchRestaurantsByCuisine(Vcuisine);
        if (result.restaurants.length === undefined || result.restaurants.length === null || result.restaurants.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 4: Get Restaurants by Filter
async function fetchRestaurantsByFilter(Vveg,Voutdoor,Vluxury){
    let query = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
    let response = await db.all(query,[Vveg,Voutdoor,Vluxury]);
    return {restaurants: response};
};
app.get("/restaurants/filter", async (req,res)=>{
    let Vveg=req.query.isVeg;
    let Voutdoor=req.query.hasOutdoorSeating;
    let Vluxury = req.query.isLuxury;
    try{
        let result = await fetchRestaurantsByFilter(Vveg,Voutdoor,Vluxury);
        if (result.restaurants.length === undefined || result.restaurants.length === null || result.restaurants.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 5: Get Restaurants Sorted by Rating
async function fetchRestaurantsByRating(){
    let query = "SELECT * FROM restaurants ORDER BY rating DESC";
    let response = await db.all(query,[]);
    return {restaurants: response};
};
app.get("/restaurants/sort-by-rating", async (req,res)=>{
    try{
        let result = await fetchRestaurantsByRating();
        if (result.restaurants.length === undefined || result.restaurants.length === null || result.restaurants.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 6: Get All Dishes
async function fetchRestaurantsByDishes(){
    let query = "SELECT * FROM dishes";
    let response = await db.all(query,[]);
    return {dishes: response};
};
app.get("/dishes", async (req,res)=>{
    try{
        let result = await fetchRestaurantsByDishes();
        if (result.dishes.length === undefined || result.dishes.length === null || result.dishes.length === 0) {
            return res.status(404).json({ message: ' thing Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 7: Get Dish by ID
async function fetchDishesById(Val) {
    let query = "SELECT * FROM dishes WHERE id = ?";    
    let response = await db.all(query,[Val]);
    return {dishes: response};
};
app.get("/dishes/details/:id", async (req,res)=>{
    let Val = parseInt(req.params.id);
    try{
        let result = await fetchDishesById(Val);
        if (result.dishes.length === undefined || result.dishes.length === null || result.dishes.length === 0) {
            return res.status(404).json({ message: ' dishes Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 8: Get Dishes by Filter
async function fetchDishesByFilter(Vveg){
    let query = "SELECT * FROM dishes WHERE isVeg = ?";
    let response = await db.all(query,[Vveg]);
    return {dishes: response};
};
app.get("/dishes/filter",async (req,res)=>{
    let Vveg = req.query.isVeg;
    try{
        let result = await fetchDishesByFilter(Vveg);
        if (result.dishes.length === undefined || result.dishes.length === null || result.dishes.length === 0) {
            return res.status(404).json({ message: ' dishes Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

//Exercise 9: Get Dishes Sorted by Price
async function fetchDishesByPrice(){
    let query = "SELECT * FROM dishes ORDER BY price";
    let response = await db.all(query,[]);
    return {dishes: response};
};
app.get("/dishes/sort-by-price", async (req,res)=>{
    try{
        let result = await fetchDishesByPrice();
        if (result.dishes.length === undefined || result.dishes.length === null || result.dishes.length === 0) {
            return res.status(404).json({ message: ' dishes Found.' });
        }
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json({error: error.message});
    };
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });