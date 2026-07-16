interface VideoEmbedProps {
  videoId: string
  mode: 'background' | 'player'
  className?: string
}

export default function VideoEmbed({ videoId, mode, className }: VideoEmbedProps) {
  // Sanitize videoId — only allow numeric IDs to prevent iframe src injection
  const safeVideoId = videoId.replace(/[^0-9]/g, '')
  if (!safeVideoId) return null

  if (mode === 'background') {
    return (
      <div
        className={`relative w-full h-full ${className ?? ''}`}
        style={{
          backgroundImage: 'url(https://picsum.photos/seed/hero/1920/1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${safeVideoId}?autoplay=1&muted=1&loop=1&background=1&controls=0&playsinline=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          style={{ pointerEvents: 'none' }}
          title="Background video"
        />
      </div>
    )
  }

  return (
    <div className={`relative w-full aspect-video ${className ?? ''}`}>
      <iframe
        src={`https://player.vimeo.com/video/${safeVideoId}?autoplay=0&controls=1&playsinline=1`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full border-0"
        title="Project video"
      />
    </div>
  )
}
