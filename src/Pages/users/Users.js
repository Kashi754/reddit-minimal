import React, { useEffect } from "react";
import { decrementCount, incrementCount, loadUsersFeed, selectCount, selectError, selectIsError, selectIsLoading } from "./usersSlice.js";
import { UserListing } from "../../Components/userListing/UserListing.js";
import { selectUsersFeed } from "./usersSlice.js";
import { selectPrevPage } from "./usersSlice.js";
import { selectNextPage } from "./usersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { useSearchParams } from "react-router-dom";
import { DotPulse } from "@uiball/loaders";

export function Users() {
    const feed = useSelector(selectUsersFeed);
    const nextPage = useSelector(selectNextPage);
    const prevPage = useSelector(selectPrevPage);
    const count = useSelector(selectCount);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const error = useSelector(selectError);
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