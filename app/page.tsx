import { NavBar } from "@/components/layout/NavBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { Pagination } from "@/components/ui/Pagination";

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    name: "Example Name",
    handle: "examplename",
    timestamp: "2h",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    imageSrc: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    imageAlt: "Golden hour light through green foliage",
    tags: [{ label: "nature" }, { label: "goldenhour" }, { label: "photography" }],
    likes: 3,
    liked: true,
  },
  {
    id: 2,
    name: "Fake User",
    handle: "fake_user",
    timestamp: "4h",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [{ label: "art" }, { label: "history" }, { label: "architecture" }],
    likes: 5,
    bookmarked: true,
  },
  {
    id: 3,
    name: "Place Holder",
    handle: "placeholder",
    timestamp: "6h",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    imageAlt: "Coastal landscape in warm film tones",
    tags: [{ label: "analog" }, { label: "filmphotography" }, { label: "coast" }],
    likes: 1,
  },
];

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  return (
    <div className="min-h-screen bg-surface">
      <NavBar avatarInitials="AJ" />

      <Feed>
        {PLACEHOLDER_POSTS.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        <Pagination page={page} hasOlder={page < 3} />
      </Feed>

      <BottomNav />
    </div>
  );
}
