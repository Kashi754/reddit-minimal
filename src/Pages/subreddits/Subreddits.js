import React, { useEffect } from "react";
import { loadSubredditsFeed } from "./subredditsSlice.js";
import { SubredditListing } from "../../Components/subredditListing/SubredditListing.js";
import { selectSubredditsFeed } from "./subredditsSlice.js";
import { useDispatch, useSelector } from "react-redux";

export function Subreddits() {
    const feed = useSelector(selectSubredditsFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubredditsFeed(null, null));
    }, [dispatch])

    return (
        <SubredditListing feed={feed} />
    );
}