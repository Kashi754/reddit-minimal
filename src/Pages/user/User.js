import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { Listing } from "../../Components/listing/Listing.js";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons.js";
import { decrementCount, incrementCount, loadUserFeed, selectCount, selectNextPage, selectPrevPage, selectUserFeed } from "./userSlice.js";

export function User() {
    const { user } = useParams();
    const feed = useSelector(selectUserFeed);
    const nextPage = useSelector(selectNextPage);
    const prevPage = useSelector(selectPrevPage);
    const count = useSelector(selectCount);
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