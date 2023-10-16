import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { SubredditListing } from "../../Components/subredditListing/SubredditListing.js";
import { decrementCount, incrementCount, loadSubredditsFeed, selectCount, selectError, selectIsError, selectIsLoading, selectNextPage, selectPrevPage, selectSubredditsFeed } from "./subredditsSlice.js";
import { DotPulse } from "@uiball/loaders";

export function Subreddits() {
    const feed = useSelector(selectSubredditsFeed);
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
            dispatch(loadSubredditsFeed(searchParams));
        } else {
            dispatch(loadSubredditsFeed(''));
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
            <SubredditListing feed={feed} />
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