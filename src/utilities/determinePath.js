export function determinePath(location) {
    const pathArray = location.pathname.split('/');
    //search inside home
    if(!pathArray[1]) {
        return '/search';
    }
    if(pathArray[1] === 'subreddits' && pathArray[2] && pathArray[2] !== 'search') {  
        if(pathArray[3] && pathArray[3] !== 'search') {
            //search home if inside post
            return '/search';
        }
        //search inside subreddit
        if(pathArray.indexOf('search') === -1) {
            return location.pathname + '/search'
        }
    }
    if(pathArray[1] === 'users' && pathArray[2] && pathArray[2] !== 'search') {
        return `/${pathArray[1]}/search`;
    }
    //search for anything else
    if(pathArray.indexOf('search') === -1) {
        return location.pathname + '/search';
    }
    return location.pathname;
}