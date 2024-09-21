"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import moment from "moment";
import { LibraryBig, LineChart, MessageSquare, Shield, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const dialogStyles = {
  content: { backgroundColor: "white", color: "black" },
  header: { backgroundColor: "white", color: "black" },
  title: { color: "black" },
  description: { color: "black" },
};

const PROMPT = ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields, radio buttons and checkbox and select field type options will be in array only and in JSON format, don't give explanation, only give json object without any annotations or extra formatting.";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const { user } = useUser();
  const path = usePathname();
  const router = useRouter();
  const [formList, setFormList] = useState([]);
  const [PercFileCreated, setPercFileCreated] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
    const perc = (result.length / 3) * 100;
    setPercFileCreated(perc);
  };

  const onCreateForm = async () => {
    if (formList?.length === 3) {
      toast("Upgrade to create unlimited forms");
      return;
    }
    setLoading(true);

    try {
      const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
      const responseText = await result.response.text();

      if (responseText) {
        const resp = await db
          .insert(JsonForms)
          .values({
            jsonform: responseText,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: JsonForms.id });

        console.log("New Form ID", resp[0].id);
        if (resp[0].id) {
          router.push("/edit-form/" + resp[0].id);
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
    <div className="h-screen shadow-md border bg-white">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 
            hover:bg-primary hover:text-white rounded-lg
            cursor-pointer text-gray-500
            ${path === menu.path && "bg-primary text-white"}
            `}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>

      {/* Add padding above the Create Form button */}
      <div className="fixed bottom-7 p-6 w-64"> {/* mt-10 adds padding above */}
        <Button className="w-full" onClick={() => setOpenDialog(true)}>+ Create Form</Button>
        <div className="my-3">
          <Progress value={PercFileCreated} />
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>{formList?.length} </strong>Out of <strong>3</strong> File Created
          </h2>
          <h2 className="text-xs font-bold mt-3 text-gray-600">
            Upgrade your plan for unlimited AI form build
          </h2>
        </div>
      </div>

      {/* Dialog for creating a new form */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent style={dialogStyles.content}>
          <DialogHeader style={dialogStyles.header}>
            <DialogTitle style={dialogStyles.title}>Create new form</DialogTitle>
            <DialogDescription style={dialogStyles.description}>
              <Textarea
                className="my-2"
                onChange={(event) => setUserInput(event.target.value)}
                placeholder="Write description of your form"
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button onClick={() => setOpenDialog(false)} variant="destructive">Cancel</Button>
                <Button
                  className="bg-red-200 text-red-700 hover:text-white hover:bg-red-500 hover:font-normal"
                  disabled={loading}
                  onClick={onCreateForm}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SideNav;
