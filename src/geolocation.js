import react from 'react';

function App() {
  const [currLocation, setCurrentLocation] = useState ({});
  useEffect(() => {

  }, []);

  const getLocation = async() => {} => {
    const location = await axios.get('https://ipapi.co.json');
  }
  
  }