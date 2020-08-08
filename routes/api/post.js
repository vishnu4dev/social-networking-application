const Router = require('express');
const router = Router();

import {validate, RequestValidation} from '../../middleware/validator';
import Post from '../controller/post.controller';
import Auth from '../../middleware/auth';

const PostController = new Post();



router.post('/',Auth,validate().postFeed,RequestValidation,PostController.userPost);

router.get('/fetch/:id',Auth,PostController.getUserPost);

router.delete('/:id/:post_id',Auth,PostController.deleteUserPost);

router.put('/like/:post_id',Auth,PostController.likeOrUnLike);

router.put('/comment/:post_id',Auth,PostController.addComment);

router.delete('/comment/:post_id/:comment_id',Auth,PostController.deleteComment)
module.exports = router;