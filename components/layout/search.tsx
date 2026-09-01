import Head from "next/head";
import React from "react";
import { HiSearch } from "react-icons/hi";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, } from "react-instantsearch";

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);
function Hit({ hit }) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <h1>{hit.title}</h1>
      <p>{hit.description}</p>
    </article>
  );
}
export const Search = () => {
    return (
        <><div className="p-0 h-11 absolute right-4 text-derdekleur rounded-full border-2 border-vierdekleur flex">
    <InstantSearch indexName="netlify_f065dc5a-6c9b-4e3c-82b8-a3f548245d4a_main_all" searchClient={searchClient}>
      <SearchBox className="rounded-full m-0 h-10 border-derdekleur font-bold bg-basiskleur border-0 placeholder-current p-2 text-sm flex-initial inline-block"/>
      {/* other widgets */}
       <div  className="fixed top-[25%] bg-basiskleur w-[75%] h-[50%] left-[12.5%] overflow-auto"><Hits hitComponent={Hit} /></div>
    </InstantSearch>
   </div>
    </>

    )
}