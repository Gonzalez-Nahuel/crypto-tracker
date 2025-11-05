import React, { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  LineSeries,
  UTCTimestamp,
} from "lightweight-charts";
import { isDarkColor } from "@/utils/is-dark-color";
import { useAppSelector } from "@/redux/hooks";

type HistodayType = {
  time: number;
  close: number;
};

type LineChartProps = {
  height: number;
  value: number;
  data: number[] | HistodayType[];
  horzlines?: boolean;
  rightPrice?: boolean;
  timeScale?: boolean;
  border?: boolean;
};

const LineChart = ({
  value,
  data,
  height,
  horzlines = false,
  rightPrice = false,
  timeScale = false,
  border = false,
}: LineChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    chartContainerRef.current.innerHTML = "";

    const $body = document.body;
    const bgColor = window.getComputedStyle($body).backgroundColor;

    const isDark = isDarkColor(bgColor);

    const now = Math.floor(Date.now() / 1000);

    const histoData = data.every((item) => typeof item === "number")
      ? data.map((val, i) => ({
          time: (now - (data.length - i) * 3600) as UTCTimestamp,
          value: val,
        }))
      : data.map(({ time, close }: HistodayType) => ({
          time: time as UTCTimestamp,
          value: close,
        }));

    const chart = createChart(chartContainerRef.current, {
      height: height,
      width: chartContainerRef.current.clientWidth || 100,
      layout: {
        background: { color: "transparent" },
        textColor: `${isDark ? "#ffffff" : "#000"}`,
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: {
          visible: horzlines,
          color: `${isDark ? "#1e293b" : "#e5e7eb"}`,
        },
      },
      rightPriceScale: {
        visible: rightPrice,
        borderVisible: true,
        borderColor: `${isDark ? "#1e293b" : "#e5e7eb"}`,
      },
      leftPriceScale: {
        visible: false,
        borderVisible: true,
        borderColor: `${isDark ? "#1e293b" : "#e5e7eb"}`,
      },
      timeScale: {
        visible: timeScale,
        borderColor: `${isDark ? "#1e293b" : "#e5e7eb"}`,
      },
      crosshair: {
        mode: CrosshairMode.Hidden,
      },
      handleScroll: {
        mouseWheel: false,
      },
      handleScale: {
        mouseWheel: false,
        pinch: false,
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: `${Math.sign(value) === -1 ? "#ef4444" : "#22c55e"}`,
      lineWidth: 2,
      priceLineVisible: false,
    });

    lineSeries.setData(histoData);

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
      chart.timeScale().fitContent();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, value, height, theme, horzlines, rightPrice, timeScale]);

  return (
    <div
      className={`w-full cursor-pointer ${
        border ? "border-t border-b" : "border-none"
      } border-t border-b  ${
        theme !== "light" ? "border-[#1e293b]" : "border-[#e5e7eb]"
      }`}
      ref={chartContainerRef}
    />
  );
};

export default LineChart;
