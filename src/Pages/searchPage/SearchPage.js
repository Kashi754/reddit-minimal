import { useLocation, useSearchParams } from "react-router-dom";
import { Listing } from "../../Components/listing/Listing";
import { PageChangeButtons } from "../../Components/pageChangeButtons/PageChangeButtons";
import { SubredditListing } from "../../Components/subredditListing/SubredditListing";
import { decrementCount, incrementCount, loadSearchFeed, selectCount, selectError, selectIsError, selectIsLoading, selectNextPage, selectPrevPage, selectSearchFeed } from "./searchPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { UserListing } from "../../Components/userListing/UserListing";
import { DotPulse } from "@uiball/loaders";

function ListingForSearch({ route, subreddit, feed }) {
    if(route === 'subreddits') {
        if(subreddit) {
            return <Listing feed={feed} />
        }
        return <SubredditListing feed={feed} />
    } else if(route === 'users') {
        return <UserListing feed={feed} />
    }
    return <Listing feed={feed} />
}

export function SearchPage() {
    const feed = useSelector(selectSearchFeed);
    const nextPage = useSelector(selectNextPage);
    const prevPage = useSelector(selectPrevPage);
    const count = useSelector(selectCount);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const route = pathArray[1];
    const subreddit = route === 'subreddits' && pathArray[2] !== 'search'?  
        pathArray[2] : null;
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(loadSearchFeed({subreddit: subreddit, params: searchParams}));     
    },[dispatch, searchParams, subreddit]);

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
            <ListingForSearch 
                route={route} 
                subreddit={subreddit} 
                feed={feed}
            />
            <PageChangeButtons 
                setSearchParams={setSearchParams}
                count={count}
                increment={incrementCount}
                decrement={decrementCount}
                before={prevPage} 
                after={nextPage}
            />
        </>
    )
}