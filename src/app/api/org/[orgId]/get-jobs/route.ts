import { formatExternalUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const apiUrl = formatExternalUrl(`/org/${params.orgId}/open-jobs`);
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText} (${res.status})`);
    }

    const resData = await res.json();
    // console.log(resData);
    return NextResponse.json(resData, { status: res.status });
  } catch (error) {
    return NextResponse.json({ errors: error }, { status: 500 });
  }
}
