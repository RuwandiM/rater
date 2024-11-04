'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit2, Trash2 } from 'lucide-react'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from '@firebase/firestore'
import db from '../../../../firebase/firestore'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button'

export default function StickyHeaderTable() {
    const [tableData, setTableData] = useState<any>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false)

    const fetchData = async () => {
        try {
            setIsDataLoading(true)
            const q = query(collection(db, "summaries"), orderBy("createdAt", "desc"))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(data)
            setTableData(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        } finally {
            setIsDataLoading(false)
        }
    }


    const handleDelete = async () => {
        if (deleteId) {
            try {
                const docRef = doc(db, "summaries", deleteId)
                await deleteDoc(docRef)
                setTableData(tableData.filter((item: any) => item.id !== deleteId))
                console.log(`Document with ID ${deleteId} deleted successfully.`)
            } catch (error) {
                console.error("Error deleting document: ", error)
            }
        } else {
            console.error("No document ID provided for deletion.")
        }
        setDeleteId(null)
    }


    useEffect(() => {
        fetchData()
    }, [])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ')
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...'
        }
        return text
    }

    const isAi = (data: string[], ai: string) => {
        if (data.length > 0) {
            return !data.includes(ai)
        }
        return true
    }

    const getRatedByName = (data: any, ai: string) => {
        if (data[ai]) {
            return data[ai].ratedBy.fullName
        } else {
            return 'None'
        }
    }

    const getRatedByAvatar = (data: any, ai: string) => {
        if (data[ai]) {
            return data[ai].ratedBy.imageUrl
        }
        return ''
    }


    const ConfirmDialog = (id: string) => {


        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" onClick={() => setDeleteId(id)}>
                        {
                            deleting(id) ? (
                                <span className="small-loader"></span>
                            ) : <Trash2 className="h-4 w-4" />
                        }

                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete this record.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {
                            setDeleteId(null)
                        }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const deleting = (id: string) => {
        return deleteId && deleteId === id
    }


    if (isDataLoading) {
        return (
            <div className="flex justify-center items-center h-[70dvh]">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                    <span className="loader"></span>
                </div>
            </div>
        )
    }

    if (tableData.length <= 0) return null

    return (
        <div>
            <div className="relative h-[500px] overflow-auto border rounded-md">
                <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-gray-100 shadow-sm z-10">
                        <tr>
                            <th className="p-2 text-center border-b">#</th>
                            <th className="p-2 text-left border-b">Original Text</th>
                            <th className="p-2 text-left border-b">Created By</th>
                            <th className="p-2 text-left border-b">Created At</th>
                            <th className="p-2 text-left border-b">GPT</th>
                            <th className="p-2 text-left border-b">Claude</th>
                            <th className="p-2 text-left border-b">Llama</th>
                            <th className="p-2 text-right border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row: any, index: number) => (
                            <tr key={row.id} className={`hover:bg-gray-100 p-2 `}>
                                <td width={50} className="p-2 border-b text-center font-semibold text-sm">{index + 1}</td>
                                <td width={400} className="p-2 border-b text-sm">{truncateText(row?.text?.original, 15)}</td>
                                <td width={120} className="p-2 border-b">
                                    <div className="flex items-center justify-center space-x-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage sizes='md' src={row.createdBy.imageUrl} alt={row.createdBy.fullName} />
                                                        <AvatarFallback className='text-sm'>{row?.createdBy?.fullName?.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{row.createdBy.fullName}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </td>
                                <td width={200} className="p-1 border-b text-sm">{formatDate(row.createdAt)}</td>
                                <td className="p-2 border-b">
                                    {isAi(row.notRated, 'gpt') ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src={getRatedByAvatar(row.scores, 'gpt')} alt={getRatedByName(row.scores, 'gpt')} />
                                                        <AvatarFallback>{getRatedByName(row.scores, 'gpt')}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{getRatedByName(row.scores, 'gpt')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="p-2 border-b">
                                    {isAi(row.notRated, 'cloude') ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src={getRatedByAvatar(row.scores, 'cloude')} alt={getRatedByName(row.scores, 'cloude')} />
                                                        <AvatarFallback>{getRatedByName(row.scores, 'cloude')}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{getRatedByName(row.scores, 'cloude')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="p-2 border-b">
                                    {isAi(row.notRated, "llama") ? (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src={getRatedByAvatar(row.scores, 'llama')} alt={getRatedByName(row.scores, 'llama')} />
                                                        <AvatarFallback>{getRatedByName(row.scores, 'llama')}</AvatarFallback>
                                                    </Avatar>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{getRatedByName(row.scores, 'llama')}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="p-2 text-right border-b flex items-start justify-evenly gap-4">
                                    {ConfirmDialog(row.id)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 gap-4">
                <div className="border-2 rounded-sm p-2 flex gap-3 justify-center items-center">
                    <p className="font-bold">Total Records: </p>
                    <h1 className='text-xl font-bold'>{tableData.length}</h1>
                </div>
            </div>
        </div>
    )
}