import { JobAdding } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = JobAdding.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = {...zodErrors, [issue.path[0]]: issue.message};
        });
    }

    if (Object.keys(zodErrors).length > 0) {
        return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    const apiUrl = formatExternalUrl("/api/org/1/open-job");

    const dataToBeSend = {
        organization_id: 1,
        title: result.data?.title,
        scope: result.data?.scope,
        prerequisite: result.data?.prerequisite,
        workplace: result.data?.workplace,
        worktype: result.data?.worktype,
        period: result.data?.period,
        descriptioin: result.data?.description,
        hours_per_day: result.data?.hours_per_day,
        qualifications: result.data?.qualifications,
        benefits: result.data?.benefits,
        quantity: result.data?.quantity,
        salary: result.data?.salary,
    }

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBeSend),
    });

    if (!res.ok) {
        // If Go server returns an error, return the error message
        const errorData = await res.json();
        return NextResponse.json(
          { errors: errorData.message || "Failed to signup" },
          { status: res.status }
        );
    }

    const responseData = await res.json();

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error("Error in POST API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } 
}