const express = require('express');
const tagsRouter = express.Router();


const { getAllPosts, getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
  try {

    const allPostsWithTag = await getPostsByTagName(tagName);

    const userPosts = allPostsWithTag.filter(post => {
      return post.active && (req.user && post.author.id === req.user.id);
    });

    res.send({userPosts})

  } catch ({ name, message }) {
    next({name,message})
  }
});

tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

module.exports = tagsRouter;