import React, { useEffect } from "react";
import { loadSubredditFeed } from "./subredditSlice.js";
import { Listing } from "../../Components/listing/Listing.js";
import { selectSubredditFeed } from "./subredditSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function Subreddit() {
    const { subreddit } = useParams();
    const feed = useSelector(selectSubredditFeed);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSubredditFeed(subreddit, null, null));
    }, [subreddit, dispatch])

    return (
        <Listing feed={feed} />
    );
}