const { addToLiked, getLikedMovies, removeFromLikeMovies } = require("../controllers/userController");

const router=require("express").Router();

router.post("/add",addToLiked);
router.get("/liked/:email",getLikedMovies);
router.put("/delete",removeFromLikeMovies);
module.exports=router;