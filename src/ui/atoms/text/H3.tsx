interface H3Props {
    text: string;
    centered?: boolean
}
export default function H3({text, centered=false}: H3Props) {
  return (
    <h3 className={`font-cairo text-xl text-primary font-bold ${centered? 'text-center': 'text-start'}`}>{text}</h3>
  )
}
