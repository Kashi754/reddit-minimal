import React, { useEffect } from "react";
import { loadUserFeed } from "./userSlice.js";
import { Listing } from "../../Components/listing/Listing.js";
import { selectUserFeed } from "./userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function User() {
    const { user } = useParams();
    const feed = useSelector(selectUserFeed);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUserFeed(user, null, null));
    }, [user, dispatch])

    return (
        <Listing feed={feed} />
    );
}