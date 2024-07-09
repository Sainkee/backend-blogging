const express = require("express");
const Post = require("../../model/post/post.model");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/posts", (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newPost = post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
