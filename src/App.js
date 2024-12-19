import './App.css';
import Header from './components/Header';

/*useEffect(() => {
        async function createUser() {
            try {
                const response = await fetch('https://mate.academy/students-api/users', {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": "Vladimir1971",
                        "username": "VOVA1971",
                        "email": "vova@gmail.com",
                        "phone": "1234567890"
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                })
                if (response.ok) {
                    const list = await response.json()
                    console.log(list);
                    //setUsers([...list])
                } else {
                    console.log(response.status);
                }
                } catch (error) {
                console.log(error);
            }
        }
        createUser()
    }, [])*/

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
