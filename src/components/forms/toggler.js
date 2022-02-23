
import Toggle from 'react-toggle'
import { useStore } from '../../store/useStore';
import "react-toggle/style.css"

function Toggler(props) {

    const setSetting = useStore(state => state.setSetting);
    const value = useStore(state => state[props.name] || false);

    return (

        <label className="flex items-center justify-center w-full py-2">
            <Toggle
                disabled={props.disabled || false}
                defaultChecked={value}
                icons={false}
                onChange={(e) => setSetting(props.name, e.target.checked)} />

            {props.label && <span className="ml-2">{props.label}</span>}

        </label>

    );
}

export default Toggler;
