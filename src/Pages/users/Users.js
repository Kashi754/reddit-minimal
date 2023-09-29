import React, { useEffect } from "react";
import { decrementCount, incrementCount, loadUsersFeed, selectCount } from "./usersSlice.js";
import { UserListing } from "../../Components/userListing/UserListing.js";
import { selectUsersFeed } from "./usersSlice.js";
import { selectPrevPage } from "./usersSlice.js";
import { selectNextPage } from "./usersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { useSearchParams } from "react-router-dom";

export function Users() {
    const feed = useSelector(selectUsersFeed);
    const nextPage = useSelector(selectNextPage);
    const prevPage = useSelector(selectPrevPage);
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.size !== 0) {
            dispatch(loadUsersFeed(searchParams));
        } else {
            dispatch(loadUsersFeed(''));
        }
    }, [dispatch, searchParams])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [feed]);
    
    return (
        <>
            <PageChangeButtons 
                setSearchParams={setSearchParams}
                count={count}
                increment={incrementCount}
                decrement={decrementCount}
                before={prevPage}
                after={nextPage}
            />
            <UserListing feed={feed} />
            <PageChangeButtons 
                    setSearchParams={setSearchParams}
                    count={count}
                    increment={incrementCount}
                    decrement={decrementCount}
                    before={prevPage} 
                    after={nextPage}
            />
        </>
    );
}