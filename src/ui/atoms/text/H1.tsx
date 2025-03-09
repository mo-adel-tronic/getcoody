import React from "react";

interface H1Props {
  mainText: string;
  spanText?: string;
  spanFirst?: boolean;
}

const h1Handler = (main: string, span: string, spanFirst: boolean) => {
  if (span) {
    if (spanFirst) {
      return (
        <>
          <span className="text-secondary-hover">{span}</span> {main}
        </>
      );
    } else {
      return (
        <>
          {main} <span className="text-secondary-hover">{span}</span>
        </>
      );
    }
  } else {
    return main;
  }
};

export default function H1({
  mainText,
  spanText = "",
  spanFirst = true,
}: H1Props) {
  return (
    <h1
      className={`font-cairo  md:text-3xl text-xl font-bold my-6 text-foreground-title leading-normal`}
    >
      {h1Handler(mainText, spanText, spanFirst)}
    </h1>
  );
}