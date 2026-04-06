
function DataTable({data}){
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th className="image-col">Image</th>
                        <th>Character</th>
                        <th>Name</th>
                        <th>Amiibo Series</th>
                        <th>Game Series</th>
                        <th>Type</th>
                        <th className="date-col">Release date (JP)</th>
                        <th className="date-col">Release date (NA)</th>
                        <th className="date-col">Release date (AU)</th>
                        <th className="date-col">Release date (EU)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr>
                                <td className="image-col"><img src={item.image}/></td>
                                <td>{item.character}</td>
                                <td>{item.name}</td>
                                <td>{item.amiiboSeries}</td>
                                <td>{item.gameSeries}</td>
                                <td>{item.type}</td>
                                <td className="date-col">{item.release.jp}</td>
                                <td className="date-col">{item.release.na}</td>
                                <td className="date-col">{item.release.au}</td>
                                <td className="date-col">{item.release.eu}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;

