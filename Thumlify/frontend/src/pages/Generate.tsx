import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colorSchemes, dummyThumbnails, type AspectRatio, type IThumbnail, type ThumbnailStyle } from "../../assets/assets.ts";
import SoftBackdrop from "../components/SoftBackdrop.tsx";
import AspectRatioSelector from "../components/AspectRatioSelector.tsx";
import StyleSelector from "../components/StyleSelector.tsx";
import ColorSchemaSelector from "../components/ColorSchemaSelector.tsx";
import PreviewPanel from "../components/PreviewPanel.tsx";

const Generate = () => {
  const {id} = useParams();
  const [title,setTitle] = useState("");
  const [additionalDetails,setAdditionalDetails] = useState("");

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemaId, setColorSchemaId] = useState<string>(colorSchemes[0].id);  
  const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic');

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {

  }
  const fetchThumbnail = async () => {  
    if(id){
      const thumbnail : any = dummyThumbnails.find((t) => t._id === id);
      setThumbnail(thumbnail);
      setAdditionalDetails(thumbnail.user_prompt)
      setTitle(thumbnail.title)
      setColorSchemaId(thumbnail.color_scheme)
      setAspectRatio(thumbnail.aspect_ratio)
      setStyle(thumbnail.style)
      setLoading(false)
    }

  }

  useEffect(() => {
    if (id){
      fetchThumbnail();
    }
  },[id])

  return (
    <>
    <SoftBackdrop/>
    <div className="pt-24 min-h-screen ">
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
      <div className="grid lg:grid-cols-[400px_1fr] gap-8">
        {/*left panel*/}
        <div className={`space-y-6 ${id ? 'pointer-events-none' : ''}`}>
          <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-100">Create your Thumbnail</h2>
              <p className="text-zinc-400">Describe your vision and let AI bring it to life</p>
            </div>

            {/* Content goes here */}
            <div className="space-y-5">
              {/* Title Input */ }
              <div>
                <label className="block text-sm font-medium px-1.5 pb-1"> Title or Topic</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="Enter a title or topic" className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/12 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                <div className="flex justify-end text-stone-400">
                  <span>{title.length}/100</span>
                </div>
              </div>
              {/*AspectRatioSelector */}
              <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio}/>
              {/*styleSelector*/}
              <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen}/>
              {/*colorschemaSelector*/}
              <ColorSchemaSelector value={colorSchemaId} onChange={setColorSchemaId}/>

              {/*Details */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Additional Prompts <span className="text-zinc-400 text-xs">(optional)</span></label>
                <textarea value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} rows={3} placeholder="Add any specific elements, mood, or style preferences..." className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/12 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none" />
              </div>


            </div>

            {/*button*/}
            {!id && (
              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-gradient-to-b from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
              >
                {loading ? 'Generating...' : 'Generate Thumbnail'}
              </button>
            )}
          </div>
        </div>
        
        {/* Right panel placeholder to satisfy the grid */}
        <div>
          <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
            <h2>Preview</h2>
            <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
          </div>
          </div> 
      </div>
    </main>
  </div>
</>
  )
}

export default Generate