import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Listing } from "../../Components/listing/Listing.js";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { decrementCount, incrementCount, loadHomeFeed, selectCount, selectHomeFeed, selectIsLoading, selectNextPage, selectPrevPage } from "./homeSlice.js";
import { DotPulse } from "@uiball/loaders";

export function Home() {
    const feed = useSelector(selectHomeFeed);
    const nextPage = useSelector(selectNextPage);
    const prevPage = useSelector(selectPrevPage);
    const count = useSelector(selectCount);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.size !== 0) {
            dispatch(loadHomeFeed(searchParams));
        } else {
            dispatch(loadHomeFeed(''));
        }
    }, [dispatch, searchParams]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [feed]);

    if(isLoading) {
        return (
            <div className="loader">
                <DotPulse 
                    size={300}
                    speed={1}
                    color='#ffffff'
                />
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
            <Listing feed={feed} />
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