import React, { useEffect } from "react";
import { loadHomeFeed } from "./homeSlice.js";
import { Listing } from "../../Components/listing/Listing.js";
import { selectHomeFeed } from "./homeSlice.js";
import { useDispatch, useSelector } from "react-redux";

export function Home() {
    const feed = useSelector(selectHomeFeed);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadHomeFeed(null, null));
    }, [dispatch])

    return (
        <Listing feed={feed} />
    );
}