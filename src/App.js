
import {useState} from 'react'
import SlotMachine from './SlotMachine'

function App () {
    let [result, setResult] = useState([])

    let finish = () => {}
    return (
        <div className="text-white flex flex-col">
            <SlotMachine  result={result} onFinished={finish} />
            <div> start</div>
            <div> stop</div>
        </div>
    )
}

export default App
