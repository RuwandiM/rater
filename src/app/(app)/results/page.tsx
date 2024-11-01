// 'use client'

// import { useState } from 'react'

// export default function Component() {
//   const [highlightedCell, setHighlightedCell] = useState<any>({ row: null, col: null, mainCol: null })

//   const mainColumns = ['Original Text', 'GPT Summary', 'Claude Summary', 'Llama Summary']
//   const subColumns = ['Coherence', 'Clarity', 'Relevance', 'Correctness', 'Average']

//   const data = [
//     {
//       originalText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
//       claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
//       llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
//     },
//     {
//       originalText: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
//       claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
//       llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
//     },
//     {
//       originalText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
//       gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
//       claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
//       llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
//     },
//   ]

//    const isHighlighted = (rowIndex:any, colIndex:any, mainColIndex:any = null) => {
//     if (highlightedCell.row === null && highlightedCell.col === null) return false;

//     if (mainColIndex !== null) {
//       return mainColIndex === highlightedCell.mainCol;
//     }

//     if (rowIndex === null) {
//       return colIndex === highlightedCell.col;
//     }

//     return (rowIndex === highlightedCell.row && colIndex <= highlightedCell.col) || 
//          (colIndex === highlightedCell.col && rowIndex <= highlightedCell.row);
//    }

//    return (
//      <div className="relative"> {/* Removed overflow-auto to allow page scrolling */}
//        <table className="w-full border-collapse select-none">
//          <thead className="sticky top-0 z-20">
//            <tr>
//              <th
//                className="sticky left-0 top-0 z-30 bg-gray-200 p-2 text-left font-bold border border-gray-300"
//                style={{ width: '300px' }} // Increase width of Original Text column
//              >
//                {mainColumns[0]}
//              </th>
//              {mainColumns.slice(1).map((col, index) => (
//                <th
//                  key={col}
//                  colSpan={5}
//                  className={`bg-gray-200 p-2 text-left font-bold border border-gray-300 transition-colors duration-150 ${
//                    isHighlighted(null, null, index + 1) ? 'bg-blue-500' : ''
//                  }`}
//                >
//                  {col}
//                </th>
//              ))}
//            </tr>
//            <tr>
//              <th
//                className="sticky left-0 top-[39px] z-30 bg-gray-100 p-2 text-left font-semibold border border-gray-300"
//                style={{ width: '300px' }}
//              ></th>
//              {mainColumns.slice(1).map((col, mainIndex) =>
//                subColumns.map((subCol, subIndex) => (
//                  <th
//                    key={`${col}-${subCol}`}
//                    className={`bg-gray-100 p-2 text-left font-semibold border border-gray-300 transition-colors duration-150 ${
//                      isHighlighted(null, mainIndex * 5 + subIndex + 1) ? 'bg-teal-300' : ''
//                    }`}
//                  >
//                    {subCol}
//                  </th>
//                ))
//              )}
//            </tr>
//          </thead>
//          <tbody>
//            {data.map((row, rowIndex) => (
//              <tr key={rowIndex}>
//                <td
//                  className={`sticky left-0 z-10 bg-white p-2 border border-gray-300 transition-colors duration-150 ${
//                    isHighlighted(rowIndex, 0) ? 'bg-teal-300' : ''
//                  }`}
//                  style={{ width: '300px' }} // Increase width for Original Text cells in body
//                  onMouseEnter={() => setHighlightedCell({ row: rowIndex, col: 0, mainCol: 0 })}
//                  onMouseLeave={() => setHighlightedCell({ row:null,col:null ,mainCol:null})}
//                >
//                  {row.originalText}
//                </td>
//                {Object.entries(row)
//                  .slice(1)
//                  .map(([key ,summary], summaryIndex) =>
//                    Object.entries(summary).map(([subKey,value], subIndex) => {
//                      const colIndex = summaryIndex *5 + subIndex +1;
//                      return (
//                        <td
//                          key={`${key}-${subKey}`}
//                          className={`p-2 border border-gray-300 transition-colors duration-150 ${
//                            isHighlighted(rowIndex,colIndex)?'bg-teal-300':''
//                          }`}
//                          onMouseEnter={() =>
//                            setHighlightedCell({
//                              row :rowIndex,
//                              col :colIndex,
//                              mainCol :summaryIndex+1,
//                            })
//                          }
//                          onMouseLeave={() => setHighlightedCell({ row:null,col:null ,mainCol:null})}
//                        >
//                          {value}
//                        </td>
//                      );
//                    })
//                  )}
//              </tr>
//            ))}
//          </tbody>
//        </table>
//      </div>
//    )
//  }





























'use client'

import { useState } from 'react'

export default function Component() {
    const [highlightedCell, setHighlightedCell] = useState<any>({ row: null, col: null, mainCol: null })

    const mainColumns = ['Original Text', 'GPT Summary', 'Claude Summary', 'Llama Summary']
    const subColumns = ['Coherence', 'Clarity', 'Relevance', 'Correctness', 'Average']

    const data = [
        {
            originalText: 'Lorem ipsum dolor',
            gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
        },
        {
            originalText: 'Sed do eiusmod',
            gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
        },
        {
            originalText: 'Ut enim ad',
            gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
            claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
            llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
        },
        {
            originalText: 'Lorem ipsum dolor',
            gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
        },
        {
            originalText: 'Sed do eiusmod',
            gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
        },
        {
            originalText: 'Ut enim ad',
            gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
            claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
            llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
        },
        {
            originalText: 'Lorem ipsum dolor',
            gptSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            claudeSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            llamaSummary: { coherence: 3, clarity: 4, relevance: 4, correctness: 4, average: 3.75 },
          },
          {
            originalText: 'Sed do eiusmod',
            gptSummary: { coherence: 5, clarity: 4, relevance: 5, correctness: 4, average: 4.5 },
            claudeSummary: { coherence: 4, clarity: 5, relevance: 4, correctness: 5, average: 4.5 },
            llamaSummary: { coherence: 4, clarity: 3, relevance: 5, correctness: 4, average: 4 },
          },
          {
            originalText: 'Ut enim ad',
            gptSummary: { coherence: 3, clarity: 4, relevance: 5, correctness: 4, average: 4 },
            claudeSummary: { coherence: 5, clarity: 5, relevance: 4, correctness: 5, average: 4.75 },
            llamaSummary: { coherence: 4, clarity: 4, relevance: 3, correctness: 5, average: 4 },
          },
    ]

    const isHighlighted = (rowIndex: any, colIndex: any, mainColIndex: any = null) => {
        if (highlightedCell.row === null && highlightedCell.col === null) return false;

        if (mainColIndex !== null) {
            return mainColIndex === highlightedCell.mainCol;
        }

        if (rowIndex === null) {
            return colIndex === highlightedCell.col;
        }

        return (rowIndex === highlightedCell.row && colIndex <= highlightedCell.col) ||
            (colIndex === highlightedCell.col && rowIndex <= highlightedCell.row);
    }

    return (
        <div className="w-full h-[80dvh] overflow-auto relative">
            <table className="w-full border-collapse select-none">
                <thead className="sticky top-0 z-20">
                    <tr>
                        <th className="sticky left-0 top-0 z-30 bg-gray-200 p-2 text-left font-bold border border-gray-300">
                            {mainColumns[0]}
                        </th>
                        {mainColumns.slice(1).map((col, index) => (
                            <th
                                key={col}
                                colSpan={5}
                                className={`bg-gray-200 p-2 font-bold border border-gray-300 transition-colors duration-150 text-center ${isHighlighted(null, null, index + 1) ? 'bg-blue-300' : ''
                                    }`}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="sticky left-0 top-[39px] z-30 bg-gray-100 p-2 text-left font-semibold border border-gray-300"></th>
                        {mainColumns.slice(1).map((col, mainIndex) =>
                            subColumns.map((subCol, subIndex) => (
                                <th
                                    key={`${col}-${subCol}`}
                                    className={`bg-gray-100 p-2 text-left font-semibold border border-gray-300 transition-colors duration-150 ${isHighlighted(null, mainIndex * 5 + subIndex + 1) ? 'bg-teal-300' : ''
                                        }`}
                                >
                                    {subCol}
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td
                                className={`sticky left-0 z-10 bg-white p-2 border border-gray-300 transition-colors duration-150 ${isHighlighted(rowIndex, 0) ? 'bg-teal-300' : ''
                                    }`}
                                onMouseEnter={() => setHighlightedCell({ row: rowIndex, col: 0, mainCol: 0 })}
                                onMouseLeave={() => setHighlightedCell({ row: null, col: null, mainCol: null })}
                            >
                                {row.originalText}
                            </td>
                            {Object.entries(row)
                                .slice(1)
                                .map(([key, summary], summaryIndex) =>
                                    Object.entries(summary).map(([subKey, value], subIndex) => {
                                        const colIndex = summaryIndex * 5 + subIndex + 1;
                                        return (
                                            <td
                                                key={`${key}-${subKey}`}
                                                className={`p-2 border border-gray-300 transition-colors duration-150 text-center ${isHighlighted(rowIndex, colIndex) ? 'bg-teal-300' : ''
                                                    }`}
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
                                            </td>
                                        );
                                    })
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}