import { JobAdding } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(request: Request, 
    { params }: { params: { orgId: string , jobId: string }}
) {
    try {
        // Parse the incoming request body
        const body: unknown = await request.json();
    
        // Validate the data using Zod schema
        const result = JobAdding.safeParse(body);
        let zodErrors: Record<string, string> = {};
    
        // Collect validation errors if any
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                zodErrors = {...zodErrors, [issue.path[0]]: issue.message};
            });
        }
    
        // If validation failed, return the error response
        if (Object.keys(zodErrors).length > 0) {
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }
    
        // Send data to Golang backend if validation is successful
        const apiUrl = formatExternalUrl(`/org/${params.orgId}/update-job/${params.jobId}`);
        // console.log(apiUrl);

        const dataToBeSend = {
            id: parseInt(params.jobId),
            organization_id: parseInt(params.orgId),
            title: result.data?.title,
            scope: result.data?.scope,
            prerequisite: result.data?.prerequisite,
            workplace: result.data?.workplace,
            work_type: result.data?.work_type,
            career_stage: result.data?.career_stage,
            period: result.data?.period,
            description: result.data?.description,
            hours_per_day: result.data?.hours_per_day,
            qualifications: result.data?.qualifications,
            benefits: result.data?.benefits,
            quantity: result.data?.quantity,
            salary: result.data?.salary,
        }
        
        const res = await fetch(apiUrl, {
            cache: "no-cache",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToBeSend),
        });

        // console.log("Data being sent to the backend:", JSON.stringify(dataToBeSend, null, 2));
    
        if (!res.ok) {
            // If Go server returns an error, return the error message
            const errorData = await res.json();
            return NextResponse.json(
            { errors: errorData.message || "Failed to update job" },
            { status: res.status }
            );
        }
    
        const resData = await res.json();
    
        return NextResponse.json(resData, { status: res.status });
    } catch (error) {
        return NextResponse.json({ errors: error }, { status: 500 });
    }
}