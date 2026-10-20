import type { ReactNode } from "react";
import WorkspaceShell from "../../../components/layout/workspace-shell";

export const instant = false;

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <WorkspaceShell slug={slug}>{children}</WorkspaceShell>;
}
