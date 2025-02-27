// app/lib/actions.ts
"use server"

export type FormState = {
  errors?: {
    url?: string[];
    files?: string[];
  };
  success?: boolean;
  message?: string;
};


export async function analyzeContent(prevState: FormState, formData: FormData): Promise<FormState> {
  const files = formData.getAll("files") as File[]
  const url = formData.get("url") as string

  // Validate inputs
  const errors: FormState["errors"] = {}
  
  if (!url && files.length === 0) {
    errors.url = ["Please provide either a URL or upload files"]
    errors.files = ["Please provide either a URL or upload files"]
  }

  if (errors.url || errors.files) {
    return { errors }
  }

  // Process content here (both files and URL)
  
  return {
    success: true,
    message: "Analysis started successfully"
  }
}