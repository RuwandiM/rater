'use client'

import { useState } from 'react'

export default function Component() {
  const [highlightedCell, setHighlightedCell] = useState<any>({ row: null, col: null, mainCol: null })

  const mainColumns = ['Original Text', 'GPT Summary', 'Claude Summary', 'Llama Summary']
  const subColumns = ['Coherence', 'Clarity', 'Relevance', 'Correctness', 'Average']

  const data = [
    {
      originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
    },
    {
      originalText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
    },
    {
      originalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
      claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
      llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
    },
    {
      originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
    },
    {
      originalText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
    },
    {
      originalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
      claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
      llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
    },
    {
      originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
    },
    {
      originalText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
    },
    {
      originalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
      claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
      llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
    },
    {
      originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
    },
    {
      originalText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
      claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
      llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
    },
    {
      originalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
      claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
      llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
    },
  ]

  const isHighlighted = (rowIndex:any, colIndex:any, mainColIndex:any = null) => {
    if (highlightedCell.row === null && highlightedCell.col === null) return false;
    
    if (mainColIndex !== null) {
      return mainColIndex === highlightedCell.mainCol || (colIndex !== null && colIndex === highlightedCell.col);
    }

    if (rowIndex === null) {
      return colIndex === highlightedCell.col;
    }

    if (rowIndex === highlightedCell.row && colIndex === highlightedCell.col) {
      return 'intersection';
    }

    if (rowIndex === highlightedCell.row && colIndex < highlightedCell.col) {
      return 'row';
    }

    if (colIndex === highlightedCell.col && rowIndex < highlightedCell.row) {
      return 'column';
    }

    return false;
  }

  return (
    <div className="w-full h-[500px] overflow-auto relative max-w-[calc(100vw-2rem)]">
      <div className="grid grid-cols-[300px_repeat(15,minmax(100px,1fr))] gap-0 select-none" role="table" aria-label="Summary Comparison">
        <div className="contents sticky top-0 z-30" role="row">
          <div className="sticky left-0 top-0 z-40 bg-gray-200 p-2 font-bold border border-gray-300" role="columnheader">
            {mainColumns[0]}
          </div>
          {mainColumns.slice(1).map((col, index) => (
            <div
              key={col}
              className={`col-span-5 bg-gray-200 p-2 font-bold border border-gray-300 transition-colors duration-150 sticky top-0 z-30 ${
                isHighlighted(null, null, index + 1) ? 'bg-yellow-100' : ''
              }`}
              role="columnheader"
            >
              {col}
            </div>
          ))}
        </div>
        <div className="contents sticky top-[41px] z-20" role="row">
          <div className="sticky left-0 top-[41px] z-40 bg-gray-100 p-2 font-semibold border border-gray-300" role="columnheader"></div>
          {mainColumns.slice(1).map((col, mainIndex) =>
            subColumns.map((subCol, subIndex) => (
              <div
                key={`${col}-${subCol}`}
                className={`bg-gray-100 p-2 font-semibold border border-gray-300 transition-colors duration-150 sticky top-[41px] z-20 ${
                  isHighlighted(null, mainIndex * 5 + subIndex + 1) === 'column' ? 'bg-yellow-100' : ''
                }`}
                role="columnheader"
              >
                {subCol}
              </div>
            ))
          )}
        </div>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="contents" role="row">
            <div
              className={`sticky left-0 z-10 bg-white p-2 border border-gray-300 transition-colors duration-150 ${
                isHighlighted(rowIndex, 0) === 'row' ? 'bg-green-100' : ''
              }`}
              role="cell"
              onMouseEnter={() => setHighlightedCell({ row: rowIndex, col: 0, mainCol: 0 })}
              onMouseLeave={() => setHighlightedCell({ row: null, col: null, mainCol: null })}
            >
              {row.originalText}
            </div>
            {Object.entries(row)
              .slice(1)
              .map(([key, summary], summaryIndex) =>
                Object.entries(summary).map(([subKey, value], subIndex) => {
                  const colIndex = summaryIndex * 5 + subIndex + 1;
                  const highlightType = isHighlighted(rowIndex, colIndex);
                  let bgColor = '';
                  if (highlightType === 'intersection') {
                    bgColor = 'bg-red-100';
                  } else if (highlightType === 'row') {
                    bgColor = 'bg-green-100';
                  } else if (highlightType === 'column') {
                    bgColor = 'bg-yellow-100';
                  }
                  return (
                    <div
                      key={`${key}-${subKey}`}
                      className={`p-2 border border-gray-300 transition-colors duration-150 text-center content-center ${bgColor}`}
                      role="cell"
                      onMouseEnter={() =>
                        setHighlightedCell({
                          row: rowIndex,
                          col: colIndex,
                          mainCol: summaryIndex + 1,
                        })
                      }
                      onMouseLeave={() => setHighlightedCell({ row: null, col: null, mainCol: null })}
                    >
                      {value}
                    </div>
                  );
                })
              )}
          </div>
        ))}
      </div>
    </div>
  )
}