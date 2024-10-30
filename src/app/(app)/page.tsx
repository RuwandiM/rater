"use client"

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const temp = `
අද මම කතා කරන්න ලැස්ති වෙලා ඉන්නෙ මේ ලෝකේ දැනට තියෙන හොඳම අධ්‍යාපන ක්‍රමවේද පිළිබඳව මොකද ඇය ඉගෙන ගත්තොත් අපි ගොඩක් දෙනෙක්ට ඒකෙන් ලොකු ප්‍රයෝජන ගන්න පුළුවන්කම තියෙන නිසා. මම දැන් ඕගොල්ලන්ට පෙන්නන්න යන්නේ මේ ලෝකයේ අධ්‍යාපන ක්‍රමයම ගිය සියවස තුළ ද වෙනස් කරපු පින්තූරක්. අපේ සාම්ප්‍රදායික අධ්‍යාපන ක්‍රම ප්‍රධාන පාසැල් වල උගන්වන අධ්‍යාපන ක්‍රමය ඇතුලේ පන්තියක ළමයින්ගෙ යම්කිසි විෂයකට ලකුණු පැතිරිලා තියෙන්නේ විදිහට කියල හිතන්න හිතන්න ළමයි ලකුණු 15 ක් ළමයිනුත් දෙන ලකුණු 95 ගත්තු ළමයිනුත් ඉන්නවා මේ වගේ ලොකු පැතිරුණු වක්‍රයක, ඉතින් වැඩිපුර ළමයින්ට වැඩිපුර සාමාන්‍ය ලකුණු 50 50 වගේ ගත්තු අය තමයි ඉන්නේ එකක ඉන්න B එකක ළමයි තමයි වැඩිපුරම ඉන්නෙ අපි සාමාන්‍යයෙන් දකින්නේ. මම අද කියලා දෙන්න යන මේ අධ්‍යාපන ක්‍රමය තුළ මේ ඒව ක්‍රමේ ළමයි ටික අලුතෙන් ළමයි නෙමෙ මේ ළමයින්ට කිසිම වෙනසක් කරන්නැතුව මේ ක්‍රමවේදය වෙනස් කිරීමෙන් පමණක් අපිට හැකියාව තියෙනවා මේ ලමයින්ගේ කුසලතාවය මේ යම්කිසි විෂයකට තියන ප්‍රවීනතාවය එකේ මනින  ලද ලකුණු වශයෙන් ගත්තම මෙන්න මේ විදිහට දකුණු අත පැත්තට යවන්න.  ගැන එහෙම කිව්වම තේරෙන්නෙ නෑනෙ ඒ ගැන කවුරුද හිතන්න B මාක් එකක් තියෙන, 55 වගේ ලකුණු පනස් පත්තිනි ළමයෙක්,   සාමාන්‍ය ළමයෙක්, මධ්‍ය ළමයා. මෙන්න මේ ළමයා ඒ ළමයාගේ යම්කිසි මේ වේ තියන හැකියාව වෙනසක් නැතුව මේ අධ්‍යාපන ක්‍රමය වෙනස් කිරීමෙන් පමණක් A+ එකකට කිට්ටු කරන්න කියන්න පුළුවන්.
`

export default function Home() {
  const [scores, setScores] = useState({
    relevance: 0,
    coherence: 0,
    readability: 0,
    conciseness: 0
  })

  const handleOnChange = (name: string, value: number) => {
    setScores({ ...scores, [name]: value });
  }

  const handleSubmit = () => {
    console.log(scores);
  }

  return (
    <div className="h-full">
      <Paragraph
        originalText={temp+ " " + temp + " " + temp}
        aiGeneratedText={temp} />
      <div className="my-12 flex flex-col items-center gap-8">
        <div className="">
          <h1 className="text-xl font-bold mb-2">Rate AI generated summary</h1>
          <h3 className="max-w-2xl text-sm text-gray-600 mb-4">Compare original text with AI-generated content, and give feedback on Conciseness, Readability, Coherence and Relevance</h3>
          <h3 className="text-md text-gray-700 mb-2">Rate the summary on each category below, from 1 to 10. Use the Tab key to move between input fields, and Shift + Tab to go back, And the <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-blue-100 px-1.5 font-mono text-[10px] font-medium text-black opacity-100"><ArrowUp /></kbd> and <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-blue-100 px-1.5 font-mono text-[10px] font-medium text-black opacity-100"><ArrowDown /></kbd> arrow keys to increase or decrease the rating.</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreBox name="relevance" onChange={handleOnChange} title="Relevance" description="How well does the summary capture the essential points of the original text?" />
          <ScoreBox name="coherence" onChange={handleOnChange} title="Coherence" description="How logically are the ideas connected, and how smoothly does the summary flow?" />
          <ScoreBox name="readability" onChange={handleOnChange} title="Readability" description="How easy is it to read and understand the summary?" />
          <ScoreBox name="conciseness" onChange={handleOnChange} title="Conciseness" description="How effectively does the summary convey the main points without unnecessary detail?" />
        </div>
        <div className="mt-4">
          <Button onClick={handleSubmit} className="px-8 py-6 w-40 flex justify-center items-center">
            <p>Done</p>
            <ChevronRight size="lg" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Paragraph({ originalText, aiGeneratedText }: {
  originalText: string,
  aiGeneratedText: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border-2 p-6">
        <h2 className="mb-3 font-semibold text-xl border-b-2 pb-2">Original Paragraph</h2>
        <p>
          {originalText}
        </p>
      </div>
      <div className="border-2 p-6">
        <h2 className="mb-3 font-semibold text-xl border-b-2 pb-2">AI generated Summary</h2>
        <p>
          {aiGeneratedText}
        </p>
      </div>
    </div>
  )
}

function ScoreBox({ name, title, description, onChange, autoFocus }: {
  name: string,
  title: string,
  description: string
  onChange: (name: string, value: number) => void
  autoFocus?: boolean
}) {
  return (
    <div className="border-2 p-4 h-72 flex flex-col justify-around items-center">
      <div className="mb-2 flex flex-col items-center ">
        <label htmlFor={name} className="font-semibold text-lg text-center">{title}</label>
        <p className="mt-2 text-slate-600 text-center">{description}</p>
      </div>
      <div className="flex justify-center items-center">
        <input
          id={name}
          name={name}
          type="number"
          className="border-2 rounded-full w-20 h-20 text-center text-5xl"
          min="1"
          max="10"
          onChange={(e: any) => {
            let value = parseInt(e.target.value, 10);
            if (value < 1) value = 1;
            else if (value > 10) value = 10;
            e.target.value = value;
            onChange(name, value);
          }}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  )
}