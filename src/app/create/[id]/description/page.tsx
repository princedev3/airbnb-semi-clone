import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Counter from '@/components/Counter'
import CreationBottonBar from '@/components/CreationBottonBar'
import { createDescription } from '@/static/actions'


const page = ({params}:{params:{id:string}}) => {
  return (
    <div className="w-full mx-auto mt-2 relative">
    <div className="w-3/5 mx-auto mt-2 relative">
     <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        Please describe your home as good as you can
     </h2>
    </div>
    <form action={createDescription}  className="">
      <input type='hidden' name='homeId' value={params.id}/>
        <div className="mx-auto w-3/5 flex mt-10  flex-col gap-y-5 mb-36">
        <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name='title' required placeholder='short and simple...'/>
        </div>
        <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name='description' placeholder='please describe your home' required/>
        </div>
        <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input name='price' min={10} type='number' required placeholder='price per night in usd...'/>
        </div>
        <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name='image'  type='file' required />
        </div>
        <Card>
  <CardHeader className='flex flex-col gap-y-5'>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Guests</h2>
            <p className="text-muted-foreground text-sm">how many guest do you want?</p>
           </div>
           <Counter name='guest'/>

    </div>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Rooms</h2>
            <p className="text-muted-foreground text-sm">how many rooms do you want</p>
           </div>
           <Counter name='room'/>

    </div>
    <div className="flex flex-center justify-between">
           <div className="flex flex-col">
            <h2 className="underline font-medium">Bathrooms</h2>
            <p className="text-muted-foreground text-sm">how many bathroom do you want?</p>
           </div>
           <Counter name='bathroom'/>

    </div>
  </CardHeader>
</Card>
        </div>
       
        <CreationBottonBar/>
        
    </form>
    </div>
  )
}

export default page