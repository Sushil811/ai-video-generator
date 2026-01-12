import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";

export async function POST(req:NextRequest){
    const user = await currentUser();

    //if User Already Exists
    const users = await db.select().from(usersTable)
    .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress as string));

    //If User Does Not Exist, Create New User
    if(users?.length===0){
        const newUser = await db.insert(usersTable).values({
            email:user?.primaryEmailAddress?.emailAddress as string,
            name:user?.firstName as string
        }).returning();

        return NextResponse.json(newUser[0]);
    }
    return NextResponse.json(users[0]);
    

}