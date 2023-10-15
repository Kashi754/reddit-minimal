const post = {
    subreddit_name_prefixed: 'r/testSubredditName',
    subreddit: 'testSubredditName',
    author: 'testPostAuthor',
    num_comments: 10,
    created_utc: 1696700443,
    score: 20
}

const comments = [
    {data: {
        author: 'testAuthor1', 
        body_html: 'here is some html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor', body_html: 'here is a reply'}}, {data: {}}]
            }
        }
    }},
    {data: {
        author: 'testAuthor2', 
        body_html: 'here is more html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor2', body_html: 'here is another reply'}}, {data: {}}]
            }
        }
    }},
    {data: {
        author: 'testAuthor3', 
        body_html: 'here is even more html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor3', body_html: 'here is a third reply'}}, {data: {}}]
            }
        }
    }}
];

export const postPageMocks = [
    {data: {children: [{data: post}]}},
    {data: {children: comments}}
]