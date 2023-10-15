import { determineParams } from "./determineParams";
import { determinePath } from "./determinePath";
import { htmlDecode } from "./htmlDecode";

describe("determineParams", () => {

    it("Should return query search param with appropriate filter param for subreddits", () => {
        const input1 = {pathArray: ['','subreddits'], query: 'test-query'};
        const output1 = {q: 'test-query', type: 'sr'};

        const input2 = {pathArray: ['','subreddits', 'subreddit'], query: 'test-query'};
        const output2 = {q: 'test-query', restrict_sr: 1};

        const input3 = {pathArray: ['','subreddits', 'search'], query: 'test-query'};
        const output3 = {q: 'test-query', type: 'sr'};

        expect(determineParams(input1.pathArray, input1.query)).toEqual(output1);
        expect(determineParams(input2.pathArray, input2.query)).toEqual(output2);
        expect(determineParams(input3.pathArray, input3.query)).toEqual(output3);
    })

    it("Should return query search param with appropriate filter param for users",() => {
        const input = {pathArray: ['','users'], query: 'test-query'};
        const output = {q: 'test-query', type: 'user'};

        expect(determineParams(input.pathArray, input.query)).toEqual(output);
    })

    it("Should return just search query given any other path", () => {
        const input1 = {pathArray: ['', 'search'], query: 'test-query'};
        const output1 = {q: 'test-query'};
        
        const input2 = {pathArray: ['',''], query: 'test-query'};
        const output2 = {q: 'test-query'};

        expect(determineParams(input1.pathArray, input1.query)).toEqual(output1);
        expect(determineParams(input2.pathArray, input2.query)).toEqual(output2);
    })
})

describe("determinePath", () => {
    const location = { 
        pathname: "", 
        search: "", 
        hash: "", 
        state: null, 
        key: "abcd1234" 
    };

    it("Returns '/search' if the root location is passed", () => {
        const input = {...location, pathname: '/'};
        const output = '/search';

        expect(determinePath(input)).toEqual(output);
    })

    describe("subreddits path functionality", () => {
        it("Returns '/search' for searches paths inside of a post", () => {
            const input = {...location, pathname: '/subreddits/subreddit/1234567'};
            const output = '/search';

            expect(determinePath(input)).toEqual(output);
        })

        it("Appends '/search' to the end of the path if inside of a subreddit's listing", () => {
            const input = {...location, pathname: '/subreddits/subreddit'};
            const output = '/subreddits/subreddit/search';

            expect(determinePath(input)).toEqual(output);
        })

        it("Appends '/search' to the end of the path if inside the /subreddits path", () => {
            const input = {...location, pathname: '/subreddits'};
            const output = '/subreddits/search';

            expect(determinePath(input)).toEqual(output);
        })

        it("Returns the current path if the path already ends with '/search'", () => {
            const input1 = {...location, pathname: '/subreddits/search'};
            const output1 = '/subreddits/search';
            const input2 = {...location, pathname: '/subreddits/subreddit/search'};
            const output2 = '/subreddits/subreddit/search';

            expect(determinePath(input1)).toEqual(output1);
            expect(determinePath(input2)).toEqual(output2);
        })
    })

    describe("Users path functionality", () => {
        it("Returns '/search' for searches paths inside of a user", () => {
            const input = {...location, pathname: '/users/testUser'};
            const output = '/search';

            expect(determinePath(input)).toEqual(output);
        })

        it("Appends '/search' to the end of the path if inside the /users path", () => {
            const input = {...location, pathname: '/users'};
            const output = '/users/search';

            expect(determinePath(input)).toEqual(output);
        })

        it("Returns the current path if the path already ends with '/search'", () => {
            const input = {...location, pathname: '/users/search'};
            const output = '/users/search';

            expect(determinePath(input)).toEqual(output);
        })
    })
})

describe("htmlDecode", () => {
    it("Returns html of a given html encoded string", () => {
        const input = "&lt;p&gt;A paragraph a &lt;u&gt;day&lt;/u&gt;, keeps the &lt;u&gt;doctor&lt;/u&gt; away.&lt;/p&gt;"
        const output = "<p>A paragraph a <u>day</u>, keeps the <u>doctor</u> away.</p>";

        expect(htmlDecode(input)).toEqual(output);
    })

    it("Returns an empty string if given an empty string", () => {
        const input = "";
        const output = "";

        expect(htmlDecode(input)).toEqual(output);
    })
})