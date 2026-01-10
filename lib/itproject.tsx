import { ITProject } from "@/components/ITProject";
import { supabase } from "@/lib/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const itImagesPrefix = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/it_images/`
  : "";

function toSupabaseImageUrl(image?: string | null) {
  if (!image) return image;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const trimmed = image.replace(/^\/+/, "").replace(/^assets\/it_images\//, "");
  return `${itImagesPrefix}${trimmed}`;
}

export async function getITProject(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return {
    ...(data as ITProject),
    image: toSupabaseImageUrl((data as ITProject).image),
  };
}
