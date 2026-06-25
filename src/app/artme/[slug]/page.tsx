import { notFound } from "next/navigation";
import Gallery from "../_components/Gallery";
import ModelRoom from "../_components/ModelRoom";
import CloudRoom from "../_components/CloudRoom";
import MeltyRoom from "../_components/MeltyRoom";
import FacetRoom from "../_components/FacetRoom";
import KeyedMeshRoom from "../_components/KeyedMeshRoom";
import MesaTest from "../_components/MesaTest";
import GrisRoom from "../_components/GrisRoom";
import FaroRoom from "../_components/FaroRoom";
import ColumnsRoom from "../_components/ColumnsRoom";
import CallistaRoom from "../_components/CallistaRoom";
import ProcesoRoom from "../_components/ProcesoRoom";
import { ROOMS, MANIFEST, getRoom } from "../collections";
import { getLayout } from "../layouts";

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRoom(slug);
  if (!r) notFound();

  if (r.type === "3d" && r.model) {
    return <ModelRoom slug={slug} n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} model={r.model} iosModel={r.iosModel} exposure={r.exposure} />;
  }

  if (r.type === "splat" && r.splat) {
    return <CloudRoom slug={slug} n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} ply={r.splat} brightness={r.cloudBright} additive={r.cloudAdditive} defaultBrush={r.defaultBrush} brushToggle={r.brushToggle} />;
  }

  if (r.type === "melty" && r.splat && r.subject) {
    return <MeltyRoom slug={slug} n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} ply={r.splat} subject={r.subject} brightness={r.cloudBright} defaultBrush={r.defaultBrush} />;
  }

  if (r.type === "facet" && r.model) {
    return <FacetRoom slug={slug} n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} model={r.model} />;
  }

  if (r.type === "keyed" && r.model) {
    return <KeyedMeshRoom n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} model={r.model} />;
  }

  if (r.type === "flip") {
    return <MesaTest n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} />;
  }

  if (r.type === "slideshow") {
    return <GrisRoom title={r.title} subtitle={r.subtitle} />;
  }

  if (r.type === "row") {
    return <FaroRoom title={r.title} subtitle={r.subtitle} />;
  }

  if (r.type === "columns") {
    return <ColumnsRoom n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} />;
  }

  if (r.type === "callista") {
    return <CallistaRoom shots={MANIFEST[slug] ?? []} deleted={getLayout(slug).deleted ?? []} />;
  }

  if (r.type === "proceso") {
    return <ProcesoRoom n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} shots={MANIFEST[slug] ?? []} slug={slug} edits={getLayout(slug).edits ?? {}} />;
  }

  const shots = MANIFEST[slug] ?? [];
  return <Gallery slug={slug} n={r.n} title={r.title} subtitle={r.subtitle} blurb={r.blurb} shots={shots} freeform={r.freeformGallery} grid={r.grid} grouped={r.grouped} />;
}
