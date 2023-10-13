export async function createRequest(url: string, options: any) {
    const response = await fetch("https://ryan-be-new.vercel.app" + url, options);
    const data = await response.json();
    return data;
}