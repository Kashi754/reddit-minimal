import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentList } from "../../Components/commentList/CommentList";
import { PostHero } from "../../Components/postHero/PostHero";
import './Post.css';
import { loadPost, selectComments, selectError, selectIsError, selectIsLoading, selectPost } from "./postSlice";
import { DotPulse } from "@uiball/loaders";

export function Post() {
    const selectedPost = useSelector(selectPost);
    const comments = useSelector(selectComments);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const error = useSelector(selectError);
    const {subreddit, post} = useParams();
    const postUrl = `${subreddit}/comments/${post}`;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadPost(postUrl));
    }, [postUrl, dispatch]);

    if(isLoading) {
        return (
            <div className="loader">
                {<DotPulse 
                    size={300}
                    speed={1}
                    color='#ffffff'
                />}
            </div>
        )
    }

    if(isError) {
        return (
            <div className="error">
                <p role='alert'>{error}</p>
            </div>
        )
    }

    return (
        <div className='post'>
            <PostHero post={selectedPost} />
            <CommentList comments={comments} />
        </div>
    );
}