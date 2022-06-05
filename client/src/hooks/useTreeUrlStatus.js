import { useLayoutEffect, useRef } from "react";
import { useCallback, useState } from 'react';
import { createBrowserHistory } from "history";


export function useLatest(value) {
    const valueRef = useRef(value);

    useLayoutEffect(() => {
        valueRef.current = value;
    }, [value]);

    return valueRef;
}

export function getSearchParam(search, param) {
    const searchParams = new URLSearchParams(search);
    return searchParams.get(param);
}

export function setSearchParam(search, param, value) {
    const searchParams = new URLSearchParams(search);
    Boolean(value)
        ? searchParams.set(param, value)
        : searchParams.delete(param);
    return searchParams.toString();
}

const defaultDeserialize = (v) => v;
const defaultSerialize = String;

export function useSearchParamsState({
    name,
    serialize = defaultSerialize,
    desirialize = defaultDeserialize
}) {
    const history = createBrowserHistory({ window });
    const [value, setValue] = useState(() => {
        const initialValue = desirialize(
            getSearchParam(history.location.search, name)
        );

        return initialValue;
    });
    const latestValue = useLatest(value);

    const updateValue = useCallback(
        (newValue) => {
            const search = history.location.search;
            const actualNewValue =
                typeof newValue === "function"
                    ? newValue(latestValue.current)
                    : newValue;

            setValue(actualNewValue);

            const newSearch = setSearchParam(
                search,
                name,
                serialize(actualNewValue)
            );

            history.replace({
                search: newSearch
            });
        },
        [latestValue, history, name, serialize]
    );

    return [value, updateValue];
}

