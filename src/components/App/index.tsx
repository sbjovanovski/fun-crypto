import {useState} from "react";

const App = () => {
    const [state, setState] = useState(0)
    return <div>
        App is here {state}
        <div>
            <button onClick={() => setState(prevState => prevState + 1)}>count</button>
        </div>
    </div>
}

export {App}