const router = require("express").Router();
const Comment = require("../models/comment");

//post comment
router.post("/",async(req,res)=>{
    const newcomment = new Comment(req.body);
    try {
        await newcomment.save();

        res.status(200).json('Comment saved successfully');
    } catch (error) {
        res.status(500).json(error);
    }
})

 //get comment
 router.get("/:id",async(req,res)=>{
    try {
        const comments = await Comment.find({ postId: req.params.id });
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
})



// delete comment
router.delete("/:id",async(req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.deleteOne()
        console.log("1");
        res.status(200).json('comment deleted successfully');
    } catch (error) {
        console.log("2");
        res.status(500).json(error)
    }
})
module.exports = router;
