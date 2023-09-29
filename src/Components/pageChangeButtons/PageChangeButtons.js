import { useDispatch } from "react-redux";
import { createSearchParams } from "react-router-dom";
import './PageChangeButtons.css';

export function PageChangeButtons({ setSearchParams, count, increment, decrement, before = null, after = null}) {
    const dispatch = useDispatch();

    const nextPage = after? {
        after: after,
        count: count + 25,
    } : null;

    const prevPage = before? {
        before: before,
        count: count,
    } : null;

    const prevParams = prevPage && createSearchParams(prevPage);
    const nextParams = nextPage && createSearchParams(nextPage);

    return (
        <div className="button-container">
            {!!before && <button 
                onClick={() => {
                    dispatch(decrement());
                    setSearchParams(prevParams);
                }}
            >
                &lt; PREV
            </button>}
            {!!after && <button 
                onClick={() => {
                    dispatch(increment());
                    setSearchParams(nextParams);
                }}
            >
                NEXT &gt;
            </button>}
        </div>
    )
}