import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // using schema above validate body of request
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating new issue:", error);

    // Return a generic error response
    return NextResponse.json(
      { error: "An error occurred while creating the issue." },
      { status: 500 }
    );
  }
}

// GET issues all
export async function GET(request: NextRequest) {
  try {
    const issuesArray = await prisma.issue.findMany();
    return NextResponse.json(issuesArray, {status: 200})
  } catch (error){
    console.error("Error retrieveing issues:", error);
     // Return a generic error response
     return NextResponse.json(
      { error: "An error occurred while retrieveing issues." },
      { status: 500 }
    );
  }
}
