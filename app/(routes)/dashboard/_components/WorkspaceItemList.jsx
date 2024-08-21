"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig'
import WorkspaceOptions from "@/app/(routes)/dashboard/_components/WorskspaceOptions"
function WorkspaceItemList({workspaceList,getWorkspaceList}) {

  
  const router=useRouter();
  const OnClickWorkspaceItem=(workspaceId)=>{
      router.push('/workspace/'+workspaceId)
  }


    const DeleteWorkspace=async(workspaceid)=>{
      
      await deleteDoc(doc(db, "Workspace",workspaceid.toString()));
      getWorkspaceList();
      
      
      toast('Document Deleted !')
    }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {workspaceList&&workspaceList.map((workspace,index)=>(
            <div key={index} className='border shadow-xl rounded-xl
            hover:scale-105 transition-all cursor-pointer'
           
            >
                <div onClick={()=>OnClickWorkspaceItem(workspace.id)}>
                <Image src={workspace?.coverImage} 
                width={400} height={200} alt='cover'
                className='h-[150px] object-cover rounded-t-xl'
                />
                </div>
                <div className='p-4 rounded-b-xl '>
                    <h2 className='flex gap-2'>{workspace?.emoji} {workspace.workspaceName}</h2>
                    
                </div>
                <div className='relative flex justify-end items-center bottom-9 right-2'>
                    <WorkspaceOptions workspace={workspace} deleteWorkspace={(workspaceid)=>DeleteWorkspace(workspaceid)}/>
                    </div>
            </div>
            
        ))}
    </div>
  )
}

export default WorkspaceItemList