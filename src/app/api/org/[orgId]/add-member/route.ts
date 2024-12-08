// import { JobAdding } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
// import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // const body: unknown = await request.json();

    // const result = JobAdding.safeParse(body);
    // let zodErrors = {};

    // if (!result.success) {
    //     result.error.issues.forEach((issue) => {
    //         zodErrors = {...zodErrors, [issue.path[0]]: issue.message};
    //     });
    // }

    // if (Object.keys(zodErrors).length > 0) {
    //     return NextResponse.json({ errors: zodErrors }, { status: 400 });
    // }

    const apiUrl = formatExternalUrl("/api/org/add-member");
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })

    console.log(res)
  } catch (error) {
    
  }


  
}