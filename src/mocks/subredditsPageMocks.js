export const subredditsPageMocks = {
    subredditsPageFeed1: {data: {after: 123, children: [
        {data: {
            display_name: 'testSubreddit1.1',
            name: 'Test Subreddit1.1!',
            display_name_prefixed: 'r/testSubreddit1.1',
            subscribers: 1000
        }},
        {data: {
            display_name: 'testSubreddit2.1',
            name: 'Test Subreddit2.1!',
            display_name_prefixed: 'r/testSubreddit2.1',
            subscribers: 2000
        }},
        {data: {
            display_name: 'testSubreddit3',
            name: 'Test Subreddit3!',
            display_name_prefixed: 'r/testSubreddit3',
            subscribers: 3000
        }}
    ]}},
    subredditsPageFeed2: {data: {before: 321, children: [
        {data: {
            display_name: 'testSubreddit1.2',
            name: 'Test Subreddit1.2!',
            display_name_prefixed: 'r/testSubreddit1.2',
            subscribers: 1000
        }},
        {data: {
            display_name: 'testSubreddit2.2',
            name: 'Test Subreddit2.2!',
            display_name_prefixed: 'r/testSubreddit2.2',
            subscribers: 2000
        }},
        {data: {
            display_name: 'testSubreddit3.2',
            name: 'Test Subreddit3.2!',
            display_name_prefixed: 'r/testSubreddit3.2',
            subscribers: 3000
        }}
    ]}},
}
