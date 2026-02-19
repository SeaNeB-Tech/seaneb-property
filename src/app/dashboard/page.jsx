import { redirect } from "next/navigation";
import { getAuthAppUrl } from "@/lib/authAppUrl";

export default function DashboardPage() {
  redirect(getAuthAppUrl("/dashboard"));
}
