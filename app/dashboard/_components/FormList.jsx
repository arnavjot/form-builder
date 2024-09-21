"use client";
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import FormListItem from './FormListItem';

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);
    console.log(result);
  };

  return (
    // Ensure the container spans the full height of the viewport and grid columns are properly set
    <div className=" bg-white p-5"> {/* bg-white ensures no black screen */}
      {/* Improved grid styling */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {formList.length > 0 ? (
          formList.map((form, index) => (
            <div key={index}>
              <FormListItem 
                jsonForm={JSON.parse(form.jsonform)}
                formRecord={form}
                refreshData={GetFormList}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No forms found. Create a new one!
          </p>
        )}
      </div>
    </div>
  );
}

export default FormList;
