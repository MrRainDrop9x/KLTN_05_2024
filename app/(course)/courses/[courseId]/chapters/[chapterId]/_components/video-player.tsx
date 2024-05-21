interface VideoPlayerProps {
  isLocked: boolean;
  videoUrl: string;
};

export const VideoPlayer = ({
  isLocked,videoUrl

}: VideoPlayerProps) => {
 
  return (
    <div className="relative aspect-video">
      {!isLocked && (
        <iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
      )}
    </div>
  )
}