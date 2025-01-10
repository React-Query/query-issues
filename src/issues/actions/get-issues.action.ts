import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Issues } from "../interfaces";


export const getIssues = async (): Promise<Issues[]> => {
    await sleep(1500);
    // const resp: Labels[] = await fetch(
    //   "https://api.github.com/repos/facebook/react/labels"
    // ).then((r) => r.json());
    // console.log({ resp });
    //usaremos axios
    const {data} =await githubApi.get<Issues[]>('/issues')
    return data;
  };