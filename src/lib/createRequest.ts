export async function createRequest(url: string, options: any) {
    const response = await fetch("http://localhost:5000" + url, options);
    const data = await response.json();
    return data;
}