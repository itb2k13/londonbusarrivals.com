import { DebounceInput } from "react-debounce-input";

function Input(props) {
    const { value, ...rest } = props;
    return (

        <DebounceInput
            minLength={3}
            value={props.value || ""}
            {...rest}
            debounceTimeout={1200}
            className="uppercase shadow appearance-none border rounded text-4xl w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" >
        </DebounceInput>

    );
}

export default Input;
