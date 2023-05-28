import './home.css' 
import { Center } from './center'
import CountUp from 'react-countup'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';  
import  { UserContext } from '../context/context';
import { DatePicker } from '@y0c/react-datepicker';
import '@y0c/react-datepicker/assets/styles/calendar.scss';

export const Home=()=>{
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStateid, setSelectedStateid]=useState('');
    const [getresponse, setResponse]=useState({});
    const [Campdata,setCampData]=useState(false);
    const [totalCases, setTotalCases]=useState(null);
    const [recoveredCases, setrecoveredCases]=useState(null);
    // const [uh_id,setUh_id]=useState(null);
  const navigate=useNavigate()
    const {currentUser}=useContext(UserContext);



  useEffect(() => {
 
    axios.get('https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true')
    .then(res => {
      setTotalCases(res.data.totalCases)
      setrecoveredCases(res.data.recovered)
    })
    .catch(error => {
      console.error('Error fetching COVID-19 data:', error);
  })

}, []);

    useEffect(() => {
      axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then(response => {
          setStates(response.data.states);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    useEffect(() => {
      if (selectedState !== '') {
        
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateid}`)
          .then(response => {
            setDistricts(response.data.districts);
          })
          .catch(error => {
            console.error(error);
          });
         
      } else {
        setDistricts([]);
      }
    }, [selectedState]);
  
    function handleStateChange(e) {
        setSelectedState(e.state_name);
        setSelectedStateid(e.state_id);

    }

    function  handleDistrictChange(e){
        setSelectedDistrict(e.district_name)
    }

    const loadStates=(searchValue,callback)=>{

        const filteredOptions=states.filter(states=>states.state_name.toLowerCase().includes(searchValue.toLowerCase()
         ));
         callback(filteredOptions);
 
    }

    const loadDistrict=(searchValue,callback)=>{
            const filteredOptions=districts.filter(districts=>districts.district_name.toLowerCase().includes(searchValue.toLowerCase()
             ));
             callback(filteredOptions);

    }

  

    const handleSubmit=async()=>{
      try {
        await axios.post("https://vaxin-api.vercel.app/",
        {
          selectedState:selectedState,
          selectedDistrict:selectedDistrict
        }
        ).then((response)=>{
          setResponse(Object.assign(getresponse,response));
          setCampData(true);
          
        })
    } catch (error) {
        console.log(error);
    }
    }

    const onChangeDp=(date)=>{
      const todate=`${date.$y}-${(date.$M)+1}-${date.$D}`;  

      setSelectedDate(todate);

      }

    return(
        <>
        {
          currentUser &&
          <>
<div className="card-wrapper">
            <div className="info-display-wrapper">
            <div className="info-display">
                    <div className="info-display-text">Get Your Vaccination Now!</div>
                    <div className="totalCases">
                        <CountUp
                        end={totalCases}
                        duration={2}
                        className='totalCasesNumber'
                        />
                        <div className="totalCasesText">Total Cases</div>
                    
                    </div>
                    <div className="recoveredCases"><CountUp
                        end={recoveredCases}
                        duration={2}
                        className='recoveredCasesNumber'
                        />
                        <div className="recoveredText">Recovered Cases</div>
                    
                        </div>   
                </div>
            </div>
                
            <div className="searchbar-main-wrapper">
                <div className="searchbar">
                    <div className="state">
                        <AsyncSelect
                        className='state-select'  
                        loadOptions={loadStates}  
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            border:'4px',
                        backgroundColor:'#B7C6FD',
                        color:'black',
                        borderColor:'#B7C6FD',
                        fontFamily:'chillax',
                        fontSize:'14px',
                        width: '100%',
                        borderRadius: '4px',
                        fontWeight:'400'
                          }),
                          placeholder:(style)=>({
                            ...style,
                            color:'#140E57',
                          }),
                          option:(baseStyles, state)=>({
                              ...baseStyles,
                              backgroundColor:state.isFocused?'#B7C6FD':'#fff',
                              color:'black',
                              borderColor:'#B7C6FD'
                          })
                        }}   
                        
                        getOptionValue={e=>e.state_name}
                        getOptionLabel={e=>e.state_name} 
                        onChange={handleStateChange}
                        placeholder='Select State'
                        />
                    </div>
                    <div className="district">
                    <AsyncSelect   
                    className='district-select'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border:'4px',
                        backgroundColor:'#B7C6FD',
                        color:'black',
                        borderColor:'#B7C6FD',
                        fontFamily:'chillax',
                        fontSize:'14px',
                        width: '100%',
                        borderRadius: '4px',
                        fontWeight:'400'
                      }),
                      placeholder:(style)=>({
                        ...style,
                        color:'#140E57',
                      }),
                      option:(baseStyles, state)=>({
                          ...baseStyles,
                        backgroundColor:state.isFocused?'#B7C6FD':'#fff',
                        color:'black',
                        borderColor:'#B7C6FD'
                      })
                    }}              
                        loadOptions={loadDistrict}
                        getOptionValue={e=>e.district_name}
                        getOptionLabel={e=>e.district_name} 
                        onChange={handleDistrictChange}
                        placeholder='Select District'
                        />
                    </div>
                    <div className="date">
                     {/* <input onChange={handleDate} type='date' className="date-picker"></input> */}
                     <DatePicker className="date-picker" placeholder="Select Date" onChange={onChangeDp}  />

                      </div>
                    <div onClick={handleSubmit} className="search-btn">search</div>
                </div>
            </div> 
        </div>


      
        <div className="listing-wrapper">
        
      {Campdata && 
      
      <div className="listing">
      <span style={{fontSize:'48px'}}> 
      {getresponse.data.length} Results
      </span>
      {getresponse.data.map((e,k)=>{
        return(
          <Center key={k} id={k} getresponse={getresponse} name={e.centre_name} slots={e.number_of_slots} selectedDate={selectedDate}/>

        )
      })}
      </div>
      }
        
        </div>
        </>
        }
        {
          !currentUser &&
        <>
        {navigate('/login')}
        </>
        }
        </>

    )
}
