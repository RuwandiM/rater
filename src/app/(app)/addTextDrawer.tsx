"use client"

import { CheckCircle, Plus, XCircleIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, updateDoc  } from "@firebase/firestore"
import db from "../../../firebase/firestore"
import { useUser } from "@clerk/nextjs"

const sumupaiWithoutCategory = "sumup-ai-without-category";

const headers = [
    {
        title: "Original Paragraph",
        name: "original",
        description: "Original Text Paragraph to be summarized",
    },
    {
        title: "Sumup-ai Generated Summary",
        name: "sumup-ai-without-category",
        description: "Sumup-ai"
    },
]

type formDataType = {
    [key: string]: string
}

type documentType = {
    id: string,
    text: {
        original: ""
    },
}

enum STATUS {
    LOADING,
    SUCCESS,
    ERROR,
    FORM
}

export function AddTextDrawer() {
    const { user } = useUser()
    const [step, setStep] = useState(1)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [status, setStatus] = useState<STATUS>(STATUS.FORM)
    const [formData, setFormData] = useState<formDataType>(
        headers.reduce((acc, header) => ({ ...acc, [header.name]: '' }), {})
    )
    // hendle random text selection
    const [document, setDocument] = useState<documentType | null>(null);

    const getRandomDocument = async () => {
        console.log("call.........")
        try {
            setStatus(STATUS.LOADING)
            const summariesRef = collection(db, 'evaluated-summaries-900');
            const snapshot = await getDocs(summariesRef);
            let filteredDocs: any = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.notRatedWithoutCategory == undefined) {
                    filteredDocs.push({ id: doc.id, ...data });
                }
            });
        
            if (filteredDocs.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredDocs.length);
                const document = filteredDocs[randomIndex];
                setDocument(document); 
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching text:", error);
            return null;
        } finally {
            setStatus(STATUS.SUCCESS)
        }
      }

    useEffect(() => {
        getRandomDocument();
    }, [])

    useEffect(() => {
        if (status === STATUS.SUCCESS || status === STATUS.ERROR) {
            const timer = setTimeout(() => {
                setStatus(STATUS.FORM)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [status])

    const restFormData = () => {
        setFormData(headers.reduce((acc, header) => ({ ...acc, [header.name]: '' }), {}))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleNext = () => {
        if (step < headers.length) setStep(prev => prev + 1)
    }

    const handlePrevious = () => {
        if (step > 1) setStep(prev => prev - 1)
    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        console.log('Form:', formData)
        console.log(user);

        try {
            setStatus(STATUS.LOADING)
            if (!document?.id) {
                throw new Error("Document ID is undefined");
            }
            const docRef = doc(db, 'evaluated-summaries-900', document.id);
            console.log("document ID", document.id);
            const Doc = await getDoc(docRef);
            if (!Doc.exists()) {
                throw new Error("Document not found");
            }

            const data = Doc.data();
            if (!data) {
                throw new Error("Data not found");
            }

            await updateDoc(docRef, {
                text: {
                    ...data.text,
                    [sumupaiWithoutCategory]: formData["sumup-ai-without-category"]
                },
                notRatedWithoutCategory: true,
                updatedAt: new Date().toISOString()
            })
            console.log("Scores submitted successfully");
            setStatus(STATUS.SUCCESS)
            setDocument(null)
            getRandomDocument()
            restFormData()
            setStep(1)
        } catch (err) {
            console.error(err)
            setStatus(STATUS.ERROR)
        }
    }

    const isStepValid = () => {
        const currentField = formData[headers[step - 1].name]
        return currentField.trim() !== ''
    }

    const handleCloseBtn = () => {
        setIsDrawerOpen(false)
        setStatus(STATUS.FORM)
        restFormData()
        setStep(1)
        location.reload()
    }

    const currentHeader = headers[step - 1]

    const getForm = () => (
        <div className="mx-auto w-full max-w-5xl lg:max-w-7xl h-[80dvh] lg:h-[80dvh]">
            {document != null ? 
            <>
                <DrawerHeader className="flex justify-between items-start">
                    <div className="flex flex-col items-start gap-2">
                        <DrawerTitle>{currentHeader.title}</DrawerTitle>
                        <DrawerDescription>{currentHeader.description}</DrawerDescription>
                    </div>
                    <Button variant="ghost" onClick={handleCloseBtn}>
                        <XIcon size={80} />
                    </Button>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <form onSubmit={handleSubmit}>
                        {currentHeader.name === "original" ? 
                            <Textarea
                                readOnly
                                id={currentHeader.name}
                                name={currentHeader.name}
                                value={document ? document.text["original"] : ""}
                                className="min-h-[100px] resize-none"
                                rows={18}
                            />
                            :
                            <Textarea
                                id={currentHeader.name}
                                name={currentHeader.name}
                                value={formData[currentHeader.name]}
                                onChange={handleInputChange}
                                className="min-h-[100px] resize-none"
                                rows={18}
                            />
                        }
                        <DrawerFooter className="px-0">
                            <div className="flex justify-between gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={step === 1}
                                    size="lg"
                                >
                                    Previous
                                </Button>
                                {step < headers.length ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={step !== 1 && !isStepValid()}
                                        size="lg"
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={!isStepValid()}
                                        size="lg"
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </DrawerFooter>
                    </form>
                </div>
            </>
            : 
            <div className="flex justify-between items-start">
                <p>No text for summarized</p>
                <Button variant="ghost" onClick={handleCloseBtn}>
                    <XIcon size={80} />
                </Button>
            </div>
            }
        </div>
    )

    const getLoading = () => (
        <div className="mx-auto w-full max-w-5xl lg:max-w-7xl h-[80dvh] lg:h-[80dvh]">
            <div className="flex flex-col justify-center gap-10 items-center w-full h-full">
                <span className="loader"></span>
            </div>
        </div>
    )

    const getSuccess = () => (
        <div className="flex justify-center items-center h-[80dvh]">
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <CheckCircle className="w-24 h-24 text-sky-700 mb-6" />
                <h2 className="text-xl font-semibold mb-4">Data saved successfully.</h2>
            </div>
        </div>
    )

    const getError = () => (
        <div className="flex justify-center items-center h-[80dvh]">
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <XCircleIcon className="w-24 h-24 text-rose-700 mb-6" />
                <h2 className="text-xl font-semibold mb-4">Error: Data could not be saved.</h2>
            </div>
        </div>
    )

    const getContent = () => {
        switch (status) {
            case STATUS.LOADING:
                return getLoading()
            case STATUS.SUCCESS:
                return getSuccess()
            case STATUS.ERROR:
                return getError()
            case STATUS.FORM:
                return getForm()
            default:
                return getForm()
        }
    }

    return (
        <>
            <Button className="mr-2" onClick={() => setIsDrawerOpen(true)}>
                <p>Add New </p> <Plus />
            </Button>
            <Drawer dismissible={false} open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    {getContent()}
                </DrawerContent>
            </Drawer>
        </>
    )
}