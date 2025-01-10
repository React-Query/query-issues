import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Labels } from "../interfaces";

export const getLabels = async (): Promise<Labels[]> => {
    await sleep(1500);
    // const resp: Labels[] = await fetch(
    //   "https://api.github.com/repos/facebook/react/labels"
    // ).then((r) => r.json());
    // console.log({ resp });
    //usaremos axios
    const {data} =await githubApi.get<Labels[]>('/labels')
    return data;
  };