import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-foreground-title text-background-light text-center py-2 text-sm'>
        &copy; جميع الحقوق محفوظة للمطور 
        <Link target='_blank' className='underline underline-offset-4 px-2' href={'https://www.linkedin.com/in/mohamed-adel-100a732a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app '}> Mohamed Adel</Link> 
    </div>
  )
}
