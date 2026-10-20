import WorkspaceLogoUpload from "../../../../components/workspace/workspace-logo-upload";



type WorkspaceSettingsPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function WorkspaceSettingsPage({
  params,
}: WorkspaceSettingsPageProps) {

  const { slug } = await params;

  return (
    <div>
      <h1>
        Workspace Settings
      </h1>

      <WorkspaceLogoUpload slug={slug}/>
    </div>
  )
}