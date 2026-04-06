import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './components/DataTable.jsx'
import SummaryCards from './components/SummaryCards.jsx'

function App() {
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [startDateStr, setStartDateStr] = useState(new Date('2010'));
  const [endDateStr, setEndDateStr] = useState(new Date());
  const [amiiboType, setAmiiboType] = useState(null);


  useEffect(() => {
    const fetchAllAmiiboData = async () => {
      const response = await fetch('https://amiiboapi.org/api/amiibo');
      const json =  await response.json();
      setdata(json.amiibo);
      setFilteredData(json.amiibo);
    }

    fetchAllAmiiboData().catch(console.error);
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    
    var startDate = parseDate(startDateStr);
    var endDate = parseDate(endDateStr);
    
    if (endDate && isFourDigits(endDateStr)){
      // round up to end of year
      var date = new Date(endDate);
      date.setFullYear(date.getFullYear() + 1);
      date.setSeconds(date.getSeconds() - 1);
      endDate = date;
    }
    
    // console.log(
    //   queryText,
    //   startDate && new Date(startDate).toISOString().split('T')[0],
    //   endDate && new Date(endDate).toISOString().split('T')[0]
    // );

    const filtered = data.filter((item) => {
      // amiibo type
      const matchesAmiiboType = !amiiboType ? true : item.type == amiiboType;
      if (!matchesAmiiboType) return false;

      // string 
      var matchesString = true;
      if (queryText){
        const strings = [item.character, item.name, item.amiiboSeries, item.gameSeries]
        matchesString = strings.reduce((acc, str) => acc || str.toLowerCase().includes(queryText.toLowerCase()), null);
      }
      if (!matchesString) return false;
  
      // date
      const dates = [item.release.jp, item.release.na, item.release.eu, item.release.au].map(parseDate);
      const passesStart = !startDate ? true : dates.reduce((acc, date) => acc || (!date ? false : startDate <= date), null);;
      const passesEnd = !endDate ? true : dates.reduce((acc, date) => acc || (!date ? false : endDate >= date), null);;
      return passesStart && passesEnd;
  
    })
    setFilteredData(filtered);

  }, [data, queryText, startDateStr, endDateStr, amiiboType])

  const isFourDigits = (str) => {
    return /^\d{4}$/.test(str);
  }
  const parseDate = (str) => {
    if (str && str.length < 4) return null;
    const d = Date.parse(str)
    if (Number.isNaN(d)) return null;
    return d;
  }

  const handleDropdownChange = (e) => {
    var v = e.target.value;
    if (v == 'Any') v = null;
    setAmiiboType(v);
  }

  return (
    <div className='page'>

      <div className='header'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/e/ed/Amiibo_logo.png' />
      </div>

      <SummaryCards data = {filteredData}/>

      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
          Search
          <input
            value={queryText}
            placeholder=''
            onChange={(e)=>setQueryText(e.target.value)}
          />
          Released between
          <input 
            type='text'
            className={'date-input' + (startDateStr && !parseDate(startDateStr) ? ' invalid' : '')}
            placeholder='yyyy/mm/dd'
            onChange={(e) => setStartDateStr(e.target.value)}
            />
          and
          <input 
            type='text'
            className={'date-input' + (endDateStr && !parseDate(endDateStr) ? ' invalid' : '')}
            placeholder='yyyy/mm/dd'
            onChange={(e) => setEndDateStr(e.target.value)}
          />
          Amiibo type 
          <select onChange={handleDropdownChange}>
            <option value="Any">Any</option>
            <option value="Card">Card</option>
            <option value="Figure">Figure</option>
            <option value="Block">Block</option>
          </select>
        </form>
        <p className='error-msg'>{
          (
            (startDateStr && !parseDate(startDateStr)) || 
            (endDateStr && !parseDate(endDateStr)) 
          )
          && "Invalid date."}
        </p>
      </div>

      <DataTable data = {filteredData}/>

    </div>
  )
}

export default App
