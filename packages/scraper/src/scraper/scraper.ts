import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

async function getUrl(url: string): Promise<AxiosResponse<any, any>> {
  try {
    const response = await axios.get(url);

    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

function parseResponse(response: AxiosResponse): string {
  const $ = cheerio.load(response.data);
  const data: string[] = [];

  const jobDescription = $("div.job__description").each((index, element) => {
    data.push($(element).text().trim());
  });

  const json = JSON.stringify(data);

  return json;
}
