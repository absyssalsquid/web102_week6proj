function SummaryCards({data}){

    var summaryStats = {
        'Japan'        : data.reduce((acc, item)=> acc + (item.release.jp ? 1 : 0), 0), 
        'North America': data.reduce((acc, item)=> acc + (item.release.na ? 1 : 0), 0), 
        'EU'           : data.reduce((acc, item)=> acc + (item.release.eu ? 1 : 0), 0), 
        'Australia'    : data.reduce((acc, item)=> acc + (item.release.au ? 1 : 0), 0), 
    };
    summaryStats['Total'] = data.length;

    return (
        <div className="card-container">
            {Object.entries(summaryStats).map(([desc, val]) => {
                return (
                    <div className="card">
                        <div className="card-data">{val}</div>
                        <div className="card-desc">{desc}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default SummaryCards