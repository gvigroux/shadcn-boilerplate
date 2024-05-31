"use server";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "@/lib/i18n";
import * as z from "zod";

function formatError(error: any) {
  if (error instanceof Error) {
    console.log(error.message);
    return { error: error.message };
  }
  console.log(error);
  return { error: "Unknown error" };
}

// define schema for input validation
const siteSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});

export async function createSite(formData: FormData) {
  const session = await getRequiredAuthSession();
  const validatedFields = siteSchema.safeParse({
    name: formData.get("name"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.site.create({
      data: {
        userId: session.user.id,
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return formatError(error);
  }
  revalidatePath("/site");
  redirect("/site");
}

export async function deleteSite(id: string) {
  const session = await getRequiredAuthSession();

  try {
    await prisma.site.delete({
      where: {
        userId: session.user.id,
        id: id,
      },
    });
  } catch (error) {
    return formatError(error);
  }
  revalidatePath("/site");
}

//****************************************/

// define schema for input validation
const domainSchema = z.object({
  domain: z.string().min(1, "Domain name is required").max(100),
  urlPrivacyPolicy: z.string().min(1, "Privacy Policy is required").max(100),
});

export async function createDomain(formData: FormData) {
  const session = await getRequiredAuthSession();

  const validatedFields = domainSchema.safeParse({
    domain: formData.get("domain"),
    urlPrivacyPolicy: formData.get("urlPrivacyPolicy"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    await prisma.domain.create({
      data: {
        userId: session.user.id,
        domain: validatedFields.data.domain,
        urlPrivacyPolicy: validatedFields.data.urlPrivacyPolicy,
      },
    });
  } catch (error) {
    return formatError(error);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteDomain(id: string) {
  const session = await getRequiredAuthSession();

  try {
    await prisma.domain.delete({
      where: {
        userId: session.user.id,
        id: id,
      },
    });
  } catch (error) {
    return formatError(error);
  }
  revalidatePath("/dashboard");
}
