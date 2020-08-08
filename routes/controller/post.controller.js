import PostModel from '../../model/Post.model';
import ProfileModel from '../../model/Profile.model';
import UserModel from '../../model/User.model';


export default class Post{

    async userPost(req,res){
        try {
            const {title,text,date} = req.body;
            let user = await UserModel.find({id:req.user.id}).select('--password');
            if(user){
                const postContent = {
                    user:req.user.id,
                    name:user.name,
                    avatar:user.avatar,
                    text,date,title
                }
                const post = new PostModel(postContent);
                await post.save();
                res.status(200).send(post)
            }
            else{
                res.status(500).send("Access denied")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Errr in  dbview color ");  
            }   
        }

    async getUserPost(req,res){
        try {
            const {id} = req.params;
            const listOfFeeds = await PostModel.find({user:id}).sort({date:-1});
            if(listOfFeeds){
                res.status(200).send(listOfFeeds);
            }
            res.status(404).send("No Post Yet");

        } catch (error) {
            console.log("Error in gettting user post");
        }
    }


    async deleteUserPost(req,res){
        try {
            const {id,post_id} = req.params;
            const post = await PostModel.find({user:id ,_id:post_id});
            if(post && id === req.user.id){
                const deletePost = await PostModel.deleteOne({user:id,_id:post_id});
                if(deletePost){
                    res.status(200).send("Post removed");
                }
                res.status(404).send("No Post Yet");
                return;
            }
            else{
                res.status(403).send("Access denied");
                return;
            }

        } catch (error) {
            console.log("Error in deleting user post");
        }
    }


    async likeOrUnLike(req,res){
        try {
         const {post_id} = req.params;
         const post = await PostModel.findById(post_id);
         if(post.likes.filter(_item => _item.user.toString() === req.user.id ).length > 0){     
            post.likes.splice({user:req.user.id});
            await post.save();
            res.status(200).send(post);
         }   
        else {
            post.likes.unshift({user:req.user.id});
            await post.save();
            res.status(200).send(post);
        }
        } catch (error) {
            res.status(500).send("Server Error in with Like API")
        }
    }

    async addComment (req,res){
        try {
            const {comment} = req.body;
            const user = await UserModel.findById(req.user.id).select('--password');
            if(user){
            const post = await PostModel.findById(req.params.post_id);
            if(post){
                const commentObject = {user: req.user.id, name: user.name, avatar: user.avatar,text:comment};
                post.comment.unshift(commentObject);
                await post.save();
                res.status(200).send(post)
            }else{
                res.status(404).send("Invalid post id");
            }
        }else res.status(403).send("No such user");
        } catch (error) {
            res.status(500).send("Server Error in adding comment")
        }
    }

    async deleteComment(req,res){
        try {
            const {post_id,comment_id} = req.params;
            const post = await PostModel.findById(post_id)
            if(post){
                if(post.comment.filter(_item => _item._id.toString() === comment_id && _item.user.toString() === req.user.id).length > 0 ){
                    post.comment.splice({user:req.user.id})
                    await post.save();
                    res.status(200).send(post)
                }
                res.status(404).send("Invalid comment id")
            }
        } catch (error) {
            if(error.kind === 'ObjectId'){
                res.status(404).send("Comment not found")
            }
            res.status(500).send("Server error unable to delete req")
        }
    }
    }
