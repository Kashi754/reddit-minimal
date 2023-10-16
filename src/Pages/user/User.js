import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { Listing } from "../../Components/listing/Listing.js";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { decrementCount, incrementCount, loadUserFeed, selectCount, selectError, selectIsError, selectIsLoading, selectNextPage, selectPrevPage, selectUserFeed } from "./userSlice.js";
import { DotPulse } from "@uiball/loaders";

export function User() {
    const { user } = useParams();
    const feed = useSelector(selectUserFeed);
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
            dispatch(loadUserFeed({user: user, params: searchParams}));
        } else {
            dispatch(loadUserFeed({user: user, params: ''}));
        }
    }, [user, dispatch, searchParams])

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