import React, { useEffect } from "react";
import { loadPost } from "./postSlice.js";
import { selectPost, selectComments } from "./postSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostHero } from "../../Components/postHero/PostHero.js";

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
        <PostHero post={selectedPost} />
    );
}