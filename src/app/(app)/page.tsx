"use client"

import { Button } from "@/components/ui/button";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { ArrowDown, ArrowUp, CheckCircle, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import db from "../../../firebase/firestore";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

const selectedAi = "sumup-ai";

type documentType = {
  id: string,
  originalText: string,
  aiText: string,
  selectedAi: string
}

export default function Home() {
  const { user } = useUser()
  const [document, setDocument] = useState<documentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlRated, setIsAlRated] = useState(false);
  const [scores, setScores] = useState({
    relevance: 0,
    coherence: 0,
    correctness: 0,
    clarity: 0
  })

  const handleOnChange = (name: string, value: number) => {
    setScores({ ...scores, [name]: value });
  }

  const getRandomDocument = async () => {
    try {
      setIsLoading(true);
      const summariesRef = collection(db, 'evaluated-summaries');
      const snapshot = await getDocs(summariesRef);
      let filteredDocs: any = [];
      snapshot.forEach((doc) => {
        const data = doc.data();

        if (!!data.notRated) {
          filteredDocs.push({ id: doc.id, ...data });
        }
      });

      if (filteredDocs.length > 0) {
        setIsAlRated(false);
        const randomIndex = Math.floor(Math.random() * filteredDocs.length);
        const document = filteredDocs[randomIndex];
        setDocument({
          id: document.id,
          originalText: document.text.original,
          aiText: document.text[selectedAi],
          selectedAi: selectedAi
        });

      } else {
        setIsAlRated(true);
        return null;
      }

    } catch (error) {
      console.error("Error fetching summaries:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (scores.relevance === 0 || scores.coherence === 0 || scores.correctness === 0 || scores.clarity === 0) {
      toast.error("Error", {
        description: "Please rate all categories before submitting",
      })
      return;
    }
    try {
      console.log("Submitting scores:", scores);
      setIsLoading(true);
      if (!document?.id) {
        throw new Error("Document ID is undefined");
      }
      const docRef = doc(db, 'evaluated-summaries', document.id);
      const Doc = await getDoc(docRef);
      if (!doc) {
        throw new Error("Document not found");
      }

      const data = Doc.data();
      if (!data) {
        throw new Error("Data not found");
      }

      await updateDoc(docRef, {
        scores: {
          ...data.scores,
          [selectedAi]: {
            ratedBy: {
              id: user?.id,
              email: user?.emailAddresses[0].emailAddress,
              fullName: user?.fullName,
              imageUrl: user?.imageUrl
            },
            scores: scores
          }
        },
        notRated: false
      })
      console.log("Scores submitted successfully");

      toast.success("Score submitted", {
        description: "Your score has been submitted successfully.",
      })

    } catch (err) {
      console.error("Error submitting scores:", err);

      toast.error("Error", {
        description: "Something went wrong. Try again",
      })
    } finally {
      setIsLoading(false);
      getRandomDocument();
      // scroll to top of page
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    getRandomDocument();
  }, [])

  const Loading = () => (
    <div className="mx-auto w-max-w-5xl lg:max-w-7xl h-[70dvh] lg:h-[80dvh]">
      <div className="flex flex-col justify-center gap-10 items-center w-full h-full">
        <span className="loader"></span>
      </div>
    </div>
  )

  if (isLoading) return (
    <div className="h-full">
      <Loading />
    </div>
  )

  if (isAlRated) return (
    <div className="h-full">
      <div className="flex justify-center items-center h-[70dvh]">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle className="w-24 h-24 text-sky-700 mb-6" />
          <h2 className="text-xl font-semibold mb-4">All summaries have been rated.</h2>
        </div>
      </div>
    </div>
  )

  if (!document) return null

  return (
    <div className="h-full">
      <Paragraph
        originalText={document.originalText}
        aiGeneratedText={document.aiText}
        selectedAi={document.selectedAi}
        onClick={getRandomDocument}
      />
      <div className="my-12 flex flex-col items-center gap-8">
        <div className="">
          <h1 className="text-xl font-bold mb-2">Rate AI generated summary</h1>
          <h3 className="max-w-2xl text-sm text-gray-600 mb-4">Compare original text with AI-generated content, and give feedback on Conciseness, Readability, Coherence and Relevance</h3>
          <h3 className="text-md text-gray-700 mb-2">Rate the summary on each category below, from 1 to 10. Use the Tab key to move between input fields, and Shift + Tab to go back, And the <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-blue-100 px-1.5 font-mono text-[10px] font-medium text-black opacity-100"><ArrowUp /></kbd> and <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-blue-100 px-1.5 font-mono text-[10px] font-medium text-black opacity-100"><ArrowDown /></kbd> arrow keys to increase or decrease the rating.</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreBox name="relevance" onChange={handleOnChange} title="Relevance" description="Does it focus on essential information without unnecessary details?" />
          <ScoreBox name="coherence" onChange={handleOnChange} title="Coherence" description=" Does the summary flow logically and make sense?" />
          <ScoreBox name="correctness" onChange={handleOnChange} title="Correctness" description="Does the summary accurately reflect the original content?" />
          <ScoreBox name="clarity" onChange={handleOnChange} title="Clarity" description="Is the summary easy to understand and well-structured?" />
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

function Paragraph({ originalText, aiGeneratedText, onClick }: {
  originalText: string,
  aiGeneratedText: string,
  selectedAi: string,
  onClick: () => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="border-2 pt-3 px-6 pb-6">
        <div className="flex justify-between items-center border-b-2 mb-2 py-2">
          <h2 className="font-semibold text-xl">Original Paragraph</h2>
          <Button variant="outline" className="border-2" onClick={onClick}>Get Another Text <ReloadIcon /></Button>
        </div>
        <p>
          {originalText}
        </p>
      </div>
      <div className="border-2 pt-3 px-6 pb-6">
        <div className="flex justify-between items-center border-b-2 mb-2 py-2">
          <h2 className="font-semibold text-xl">AI generated Summary</h2>
          <Badge variant="outline">{selectedAi.toUpperCase()}</Badge>
        </div>
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