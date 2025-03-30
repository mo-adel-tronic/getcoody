type Props = {
    src: string
}

export default function AppFormFrame({src}: Props) {
  return (
    <div className="flex justify-center">
        <iframe src={src} style={{border: 'none', width: '90%', minHeight: '100vh'}} allowFullScreen> </iframe>
  
        </div>
  )
}