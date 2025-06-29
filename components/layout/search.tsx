import set from "date-fns";
import React from "react";
import { HiSearch } from "react-icons/hi";

export const Search = () => {
    return (
        <div className="p-0 h-11 absolute right-4 text-derdekleur rounded-full border-2 border-vierdekleur flex">
            <input className="rounded-l-full m-0 h-10 border-derdekleur font-bold bg-basiskleur border-0 placeholder-current p-2 text-sm flex-initial inline-block" placeholder="Zoeken ..."></input>
            <button className="rounded-r-full text-center m-0 h-10 w-10 border-derdekleur font-bold bg-derdekleur text-basiskleur border-1 p-2 text-sm inline-block"><HiSearch/></button>
        </div>
    )
}