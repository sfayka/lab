import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PostList } from "@/components/post-list"
import { Footer } from "@/components/footer"

export default function LabPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-6">
        <Hero />
        <PostList />
      </main>
      <Footer />
    </div>
  )
}
