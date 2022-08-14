import { Repository } from '../core/repository';
import { TagRepositorySearchResponseRootObject } from '../responses';
import { Expose } from 'class-transformer';
import { Chance } from 'chance';

export class TagRepository extends Repository {
  tag: string;
  ranktoken:string;
  page:string;
  @Expose()
  private nextMaxId: string;
moreAvailable:boolean;
  set state(body) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }

  public async search(q: string) {
    const { body } = await this.client.request.send<TagRepositorySearchResponseRootObject>({
      url: '/api/v1/tags/search/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        q,
        count: 30,
      },
    });
    return body;
  }

  public async section(q: string, tab: string) {
    const { body } = await this.client.request.send<TagRepositorySearchResponseRootObject>({
      url: `/api/v1/tags/${encodeURI(q)}/sections/`,
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        tab: tab,
        count: 30,
      },
    });
    return body;
  }
  public async sections(q:any,tab:"recent"|"top") { 
    const { body } = await this.client.request.send({
    method: "POST", 
    url: `/api/v1/tags/${encodeURI(q)}/sections/`,
     form: { 
       tab,
       page: this.page ? this.page : "",
       max_id: this.nextMaxId ? this.nextMaxId : "",
       rank_token: this.ranktoken ? this.ranktoken : this.ranktoken=new Chance().guid(),
       count: 30,
       include_persistent: true }, }); 
       this.state = body;
      return body;
  }
}
