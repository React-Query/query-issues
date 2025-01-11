import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { Issues, State } from "../interfaces";


export const getIssues = async (state:State,selectedLabels:string[],page:number): Promise<Issues[]> => {
    
    await sleep(1500);
    // const resp: Labels[] = await fetch(
    //   "https://api.github.com/repos/facebook/react/labels"
    // ).then((r) => r.json());
    // console.log({ resp });
    //usaremos axios
    const params = new URLSearchParams()
     //Solo si es open o close
     //!State ya se infiere como un string
    if (state !== State.All) {
      params.append('state',state);
      
    }

    if (selectedLabels.length > 0) {
      params.append('labels',selectedLabels.join(','))
    }
    params.append('page',page.toString())
    params.append('per_page','5')

    const {data} =await githubApi.get<Issues[]>('/issues',{
      params:params
    })
    return data;
  };