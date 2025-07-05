const VideosLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-12 bg-brand-gray/30 rounded-md w-1/4 mb-4"></div>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-brand-white rounded-lg shadow-sm p-4">
              <div className="h-48 bg-brand-gray/30 rounded-lg mb-2"></div>
              <div className="h-6 bg-brand-gray/30 rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-brand-gray/30 rounded-md w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideosLoading
