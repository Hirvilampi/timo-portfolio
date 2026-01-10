import { TVProduction } from "@/components/TVProduction";
import { supabase } from "@/lib/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const tvImagesPrefix = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/tv_images/`
  : "";

function toSupabaseImageUrl(image?: string | null) {
  if (!image) return image;
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  const trimmed = image.replace(/^\/+/, "").replace(/^assets\/tv_images\//, "");
  return `${tvImagesPrefix}${trimmed}`;
}

export async function getTVProduction(slug: string) {
  const { data, error } = await supabase
    .from("tvproductions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return {
    ...(data as TVProduction),
    image: toSupabaseImageUrl((data as TVProduction).image),
  };
}
