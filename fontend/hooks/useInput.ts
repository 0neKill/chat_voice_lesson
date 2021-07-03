import React from "react";

export default function useInput(init: string) {
    const [value, setValue] = React.useState<string>(init);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    return {
        value, onChange
    }

}