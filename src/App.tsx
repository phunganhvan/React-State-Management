// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from './redux/store'
// import { useAppSelector, useAppDispatch } from './redux/hooks'
// import { increment, decrement } from './redux/counter/counter.slide'

import Header from "./components/header"
import TabContent from "./components/tabs.content"
// import UsersTable from "./components/users.table"

// import bootstrap 



function App() {
  // const [count, setCount] = useState(0)
  // const cnt = useSelector((state: RootState) => state.counter)
  // const cnt = useAppSelector(state => state.counter);
  // const dispatch = useDispatch()
  // const dispatch = useAppDispatch();

  return (
    <>

      {/* <h1>Vite + React</h1> */}
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <div>
        <h1>
          My current count = {cnt.value}
        </h1>
        <div>
          <button
            className= "btn"
            onClick ={ () => dispatch(increment())}
          >
            Increase
          </button>
          <button
            onClick ={ () => dispatch(decrement())}
          >
            Decrease
          </button>
        </div>

      </div> */}
      
      <Header />
      <TabContent />

      
    </>
  )
}

export default App
