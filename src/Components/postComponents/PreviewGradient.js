export function PreviewGradient({isListingCard, handleClick}) {
    return isListingCard && (
        <div className="gradient-shadow" data-testid="gradient-shadow" onClick={handleClick}/>
    )
}