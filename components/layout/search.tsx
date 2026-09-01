import Head from "next/head";
import React from "react";
import { HiSearch } from "react-icons/hi";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, } from "react-instantsearch";

const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_API_KEY);
function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>${hit.price}</p>
    </article>
  );
}
export const Search = () => {
    return (
        <div className="p-0 h-11 absolute right-4 text-derdekleur rounded-full border-2 border-vierdekleur flex">
    <InstantSearch indexName="YourIndexName" searchClient={searchClient}>
      <SearchBox className="rounded-full m-0 h-10 border-derdekleur font-bold bg-basiskleur border-0 placeholder-current p-2 text-sm flex-initial inline-block"/>
      {/* other widgets */}
        <Hits hitComponent={Hit} />
    </InstantSearch></div>
    )
}