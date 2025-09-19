import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode, LineSeries } from "lightweight-charts";
import { useAppSelector } from "@/redux/hooks";
import { CRYPTOCOMPARE_ENDPOINTS } from "@/constants";

type HistodayType = {
  time: number;
  close: number;
};

type MiniLineChartProps = {
  percentage: number;
};

const MiniLineChart = ({ percentage }: MiniLineChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const histoday = useAppSelector(
    (state) => state.cryptoApi[`${CRYPTOCOMPARE_ENDPOINTS.marketCapChart}`]
  );

  useEffect(() => {
    if (!chartContainerRef.current) return;
    if (!histoday) return;

    const data = histoday.data.Data.Data.map(
      ({ time, close }: HistodayType) => ({
        time,
        value: close,
      })
    );

    const chart = createChart(chartContainerRef.current, {
      height: 46,
      width: chartContainerRef.current.clientWidth,
      layout: {
        background: { color: "transparent" },
        textColor: "#ffffff",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false, borderVisible: false },
      leftPriceScale: { visible: false, borderVisible: false },
      timeScale: { visible: false },
      crosshair: {
        mode: CrosshairMode.Hidden,
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: `${Math.sign(percentage) === -1 ? "#ef4444" : "#22c55e"}`,
      lineWidth: 2,
      priceLineVisible: false,
    });

    lineSeries.setData(data);

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
  }, [histoday, percentage]);

  return <div className="max-w-full" ref={chartContainerRef} />;
};

export default MiniLineChart;
