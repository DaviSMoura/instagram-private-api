import { Repository } from '../core/repository';
import { Expose } from 'class-transformer';
import JSONbig = require('json-bigint');

export class ClipsRepository extends Repository {

  nextMaxId:string;
  @Expose()
moreAvailable:boolean;
  set state(body) {
    this.moreAvailable = body.paging_info.more_available;
    this.nextMaxId = body.paging_info.max_id;
  }
 
  async discover(module:string|"clips_viewer_clips_tab",seen:[]|[]) {
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/discover/',
      method:"POST",
      form: {
        seen_reels: seen?seen:[],
        max_id:this.nextMaxId?this.nextMaxId:undefined,
        container_module:module,
        _uuid:this.client.state.uuid
       
      },
    });
    this.state=body;
    return body;
  }
  async seen(reels:[]|any) {
    //include media pk array
    const { body } = await this.client.request.send({
      url: '/api/v1/clips/write_seen_state/',
      method:"POST",
      form:this.client.request.sign({
        impressions: JSONbig.stringify(reels),
        _uuid:this.client.state.uuid
      }),
    });
    this.state=body;
    return body;
  }
}
