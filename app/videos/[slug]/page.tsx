import type React from "react"

interface VideoPageProps {
  params: { slug: string }
}

const VideoPage: React.FC<VideoPageProps> = ({ params }) => {
  const { slug } = params

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-garamond font-bold mb-4">Video Title - {slug}</h1>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="prose">
        <h2 className="font-arimo text-2xl font-semibold mb-2">Description</h2>
        <p className="font-arimo">
          This is a sample video description. It provides context and information about the video content.
        </p>
        <h3 className="font-arimo text-xl font-semibold mt-4 mb-2">Key Points</h3>
        <ul className="font-arimo list-disc list-inside">
          <li>Point 1: A brief summary of the first key takeaway.</li>
          <li>Point 2: Explanation of the second important concept.</li>
          <li>Point 3: Details about the third significant aspect.</li>
        </ul>
        <h4 className="font-arimo text-lg font-semibold mt-4 mb-2">Additional Information</h4>
        <p className="font-arimo">Further details and context related to the video topic.</p>
        <button className="font-arimo bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
        <span className="font-arimo text-gray-500">Published on: January 1, 2024</span>
      </div>
    </div>
  )
}

export default VideoPage
