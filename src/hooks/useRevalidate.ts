export default function useRevalidate (email: string, api_k: string) {
    const revalidate = async function () {
        await fetch('/api/revalidate', { 
            method: "POST",
            body: JSON.stringify({
              email: email
            }),
            headers: {
              api_key: api_k
            }
          })
    }
    return revalidate
}