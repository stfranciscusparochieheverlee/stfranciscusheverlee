import Head from "next/head";
import React from "react";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"
import Fuse from 'fuse.js'
import Link from "next/link";
import { CloseIcon } from "tinacms";
import Image from "next/image";
import { GlobalStyles } from "@mui/material";
import globals from "../../content/global/index.json"
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Search } from "./search";
export const Header = ({ data, props }) => {
  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  const [windowUrl, setUrl] = React.useState("");
  const isBrowser = typeof window !== "undefined";
  const hasUrl = isBrowser ? window.location.href : "";
  const [resultsPopUp, setResultsPopup] = React.useState(false);
  const [menuExpanded, setMenuExpanded] = React.useState(false);
  const query = React.useRef(null);
  
  React.useEffect(() => {
    document.getElementById("title").innerText = document.title;
  });
  function toggle5(){
    setResultsPopup(!resultsPopUp);
  }
  function openPopup(ref){
    if(document.getElementById(ref).style.display == "block"){
      document.getElementById(ref).style.display = "none";
    }else{
      const elements = document.querySelectorAll('.popup')
        elements.forEach((item: any) => {
      item.style.display = 'none'
      })
      document.getElementById(ref).style.display = "block";
    }
  }
  function menuExpand(){
    setMenuExpanded(!menuExpanded);
  }

  React.useEffect(() => {
    setUrl(hasUrl);
  }, [hasUrl]);

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        {props.title !== undefined && <title>{props.title} @ Sint-Franciscusparochie</title>}
      </Head>
      <div className="overflow-x-hidden flex flex-col smo:flex-row items-center text-xl font-weight-700 bg-liturgischekleur p-[15px] z-[5000]">
        <a href="/" className="no-underline"><img src="/icon-dark.svg" alt="header-icon" width="50px" className="mr-[10px] inline"/><span id="title">{props.title} @ St.-Franciscusparochie</span></a>
        <Search></Search>
      </div>
      <hr className="border-basiskleur bg-basiskleur mx-0"></hr>
      <div className={`overflow-x-hidden flex text-center items-center content-center place-content-center text-basiskleur w-full sticky top-0 z-[5000] text-lg`}>
        {globals.header.nav.map((data) => {
          if(data.type=="href"){
            return (
              <button className="duration-200 grow hidden mo:block text-center border-b-4 border-basiskleur hover:border-vierdekleur hover:bg-basiskleur hover:text-vierdekleur hover:font-bold py-2 bg-liturgischekleur text-basiskleur"><a href={data.href} className="no-underline w-full inline-block">{data.label}</a></button>
            )
          }else{
            return (
              <button className="duration-200 grow hidden mo:block text-center border-b-4 border-basiskleur hover:border-vierdekleur hover:bg-basiskleur hover:text-vierdekleur hover:font-bold py-2 px-4 bg-liturgischekleur text-basiskleur" onClick={() => openPopup(data.href)}><a className="no-underline">{data.label}</a></button>
            )
          }
        })}
        <button className="duration-200 block mo:hidden text-center border-b-4 border-basiskleur hover:border-vierdekleur hover:bg-basiskleur hover:text-vierdekleur hover:font-bold py-2 px-4 bg-liturgischekleur text-basiskleur w-full"><span onClick={menuExpand} className="no-underline w-full inline-block">&#9776; Menu</span></button>
      </div>
      {globals.header.nav.map((data) => {
          if(data.type=="href"){
            return (
              null
            )
          }else{
            return (
              <div id={data.href} className="hidden w-full overflow-x-hidden flex text-center bg-derdekleur text-basiskleur w-full mr-2 sticky top-[50px] z-[4999] hidden popup"><ul className="flex">
              {data.children.map((subnav) => {
              return (
                <li className="grow"><button className={`w-full text-center mx-auto border-b-2 py-[5px] border-basiskleur hover:border-vierdekleur hover:bg-basiskleur hover:text-vierdekleur hover:font-bold bg-derdekleur text-basiskleur no-underline`}><a className="no-underline  w-full inline-block" href={subnav.href}>{subnav.label}</a></button></li>
              )
          })}</ul></div>)}
        })}
    <div className="fixed w-full h-full z-[5000] bg-vijfdekleur text-basiskleur border-solid border-b-2 border-basiskleur flex-1 mr-2 top-0 text-center overflow-y-auto text-lg" style={{display: menuExpanded?"block":"none"}}>
      <button className="block text-center mx-auto w-full py-2 px-4 bg-liturgischekleur text-basiskleur text-xl"><span onClick={menuExpand} className="no-underline w-full inline-block">&#x2715; Sluiten</span></button>
      <hr className="border-basiskleur border-2"></hr>
      {globals.header.nav.map((data) => {
          if(data.type=="href"){
            return (
              <button className="block my-3 text-center mx-auto mr-2 py-2 px-4 bg-liturgischekleur text-basiskleur w-[95%]"><a href={data.href} className="no-underline w-full inline-block">{data.label}</a></button>
            )
          }else{
            return (
              <><button className="mx-auto block text-center my-3 mr-2 py-2 px-4 bg-liturgischekleur text-basiskleur w-[95%]" onClick={() => openPopup(data.href+data.type)}><a className="no-underline w-full inline-block">{data.label}</a></button>
              <div id={data.href+data.type} className="hidden my-[20px] popup">
              {data.children.map((subnav) => {
                return (
                  <button className="block text-center my-3 mx-auto m-2 py-2 px-4 bg-basiskleur text-vierdekleur w-[95%]"><a href={subnav.href} className="no-underline w-full inline-block">{subnav.label}</a></button>
                )
              })}
              </div>
              </>
            )
          }})}
    </div>
    <a href="/donaties" aria-label="Doneren" className="fixed p-[15px] w-[55px] rounded-[2px] no-underline text-center bg-red-700 text-white bold bottom-[10px] z-[4001] left-[2.4%] inline-flex h-[50px]"><VolunteerActivismIcon/></a>
    <a href="/dhj" aria-label="Vieringen" className="fixed p-[15px] w-[55px] rounded-[2px] no-underline text-center bg-green-700 text-white bold bottom-[10px] z-[4001] right-[2.4%] inline-flex h-[50px]"><AccessTimeIcon/></a></>

  );
};
