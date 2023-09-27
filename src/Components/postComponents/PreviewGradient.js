export function PreviewGradient({isListingCard, handleClick}) {
    return isListingCard && (
        <div className="gradient-shadow" onClick={handleClick}/>
    )
}