import React from 'react'

type GridPatternProps = {
  title: string;
};

export default function GridPattern({ title }: GridPatternProps) {
  
  return (
    <>
          <div className="p-10 group/file block rounded-lg w-full relative overflow-hidden">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
              <GridPatternBox />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-3xl">
                 {title}
              </h1>
            </div>
          </div>
    </>
  )
}



export function GridPatternBox() {
  const columns = 21;
  const rows = 5;
  return (
    <div className="flex bg-gray-50 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-100 dark:bg-neutral-950"
                  : "bg-gray-100 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
