export async function createRequest(url: string, options: any) {
    const response = await fetch("http://127.0.0.1:5000" + url, options);
    const data = await response.json();
    return data;
}