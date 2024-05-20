import Link from "next/link";

import { ContentLayout } from "@/components/boilerplate/ContentLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="flex flex-col relative">
              <img
                src="https://shadcn-ui-sidebar.salimi.my/_next/image?url=%2Fplaceholder.png&w=320&q=40"
                alt="Placeholder Image"
              />
              <div className="absolute -bottom-8 right-0">
                <Link
                  href="https://www.freepik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground"
                >
                  Designed by Freepik
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
