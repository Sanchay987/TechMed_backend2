const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePostToDb = await newPost.save();
    res.status(200).json(savePostToDb);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {res.status(401).json("you are using wrong data!");}
        
    await Post.findByIdAndUpdate(req.params.id,{ $set: req.body,},{ new: true });
        res.status(200).json(updated);

  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
     
    await post.deleteOne();
        
    res.status(200).json("deleted");
  } catch (err) {
    
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS by query username and categories
router.get("/", async (req, res) => {
  const username = req.query.user;
  const categorieName = req.query.categorie;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username:username});
    } else if (categorieName) {
      posts = await Post.find({categories: {$in: [categorieName],},});
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

  
