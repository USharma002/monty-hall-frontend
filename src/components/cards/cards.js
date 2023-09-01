import './cards.css'

export default function Card({title, object, path, desc, selected, setSelectedOption, flipped, winningCard, setFlipped, N, selectedCount, setSelectedCount, prevSelection, heading}) {

    const handleSelect = () =>{
        if(flipped.includes(title)!==true){
            setSelectedOption(title)
        }

        setSelectedCount(1);


        let arr = [...Array(N).keys()].filter(c => c !== title)
        arr = arr.filter(c => c !== winningCard.current)

        let randomIndex = Math.floor(Math.random() * arr.length)

        if(arr.length === N - 1){
            arr = arr.filter(c => c !== arr[randomIndex])
        }

        if(selectedCount === 0){
            prevSelection.current = title;
            setFlipped(arr);
        }

    }

    return (
    <div className="card" onClick={handleSelect} id={title}>
        <div className={"card__inner" + (flipped.includes(title) ? ' is-flipped': '')}>
            <div className={"card__face card__face--front" + (selected ? ' selected' : '')}>
                <h2>Option : {title + 1}</h2>
            </div>
            <div className={"card__face card__face--back" + (selected ? ' selected' : '')}>
                <div className="card__content">
                    <div className="card__header">
                        <img src={path} alt="" className="pp" />
                        <h2>{object}</h2>
                    </div>
                    <div className="card__body">
                        <h3>{heading}</h3>
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
