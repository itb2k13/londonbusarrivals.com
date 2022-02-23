
import Toggle from 'react-toggle'
import "react-toggle/style.css"

function Toggler(props) {

    const onChange = (e) => {
        if (props.onChange)
            props.onChange(e.target.checked);
    }

    return (

        <label className="flex items-center justify-center text-white w-full py-2">
            <Toggle
                disabled={props.disabled}
                defaultChecked={JSON.parse(props.defaultChecked)}
                icons={false}
                onChange={onChange} />
            <span className="ml-2">Use my location</span>
        </label>

    );
}

export default Toggler;
