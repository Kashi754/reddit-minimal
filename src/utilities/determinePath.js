export function determinePath(location, params) {
    const pathArray = location.pathname.split('/');
    //search inside home
    if(!pathArray[1]) {
        return '/search';
    }
    if(pathArray[1] === 'subreddits') {
        if(pathArray[2] && pathArray[2] !== 'search') {
            if(pathArray[3] && pathArray[3] !== 'search') {
                //search home if inside post
                return '/search';
            }
            //search inside subreddit
            if(pathArray.indexOf('search') === -1) {
                return location.pathname + '/search'
            }
            return pathArray.slice(0, -1).join('/')  + '/search';
        }
        //search for a subreddit
        if(pathArray.indexOf('search') === -1) {
            return location.pathname + '/search';
        }
        return pathArray.slice(0, -1).join('/')  + '/search';
    }
    //search for anything else
    if(pathArray.indexOf('search') === -1) {
        return location.pathname + '/search';
    }
    return pathArray.slice(0, -1).join('/')  + '/search';
}