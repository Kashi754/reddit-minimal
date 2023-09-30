
export function determineParams(pathArray, query) {
    const urlEncodedQuery = encodeURIComponent(query);
    let params = {q: urlEncodedQuery};
    if(pathArray[1] === 'subreddits' && !pathArray[3]) {
        if(pathArray[2] && pathArray[2] !== 'search') {
            //search inside a subreddit
            params.restrict_sr = 1;
        }
        //search for a subreddit
        else {
            params.type = 'sr';
        }
    }

    if(pathArray[1] === 'users') {
        //search for a user
        params.type = 'user'
    }

    return params;
}