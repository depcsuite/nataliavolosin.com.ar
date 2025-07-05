const SubscriptionLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-64 bg-brand-gray/30 rounded-lg mb-6"></div>
        <div className="h-8 bg-brand-gray/30 rounded-md w-1/2 mb-4"></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-48 bg-brand-gray/30 rounded-lg"></div>
          <div className="h-48 bg-brand-gray/30 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionLoading
