
import type { D } from "@fullcalendar/core/internal-common";
import {  formatDate } from "@fullcalendar/core";

export const formattedDate = (value: D) => {
  return formatDate(value, {
    month: "long",
    year: "numeric",
    day: "numeric",
    hour12: false,
    locale: "es",
  });
};

export const formattedTime = (value: D) => {
  return formatDate(value, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    locale: "es",
  });
};

export const formattedDateGetDay = (value: D) => {
  return formatDate(value, {
    day: "numeric",
    hour12: false,
    locale: "es",
  });
};

