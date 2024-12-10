import { formatExternalUrl } from "@/lib/utils";


export async function POST(request: Request) {
  try {


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