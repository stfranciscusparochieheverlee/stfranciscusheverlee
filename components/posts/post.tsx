/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { format } from "date-fns";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { HiHeart } from "react-icons/hi2";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";
import Head from 'next/head';
import Image from 'next/image'
import axios from "axios"
import { usePathname } from "next/navigation";
import { Button } from "@headlessui/react";


const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  }> = {
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{dt.toISOString()}</span>;
      case "utc":
        return <span>{dt.toUTCString()}</span>;
      case "local":
        return <span>{dt.toLocaleDateString()}</span>;
      default:
        return <span>{dt.toLocaleDateString()}</span>;
    }
  }
};


export const Post = (props) => {
  const [likes, setLikes] = React.useState("");
  const [liked, setLiked] = React.useState(false);

  const theme = useTheme();
  const titleColorClasses = {
    blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
    teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-300 to-pink-500",
    purple:
      "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
    orange:
      "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
    yellow:
      "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
  };
  const pageName = usePathname().split("post/")[1]
  const date = new Date(props.date);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy");
  }
  async function getLikes(){
    await axios({url: `/likes/?r=${pageName}`, method: "get"}).then((result) => {
      setLikes(result.data)
  }).catch((error) => {
    console.error(error)
  })}
  async function like() {
    await axios({url: `/likes/?r=${pageName}&a=addlike`, method: "get"}).then((result) => {
      setLikes(result.data)
      setLiked(true)
      
    }).catch((error) => {
    console.error(error)
  })
  }
  React.useEffect(()=>{
    getLikes()
  }, [])
  React.useEffect(()=>{
    if(localStorage.getItem("likedName") && liked){
      const oldArray = Array.from(JSON.parse(localStorage.getItem("likedName")))
      if(oldArray.includes(pageName)){
        // do nothing
      }else{
      oldArray.push(pageName);
      localStorage.setItem("likedName", JSON.stringify(oldArray))}
    }
    if(!localStorage.getItem("likedName") && liked){
      const likedArray = [];
      likedArray.push(pageName)
      localStorage.setItem("likedName", JSON.stringify(likedArray))
    }
  }, [liked])
  React.useEffect(()=>{
    if(localStorage.getItem("likedName")){
      const oldArray = Array.from(JSON.parse(localStorage.getItem("likedName")))
      if(oldArray.includes(pageName)){
        setLiked(true)
      }
    }
  },[])
  return (
    <>
    <Head>
          <title>{props.title} @ Sint-Franciscusparochie Heverlee</title>
          <meta name="keywords" content={props.keywords}/>
          <meta name="description" content={props.desc}/>
    </Head>
    <Section className="flex-1">
      <span className="fixed left-[10px] top-[90px] p-[5px] bg-basiskleur text-vijfdekleur rounded-md text-sm"><a href="/posts">Nieuws</a> / {props.title}</span>
      <Container className={`flex-1 max-w-full pb-2`} size="large">
        <h2
          data-tinafield="title"
          className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`text-basiskleur break-words`}
          >
            {props.title}
          </span>
        </h2>
        <div
          data-tinafield="author"
          className="flex items-center justify-center mb-16"
        >
          {props.author && (
            <>
              <div className="flex-shrink-0 mr-4">
                <img
                  className="h-14 w-14 object-cover rounded-full shadow-sm"
                  src={props.author.avatar}
                  alt={props.author.name}
                />
              </div>
              <p className="text-base font-medium text-liturgischekleur">
                {props.author.name}
              </p>
              <span className="font-bold text-liturgischekleur mx-2">
                —
              </span>
            </>
          )}
          <p
            data-tinafield="date"
            className="font-bold text-liturgischekleur "
          >
            {formattedDate}
          </p>
        </div>
      </Container>
      {props.heroImg && (
        <div data-tinafield="heroImg" className="">
          <img
            src={props.heroImg}
            className="mb-14 block h-auto w-full mx-[0px]"
          />
        </div>
      )}
      <Container className={`flex-1 max-w-4xl pt-4`} size="large">
        <div className="prose dark:prose-dark w-full max-w-none text-justify text-basiskleur">
          <TinaMarkdown components={components} content={props._body} /><br></br><Button data-umami-event="Signup button" onClick={like} disabled={liked} className="border-2 border-basiskleur rounded-xl w-[200px] h-[50px] baseline-[50px] text-xl text-center"><HiHeart className="inline-flex"></HiHeart> {likes} - Like</Button>
        </div>
      </Container>
    </Section>
    </>
  )
}
