"use client"

import { CheckCircle, Plus, XCircleIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { addDoc, collection } from "@firebase/firestore"
import db from "../../../firebase/firestore"
import { useUser } from "@clerk/nextjs"

const headers = [
    {
        title: "Original Paragraph",
        name: "original",
        description: "Original Text Paragraph to be summarized",
    },
    {
        title: "GPT Generated Summary",
        name: "gpt",
        description: "GPT-4o"
    },
    {
        title: "Cloude Generated Summary",
        name: "cloude",
        description: "Cloude 3.5 Sonnet"
    },
    {
        title: "Llama 3 Generated Summary",
        name: "llama",
        description: "Llama-3.1405B"
    }
]

type formDataType = {
    [key: string]: string
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
            const doc = await addDoc(collection(db, 'summaries'), {
                createdBy: {
                    id: user?.id,
                    email: user?.emailAddresses[0].emailAddress,
                    fullName: user?.fullName,
                    imageUrl: user?.imageUrl
                },
                text: formData,
                createdAt: new Date().toISOString()
            })

            doc ? setStatus(STATUS.SUCCESS) : setStatus(STATUS.ERROR)
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
    }

    const currentHeader = headers[step - 1]

    const getForm = () => (
        <div className="mx-auto w-full max-w-7xl h-[80dvh] lg:h-[80dvh]">
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
                    <Textarea
                        id={currentHeader.name}
                        name={currentHeader.name}
                        value={formData[currentHeader.name]}
                        onChange={handleInputChange}
                        className="min-h-[100px] resize-none"
                        rows={18}
                    />
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
                                    disabled={!isStepValid()}
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
        </div>
    )

    const getLoading = () => (
        <div className="mx-auto w-full max-w-7xl h-[80dvh] lg:h-[80dvh]">
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
            <Button onClick={() => setIsDrawerOpen(true)}>
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