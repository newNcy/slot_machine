
import {useState, useEffect} from 'react'

import './SlotMachine.css'
import './App.css'

async function sleep(ms){
    return new Promise(r=>{
        setTimeout(r, ms)
    })
}
function Spinner({slot, speed}) {
    const unit = 56;
    let [init, setInit] = useState(false)
    let [starting, setStarting] = useState(true)
    let [delta, setDelta] = useState(0)
    let [pos, setPos] = useState(0)

    async function tick() {
        
        if (slot == null) {
            if (!init) {
                setInit(true)
                return
            }
            if (starting) {
                setStarting(false)
                setDelta(speed)
            } else if (delta > -speed) {
                setDelta(delta - 50)
            }
        }else {
            if (!init) {
                setPos(-slot*unit)
                return
            }

            setPos(-slot*unit)
            delta = 0
            setDelta(0)
            setStarting(true)
            return
        }
        
        let newPos = pos + delta  
        console.log(slot)
        setPos(newPos)
    }
    
    useEffect(()=>{
        let timers = []
        timers.push(setInterval(tick, 100))
        return ()=> {
            for (let t of timers) {
                clearInterval(t)
            }
        }
    })
    return (
        <div 
            style={{ backgroundPosition: '50% ' + pos + 'px' }}
            className="slot">
        </div>
    )
}

function SlotMachine ({slot1, slot2, slot3}) {
    return (
        <div className=" flex flex-row  slot-container p-2  h-fit">
            <Spinner slot={slot1} speed={500}/> 
            <Spinner slot={slot2} speed={400}/> 
            <Spinner slot={slot3} speed={600}/> 
        </div>
    )
}


function SlotIcon({slot}) {
    return (
        <div className="slot-icon" style={{backgroundPosition: `50% ${slot/8.0*100}%`}}>
        </div>
    )
}

function SlotSample({slots, gain}) {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="slot-sample">
                <SlotIcon slot={slots[0]}/>
                <SlotIcon slot={slots[1]}/>
                <SlotIcon slot={slots[2]}/>
            </div>

            <p>
                {gain}
            </p>
        </div>
    )
}

function App () {

    function rs() {
        let r = Math.round(Math.random()*9)
        console.log(r)
        return r
    }

    let [slot1, setSlot1] = useState(0)
    let [slot2, setSlot2] = useState(1)
    let [slot3, setSlot3] = useState(2)
    let finish = () => {}
    return (
        <div className="text-white h-full flex flex-col jusitify-center items-center">
            <div className="shadow-lg px-4 py-2 text-xl w-full flex flex-row justify-between items-center ">
                <div >
                    Token.ZkPenguin
                </div>
                <div>
                    connect
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <SlotMachine slot1={slot1} slot2={slot2} slot3={slot3}/>
                <div className="slot-container px-2 py-1">
                    <div className="flex flex-row justify-between items-center">
                        <p>weger</p>
                        <p>gain</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <SlotSample slots={[0, 1, 2]} gain="1000 $zkpn"/>
                        <SlotSample slots={[0, 1, 2]}/>
                        <SlotSample slots={[0, 1, 2]}/>
                    </div>
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div onClick={ async e=> {
                        if (slot1==null || slot2 == null ||  slot3 == null) 
                            return
                        setSlot1(null)
                        setSlot2(null)
                        setSlot3(null)
                    }}> start</div>
                    <div onClick={ async e=> {
                        if (slot1!=null || slot2!=null || slot3!=null) 
                            return
                        setSlot1(null)
                        await sleep(500)
                        setSlot1(rs())
                        await sleep(500)
                        setSlot2(rs())
                        await sleep(500)
                        setSlot3(rs())
                    }}> stop</div>
                </div>
            </div>
        </div>
    )
}

export default App
