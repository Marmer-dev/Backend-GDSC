// postHandler.js
const { Router } = require('express');
const { getRandomInt } = require('../utils/randomNumber.js');
const posts = [];

/**
 * 
 * @param {Router} router 
 */
function setupPostHandler(router) {

    router.get('/', (req, res) => {
        res.json({
            "data": posts
          })
      })
  
  
      router.post('/', (req, res) => {
        posts.push({
            "id": getRandomInt(9999999999999999),
            "title": req.body.title,
            "description": req.body.description
        })
    
        res.json({
            "message": "success"
        })
    })
    
    router.put('/:postId', validatePostData, (req, res) => {
        const postId = req.params.postId;
    
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == postId) {
                posts[i].title = req.body.title;
                posts[i].description = req.body.description;
    
                res.json({
                    message: "success",
                    updatedPost: posts[i]
                });
                return;
            }
        }
    
        res.json({
            message: `Post with id ${postId} is not found`
        });
    });
    
    router.delete('/:user', (req, res) => {
        const postId = req.params.postId;

        for(let i = 0; i < posts.length; i++) {
            if(posts[i].id == postId) {
                posts.splice(i, 1)
    
                res.end(JSON.stringify({
                    status: true,
                    message: "berhasil delete data"
                }))
                return 
            }
        }
    
        res.json({
            "message": `post with id ${postId} is not found`
        })
    })

    return router;
}

function validatePostData(req, res, next) {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    next();
}

module.exports = { setupPostHandler };
