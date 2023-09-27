import { htmlDecode } from "../../utilities/htmlDecode";

export function Text({post}) {
    const text = post.selftext_html|| null;
    if(text) {
        return <div className='body-text' dangerouslySetInnerHTML={{__html: htmlDecode(text)}} />;
    }
    return;
}