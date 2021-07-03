import React from "react";
import {IMainContext, MainContext} from "../pages";

export default function useGetContext(): IMainContext {
    return React.useContext<IMainContext>(MainContext);
}