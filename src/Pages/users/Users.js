import React, { useEffect } from "react";
import { loadUsersFeed } from "./usersSlice.js";
import { UserListing } from "../../Components/userListing/UserListing.js";
import { selectUsersFeed } from "./usersSlice.js";
import { useDispatch, useSelector } from "react-redux";

export function Users() {
    const feed = useSelector(selectUsersFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsersFeed(null, null));
    }, [dispatch])
    return (
        <UserListing feed={feed} />
    );
}