/** Brand marks from Simple Icons (CC0), stored locally in assets/icons. */
import databricks from "./assets/icons/databricks.svg";
import dynamics from "./assets/icons/dynamics365.svg";
import fastapi from "./assets/icons/fastapi.svg";
import gmail from "./assets/icons/gmail.svg";
import jira from "./assets/icons/jira.svg";
import langchain from "./assets/icons/langchain.svg";
import langgraph from "./assets/icons/langgraph.svg";
import azure from "./assets/icons/microsoftazure.svg";
import excel from "./assets/icons/microsoftexcel.svg";
import mcp from "./assets/icons/modelcontextprotocol.svg";
import pandas from "./assets/icons/pandas.svg";
import powerbi from "./assets/icons/powerbi.svg";
import python from "./assets/icons/python.svg";
import salesforce from "./assets/icons/salesforce.svg";
import sap from "./assets/icons/sap.svg";
import snowflake from "./assets/icons/snowflake.svg";
import scikitlearn from "./assets/icons/scikitlearn.svg";
import sqlite from "./assets/icons/sqlite.svg";
import streamlit from "./assets/icons/streamlit.svg";
import tableau from "./assets/icons/tableau.svg";
import type { ToolIcon } from "../data/types";

const svgUrl = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${body}</svg>`)}`;

/** A database cylinder, used for SQL (which has no single brand mark). */
const database = svgUrl(
  '<path fill="#000" d="M12 2C7 2 3.5 3.6 3.5 5.6v12.8C3.5 20.4 7 22 12 22s8.5-1.6 8.5-3.6V5.6C20.5 3.6 17 2 12 2Zm0 2c4.2 0 6.5 1.2 6.5 1.6S16.2 7.2 12 7.2 5.5 6 5.5 5.6 7.8 4 12 4Zm6.5 14.4c0 .4-2.3 1.6-6.5 1.6s-6.5-1.2-6.5-1.6v-2.6c1.5.9 3.9 1.4 6.5 1.4s5-.5 6.5-1.4Zm0-4.8c0 .4-2.3 1.6-6.5 1.6s-6.5-1.2-6.5-1.6V11c1.5.9 3.9 1.4 6.5 1.4s5-.5 6.5-1.4Zm0-4.8c0 .4-2.3 1.6-6.5 1.6S5.5 9.2 5.5 8.8V7.7c1.5.9 3.9 1.5 6.5 1.5s5-.6 6.5-1.5Z"/>',
);

/** A checklist mark, used for test automation tools without a public icon. */
const checklist = svgUrl(
  '<path fill="#000" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h14V5Zm2.3 3.3 1.4-1.4 1.3 1.3 2.8-2.8 1.4 1.4-4.2 4.2Zm0 6 1.4-1.4 1.3 1.3 2.8-2.8 1.4 1.4-4.2 4.2ZM15 8h2v2h-2Zm0 6h2v2h-2Z"/>',
);

/** Restrained line symbols for the Business & Delivery Skills. */
const line = (d: string) => svgUrl(`<path fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="${d}"/>`);
const chat = line("M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 5h8m-8 3h5");
const delivery = line("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2");
const investigate = line("M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm4.6 11.1L20 20M8 10.5h5");
const onboard = line("M3 9l9-4 9 4-9 4-9-4Zm4 2v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4m4-2v6");
const growth = line("M4 20h16M6 16l4-5 3 3 5-7m0 0h-4m4 0v4");
const cycle = line("M19 8a8 8 0 0 0-14 2m0 0V6m0 4h4M5 16a8 8 0 0 0 14-2m0 0v4m0-4h-4");

export const toolIconUrls: Record<ToolIcon, string> = {
  python,
  sql: database,
  powerbi,
  tableau,
  excel,
  azure,
  databricks,
  sap,
  jira,
  tosca: checklist,
  langchain,
  langgraph,
  mcp,
  scikitlearn,
  streamlit,
  fastapi,
  salesforce,
  dynamics,
  gmail,
  pandas,
  sqlite,
  model: checklist,
  snowflake,
  chat,
  delivery,
  investigate,
  onboard,
  growth,
  cycle,
};
