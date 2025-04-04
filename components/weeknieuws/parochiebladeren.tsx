import React from "react";
import Head from 'next/head';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

export const Parochiebladeren = ({ data }) => {
  const [filesrc, setFilesrc] = React.useState("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  const [iframeHidden, setIframeHidden] = React.useState(true);
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const eventsList = [];
  data.map((postData) => {
    const post = postData.node;
    const Event = {
      title: "Week: " + moment(moment.utc(post._values.date)).week(),
      start: moment.utc(post._values.date),
      end: moment.utc(post._values.date),
      allDay: true,
      resource: post._values.bestand,
    }
    eventsList.push(Event)
  })
  const handleSelectEvent= React.useCallback(
    (event) => setFrame(event.resource), []
   )
   const setFrame = (fileSrc) => {
    setIframeHidden(false)
    setFilesrc(fileSrc)
    }
  const closeIFrame = () => setIframeHidden(true)
  return (
    <>
    <div className="h-[600px]">
  <Calendar
    defaultDate={moment.now()}
    localizer={localizer}
    showMultiDayTimes
    step={60}
    events={eventsList}
    onSelectEvent={handleSelectEvent}
  /></div>
      <div className={`fixed h-full w-full bg-basiskleur z-[10000] top-0 left-0 border-0 z-[50002] overflow-none ${iframeHidden ? "hidden":"block" }`}>
        <button className={`fixed rounded-md border-1 border-basiskleur p-[5px] top-[75px] left-[15px] bg-liturgischekleur ${iframeHidden ? "hidden":"block" } z-[21474836491]`} onClick={closeIFrame}>&#10006; Sluiten</button>
        <iframe className="w-full h-full" src={filesrc}></iframe>
      </div>
      <Head>
        <title>Nieuws @ Sint-Franciscusparochie Heverlee</title>
        <meta name="keywords" content="nieuws,parochienieuws"/>
        <meta name="description" content="Het nieuws uit onze parochie, in een handig overzicht."/>
      </Head>
    </>
  );
};
