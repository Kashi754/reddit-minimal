import { useState } from "react";

export function Gallery({ keys, images }) {
    const imageUrls = keys.map(key => images[key].s.u.split('?')[0].replace('preview', 'i'));
    const [currentUrl, setCurrentUrl] = useState([0, imageUrls[0]]);
    console.log(imageUrls);
    console.log(currentUrl);
    
    return (
        <div className="gallery">
            {
                currentUrl[0] < imageUrls.length - 1 && 
                <img className='right arrow' onClick={() => setCurrentUrl(prev => [prev[0] + 1, imageUrls[prev[0] + 1]])} 
                src='/images/circle-right-arrow.png' 
                alt="" />
            }
            {
                currentUrl[0] > 0 &&
                <img className='left arrow' onClick={() => setCurrentUrl(prev => [prev[0] - 1, imageUrls[prev[0] - 1]])} 
                src='/images/circle-left-arrow.png' 
                alt="" />
            }
            <img className="gallery-image" src={currentUrl[1]} alt={imageUrls[0]} />
        </div>
    );
}