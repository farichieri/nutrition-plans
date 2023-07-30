import { getPlansAvailable } from "@/utils";
import { MDDirectories, getSortedData } from "@/utils/mds";
import { Posts, PlansType } from "@/types";

const url = "https://nutritionplans.co";

function generateSiteMap(posts: Posts, plans: PlansType) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${["", "/blog", "/plans", "/about", "/pricing"]
       .map(
         (route) =>
           `<url>
          <loc>${url}${route}</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </url>`
       )
       .join("")}
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>${`${url}/blog/${post.id}`}</loc>
           <lastmod>${post.date}</lastmod>
       </url>
     `;
       })
       .join("")}
     ${plans
       .map((plan) => {
         return `
          <url>
           <loc>${`${url}/plans/${plan.id}`}</loc>
           <lastmod>${plan.date}</lastmod>
       </url>
       `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: { res: any }) {
  const posts = getSortedData(MDDirectories.posts);
  const plans = getPlansAvailable();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, plans);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
