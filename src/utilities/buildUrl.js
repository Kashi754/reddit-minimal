export function buildUrl(url, page) {
    const {before, after} = page;

    const baseOptions = {
        count: 25,
    }
    let options;
    
    if(before){
        options = {
            ...baseOptions,
            before: before
        };
    } else if(after) {
        options = {
            ...baseOptions,
            after: after
        };
    } else {
        options = {};
    }

    const params = new URLSearchParams(options);
    const fullUrl = url + params;
    
    return fullUrl;
}