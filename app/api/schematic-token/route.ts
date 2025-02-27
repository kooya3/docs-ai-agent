// app/api/schematic-token/route.ts
import { SchematicClient } from "@schematichq/schematic-typescript-node"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = new SchematicClient({
      apiKey: process.env.SCHEMATIC_API_KEY,
    });

    // First ensure the company exists
    await client.companies.upsertCompany({
      keys: { id: "comp_DXYRxmNT9Z6" },
      traits: {
        name: "Elyees T.", // Update with actual org name if available
      }
    });

    // Then create access token
    const response = await client.accesstokens.issueTemporaryAccessToken({
      resourceType: "company",
      lookup: { companyId: "comp_DXYRxmNT9Z6" },
    });

    return NextResponse.json({ token: response.data?.token });
  } catch (error) {
    console.error("[SchematicToken] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}