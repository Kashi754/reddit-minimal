import { useDispatch } from "react-redux";
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

    return (
        <div className="button-container">
            {!!before && <button 
                onClick={() => {
                    dispatch(decrement());
                    setSearchParams((searchParams) => {
                        const params = Object.fromEntries(searchParams);
                        params.before = prevPage.before;
                        params.count = prevPage.count;
                        delete params.after;
                        return params;
                    });
                }}
            >
                &lt; PREV
            </button>}
            {!!after && <button 
                onClick={() => {
                    dispatch(increment());
                    setSearchParams((searchParams) => {
                        const params = Object.fromEntries(searchParams);
                        params.after = nextPage.after;
                        params.count = nextPage.count;
                        delete params.before;
                        return params;
                    });
                }}
            >
                NEXT &gt;
            </button>}
        </div>
    )
}