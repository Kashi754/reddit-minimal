import React, { useEffect } from "react";
import { loadPost } from "./postSlice";
import { selectPost, selectComments } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostHero } from "../../Components/postHero/PostHero";
import { CommentList } from "../../Components/commentList/CommentList";
import './Post.css';

export function Post() {
    const selectedPost = useSelector(selectPost);
    const comments = useSelector(selectComments);
    const {subreddit, post} = useParams();
    const postUrl = `${subreddit}/comments/${post}`;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadPost(postUrl));
    }, [postUrl, dispatch])

    return (
        <div className='post'>
            <PostHero post={selectedPost} />
            <CommentList comments={comments} />
        </div>
    );
}