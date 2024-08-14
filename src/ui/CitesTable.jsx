import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 


const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const tableEndRef = useRef(null);

  const fetchCities = async ( ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&sort=name&facet=country&facet=timezone&rows=1000`
      );
      const newCities = response.data.records.map((record) => ({
        name: record.fields.name,
        countryName: record.fields.cou_name_en,
        timeZone: record.fields.timezone,
      }));
      setCities((prevCities) => [...prevCities, ...newCities]);
      setFilteredCities((prevCities) => [...prevCities, ...newCities]);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities(page);
  }, [ ]);


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = cities.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCities(results);
      setSuggestions(results.slice(0, 10));  
      setShowSuggestions(true);
    } else {
      setFilteredCities(cities);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setFilteredCities([suggestion]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className='main'>
        <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <div className='suggestion' style={{height:"auto",width: "100%", display:"flex", justifyContent:"center"}}>
      {showSuggestions && (
        <ul style={{ border: '1px solid black', padding: '0',boxShadow:" 0 2px 5px rgba(0, 0, 0, 0.2)", margin: '2px', listStyle: 'none', position: 'absolute', backgroundColor: 'white', width: '93%', zIndex: "12000" }}>
            Sugesstions
         
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ padding: '0.5rem', cursor: 'pointer' }}
             >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      </div>
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredCities.map((city, index) => (
            <tr key={index}>
              <td><Link to={`/weather/${city.name}`}>{city.name}</Link></td>
              <td>{city.countryName}</td>
              <td>{city.timeZone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
      <div ref={tableEndRef} />
    </div>
  );
};

export default CitiesTable;
