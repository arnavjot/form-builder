"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AiChatSession } from '@/configs/AiModal'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'
import { Loader2} from 'lucide-react' // Importing the X icon for close button
import { toast } from 'sonner'
import { desc, eq } from 'drizzle-orm'

const dialogStyles = {
  content: { backgroundColor: 'white', color: 'black' },
  header: { backgroundColor: 'white', color: 'black' },
  title: { color: 'black' },
  description: { color: 'black' }
};

const PROMPT = ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, radio buttons and checkbox and select field type options will be in array only and in JSON format, dont give explanation only give json object please also dont give '''json such kind of thing only give object in curly braces";

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();
  const [formList, setFormList] = useState();

  useEffect(() => { 
    user && GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db.select().from(JsonForms)
    .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(JsonForms.id));

    setFormList(result);
  }

  const onCreateForm = async () => {
    if (formList?.length == 3) {
      toast('Upgrade to create unlimited forms');
      return;
    }
    setLoading(true);
    
    try {
      const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
      console.log(result.response.text());

      if (result.response.text()) {
        const resp = await db.insert(JsonForms)
          .values({
            jsonform: result.response.text(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/yyyy')
          }).returning({ id: JsonForms.id });
        
        console.log("New Form ID", resp[0].id);
        if (resp[0].id) {
          route.push('/edit-form/' + resp[0].id);
        }
        setOpenDialog(false); // Close the dialog after successful form creation
      }
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Button onClick={() => setOpenDialog(true)}>Create Form +</Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}> {/* Add onOpenChange to control open state */}
          <DialogContent style={dialogStyles.content}>
            <DialogHeader style={dialogStyles.header}>
              <div className="flex justify-between items-center">
                <DialogTitle style={dialogStyles.title}>Create new form</DialogTitle>
                
              </div>
              <DialogDescription style={dialogStyles.description}>
                <Textarea
                  className="my-2"
                  onChange={(event) => setUserInput(event.target.value)}
                  placeholder="Write description of your form here..."
                />
                <div className="flex gap-2 my-3 justify-end">
                  <Button onClick={() => setOpenDialog(false)} variant="destructive">Cancel</Button>
                  <Button className='bg-red-200 text-red-700 hover:text-white hover:bg-red-500 hover:font-normal' 
                  disabled={loading}
                  onClick={onCreateForm}>
                    {loading ? <Loader2 className='animate-spin'/> : 'Create'}
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default CreateForm;
