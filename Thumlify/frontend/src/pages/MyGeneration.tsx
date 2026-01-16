import { useEffect, useState } from "react"
import SoftBackdrop from "../components/SoftBackdrop"
import { dummyThumbnails, type IThumbnail } from "../../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react"



function MyGeneration() {
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading, setLoading] = useState(false)

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  }
  const navigate = useNavigate();

  const fetchThumbnails = async () => {
    // simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setThumbnails(dummyThumbnails as IThumbnail[])
    setLoading(false)
  }

  const handleDownload = (image_url: string) => {
    if (!image_url) return
    window.open(image_url, "_blank")
  }

  const handleDelete = (id: string) => {
    setThumbnails(prev => prev.filter(thumbnail => thumbnail._id !== id))
  }

  useEffect(() => {
    fetchThumbnails()
  }, [])

  return (
    <>
      <SoftBackdrop />

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and manage all your AI-generated thumbnails
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="rounded-2xl bg-white/6  border border-white/10 animate-pulse h-[260px]" />
            ))}
          </div>
        )}

        {/* Thumbnails Grid */}

        {!loading && thumbnails.length === 0 && (
          <div className="text-center text-zinc-400 mt-20">
            <p className="text-lg">No Thumbnails found.</p>
            <p className="mt-2">Start generating some AI thumbnails!</p>
          </div>
        )}

        {/* Thumbnails Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];

              return (
                <div key={thumb._id} onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 shadow-xl border-inside-avoid">

                  {/* Thumbnail Image */}
                  <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                    {thumb.image_url ? (
                      <img src={thumb.image_url} alt={thumb.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div>{thumb.isGenerating ? 'generating...' : 'No image'}</div>
                    )}
                    {thumb.isGenerating && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">Generating...</div>}
                  </div>
                  {/*content*/}
                  <div className="p-4 space-y-2 ">
                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{thumb.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-white/8">{thumb.style}</span>
                      <span className="px-2 py-0.5 rounded bg-white/8">{thumb.color_scheme}</span>
                      <span className="px-2 py-0.5 rounded bg-white/8">{thumb.aspect_ratio}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{new Date(thumb.createdAt!).toLocaleDateString()}</p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className="absolute button-3 right-3 max-sm:flex sm:hidden group-hover:flex gap-1.5">
                    <TrashIcon onClick={() => handleDelete(thumb._id)} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"/>

                    <DownloadIcon onClick={() => handleDownload(thumb.image_url!)} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all"/>

                    <Link target="_blank" to={`/preview?thumbnail_url=${encodeURIComponent(thumb.image_url!)}&title=${encodeURIComponent(thumb.title)}`}>
                      <ArrowUpRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                    </Link>
                    
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </div>

    </>
  )
}


export default MyGeneration
