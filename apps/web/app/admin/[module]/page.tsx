import { notFound } from "next/navigation"
import { adminModules } from "../admin-control-data"
import { AdminModulePage } from "../admin-module-page"

export default async function AdminDynamicModulePage({
  params,
}: {
  params: Promise<{ module: string }>
}) {
  const { module: slug } = await params
  const adminModule = adminModules.find((item) => item.slug === slug)

  if (!adminModule) {
    notFound()
  }

  return <AdminModulePage module={adminModule} />
}
