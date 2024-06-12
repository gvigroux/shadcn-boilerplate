import * as m from "@/paraglide/messages.js";

import { BreadCrumb } from "@/components/boilerplate/bread-crumb";
import { ContentLayout } from "@/components/boilerplate/dashboard/contentLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <ContentLayout title={m.title()}>
      <BreadCrumb
        links={[{ href: m.path_dashboard(), name: m.menu_dashboard() }]}
        current={m.menu_domain()}
      ></BreadCrumb>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="flex flex-col relative">coucou</div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
