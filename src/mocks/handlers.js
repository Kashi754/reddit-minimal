import { rest } from "msw";
import { homePageMocks } from "./homePageMocks";
import { searchPagePosts } from "./searchPageMocks";
import { subredditsPageMocks } from "./subredditsPageMocks";
import { usersPageMocks } from "./usersPageMocks";
import { userPageMocks } from "./userPageMocks";
import { subredditPageMocks } from "./subredditPageMocks";
import { postPageMocks } from "./postPageMocks";

export const handlers = [
    //Home Page Request URL
    rest.get('https://www.reddit.com/r/popular/hot.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const after = params.get('after');
        const before = params.get('before');
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(before || !paramKeys.length) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(homePageMocks.homePage1)
            )
        }

        if(after) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(homePageMocks.homePage2)
            )
        }

        else {
            return res(ctx.status(400))
        }
        
    }),

    //Subreddits Page Request URL
    rest.get('https://www.reddit.com/subreddits.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const after = params.get('after');
        const before = params.get('before');
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(before || !paramKeys.length) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(subredditsPageMocks.subredditsPageFeed1)
            )
        }

        if(after) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(subredditsPageMocks.subredditsPageFeed2)
            )
        }

        else {
            return res(ctx.status(400))
        }
    }),

    //Subreddit Page Request URL
    rest.get('https://www.reddit.com/r/testSubreddit/hot.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const after = params.get('after');
        const before = params.get('before');
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(before || !paramKeys.length) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(subredditPageMocks.subredditPage1)
            )
        }

        if(after) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(subredditPageMocks.subredditPage2)
            )
        }

        else {
            return res(ctx.status(400))
        }
    }),

    //Users Page Request URL
    rest.get('https://www.reddit.com/users.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const after = params.get('after');
        const before = params.get('before');
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(before || !paramKeys.length) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(usersPageMocks.usersPageFeed1)
            )
        }

        if(after) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(usersPageMocks.usersPageFeed2)
            )
        }

        else {
            return res(ctx.status(400))
        }
    }),

    //User Page Request URL
    rest.get('https://www.reddit.com/user/testUser1/submitted/.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const after = params.get('after');
        const before = params.get('before');
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(before || !paramKeys.length) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(userPageMocks.userPage1)
            )
        }

        if(after) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(userPageMocks.userPage2)
            )
        }

        else {
            return res(ctx.status(400))
        }
    }),

    //Search Page Request URL
    rest.get('https://www.reddit.com/search/.json', (req, res, ctx) => {
        const params = req.url.searchParams;
        const q = params.get('q');
        const type = params.get('type');
        const paramKeys = Array.from(params.keys());

        if(q === 'test' && !type) {
            return res(
                ctx.delay(250),
                ctx.status(200),
                ctx.json(searchPagePosts)
            )
        }
    }),

    //Post Page Request URL
    rest.get('https://www.reddit.com/r/testSubreddit/comments/testPost/.json', (req, res, ctx) => {
        return res(
            ctx.delay(250),
            ctx.status(200),
            ctx.json(postPageMocks)
        )
    })
]